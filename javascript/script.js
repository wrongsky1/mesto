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

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const closeProfileButton = document.querySelector('.popup_close-profile');
const formProfile = document.querySelector('.popup_form-profile');
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');
const elName = document.querySelector('.profile__info-name');
const elJob = document.querySelector('.profile__info-job');

const addButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add-place');
const closePopAddPlace = document.querySelector('.popup_close-add-place');
const formAddPlace = document.querySelector('.popup_form-add-place');

const popupPicture = document.querySelector('.popup_picture-zoom');
const closePictureZoom = document.querySelector('.popup_close-picture-zoom');

const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const element = cardTemplate.querySelector('.element');

function openClosePopup(popupProfile) {
    popupProfile.classList.toggle('popup_opened');
};

function profileInputs() {
    nameInput.value = elName.textContent;
    jobInput.value = elJob.textContent;
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    elName.textContent = nameInput.value;
    elJob.textContent = jobInput.value;
    openClosePopup(popupProfile);
};

function makeCard(cardName, cardLink) {
    const elementCopy = element.cloneNode(true);
    elementCopy.querySelector('.element__picture').src = cardLink;
    elementCopy.querySelector('.element__description').textContent = cardName;
    return(elementCopy);
};

function addCard(elementCopy, elementsContainer){
    elementsContainer.prepend(elementCopy);
}

function formSubmitHandlerAddPlace(evt) {
    evt.preventDefault();
    const cardLink = document.querySelector('.popup__input-link').value;
    const cardName = document.querySelector('.popup__input-title').value;
    const newCard = makeCard(cardName, cardLink);
    addCard(newCard, elementsContainer);
    openClosePopup(popupAddPlace);
};

initialCards.forEach(function(item) {
    const initialCard = makeCard(item.name, item.link);
    addCard(initialCard, elementsContainer);
});

editButton.addEventListener('click', function() {
    openClosePopup(popupProfile);
    profileInputs();
});

closeProfileButton.addEventListener('click', function() {
    openClosePopup(popupProfile);
});

formProfile.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function() {
    openClosePopup(popupAddPlace);
});

closePopAddPlace.addEventListener('click', function() {
    openClosePopup(popupAddPlace);
});

formAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

elementsContainer.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    if (eventTarget.className === 'element__close-button') {
        eventTarget.closest('.element').remove();
    } else if (eventTarget.className === 'element__picture') {
        document.querySelector('.popup__picture-zoom').src = eventTarget.src;
        document.querySelector('.popup__picture-zoom').alt = eventTarget.closest('.element').querySelector('.element__description').textContent;
        document.querySelector('.popup__picture-text').textContent = eventTarget.closest('.element').querySelector('.element__description').textContent;
        openClosePopup(popupPicture);
    } else if (eventTarget.className === 'element__like-button') {
        eventTarget.classList.toggle('element__like-button_active');
    }
    return;
});

closePictureZoom.addEventListener('click', function() {
    openClosePopup(popupPicture);
});