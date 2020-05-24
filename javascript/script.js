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


//реализация добавления карточки с фото GridPhoto

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
function popUpAddPlace() {
    popAddPlace.classList.add('popup_opened');
}
function popDownAddPlace() {
    popAddPlace.classList.remove('popup_opened');
}
//стартовый набор карточек из масива
//контейнер для карточки
const elementsContainer = document.querySelector('.elements');
// клонирование элемента 
function makeCard (cardName, cardLink) {
    let cardTemplate = document.querySelector('.element-template').content; //заготовка
    let element = cardTemplate.querySelector('.element');
    let elementCopy = element.cloneNode(true); //копируем шаблон
    elementCopy.querySelector('.element__picture').src = cardLink; //поле картинки в шаблоне
    elementCopy.querySelector('.element__description').textContent = cardName; //поле описания картинки в шаблоне
    elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    elementsContainer.append(elementCopy);
}

initialCards.forEach(function(item) {
    makeCard(item.name, item.link);
});

//функция добавления карточки addPlace
function formSubmitHandlerAddPlace(evt) {
    evt.preventDefault(); //отмена стандартного submit
    let cardTemplate = document.querySelector('.element-template').content; //заготовка
    let element = cardTemplate.querySelector('.element');
    let elementCopy = element.cloneNode(true); //копируем шаблон

    const titleInput = document.querySelector('#picture-title');
    const linkInput = document.querySelector('#picture-link');
    const elementImage = elementCopy.querySelector(".element__picture");
    const elementTitle = elementCopy.querySelector(".element__description");

    elementImage.src = linkInput.value;
    elementTitle.textContent = titleInput.value;

    elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    elementsContainer.prepend(elementCopy);
    popDownAddPlace();
}
//работа кнопок addPlace 
addButton.addEventListener("click", popUpAddPlace, false);
closePopAddPlace.addEventListener("click", popDownAddPlace, false);
formAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

//реализация удаления карточки
const gridElements = document.querySelector('.elements');
gridElements.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    if (eventTarget.className != 'element__close-button') return;
    eventTarget.closest('.element').remove();
});