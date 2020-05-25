//реализация редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('#close-profile');
const pop = document.querySelector('#popup-profile');
const formElement = document.querySelector('#form-profile');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const elName = document.querySelector('.profile__info-name');
const elJob = document.querySelector('.profile__info-job');

function popUp() {
    pop.classList.add('popup_opened');
    nameInput.value = elName.textContent;
    jobInput.value = elJob.textContent;
}

function popDown() {
    pop.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    elName.textContent = nameInput.value;
    elJob.textContent = jobInput.value;
    popDown()
}

editButton.addEventListener("click", popUp, false);
closePopupButton.addEventListener("click", popDown, false);
formElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const addButton = document.querySelector('.profile__add-button');
const closePopAddPlace = document.querySelector('#close-addPlace');
const popAddPlace = document.querySelector('#popup-addPlace');
const formAddPlace = document.querySelector('#form-addPlace');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const element = cardTemplate.querySelector('.element');
const gridElements = document.querySelector('.elements');
const popPictureZoom = document.querySelector('#popup-picture');
const closePictureZoom = document.querySelector('#close-pictureZoom');

function popUpAddPlace() {
    popAddPlace.classList.add('popup_opened');
}

function popDownAddPlace() {
    popAddPlace.classList.remove('popup_opened');
}

function popUpPictureZoom() {
    popPictureZoom.classList.add('popup_opened');
}

function popDownPictureZoom() {
    popPictureZoom.classList.remove('popup_opened');
}

function makeCard (cardName, cardLink) {
    const elementCopy = element.cloneNode(true);
    elementCopy.querySelector('.element__picture').src = cardLink;
    elementCopy.querySelector('.element__description').textContent = cardName;
    elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    elementsContainer.append(elementCopy);
}

initialCards.forEach(function(item) {
    makeCard(item.name, item.link);
});

function formSubmitHandlerAddPlace(evt) {
    evt.preventDefault(); //отмена стандартного submit
    const elementCopy = element.cloneNode(true);
    const titleInput = document.querySelector('#picture-title');
    const linkInput = document.querySelector('#picture-link');
    const elementImage = elementCopy.querySelector('.element__picture');
    const elementTitle = elementCopy.querySelector('.element__description');
    elementImage.src = linkInput.value;
    elementTitle.textContent = titleInput.value;

    elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    elementsContainer.prepend(elementCopy);
    popDownAddPlace();
}

addButton.addEventListener("click", popUpAddPlace, false);
closePopAddPlace.addEventListener("click", popDownAddPlace, false);
formAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);
closePictureZoom.addEventListener("click", popDownPictureZoom, false);
gridElements.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    if (eventTarget.className === 'element__close-button') {
        eventTarget.closest('.element').remove();
    } else if (eventTarget.className === 'element__picture') {
        document.querySelector('.popup__picture-zoom').src = eventTarget.src;
        document.querySelector('.popup__picture-text').textContent = eventTarget.closest('.element').querySelector('.element__description').textContent;
        popUpPictureZoom();
    }
    return;
});