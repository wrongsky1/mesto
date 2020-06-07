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

const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

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

function closePopup(popupProfile) {
    popupProfile.classList.remove('popup_opened');
};

function openPopup(popupProfile) {
    popupProfile.classList.add('popup_opened');
};

function profileInputs() {
    nameInput.value = elName.textContent;
    jobInput.value = elJob.textContent;
    document.querySelector('.popup__save-button_profile').classList.remove('popup__button_disabled');
    document.querySelector('.popup__save-button_profile').removeAttribute('disabled');
};

function clearAddPlaceForm() {
    document.querySelector('.popup__input-title').value = '';
    document.querySelector('.popup__input-link'). value = '';
    document.querySelector('.popup__save-button_add-place').classList.add('popup__button_disabled');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    elName.textContent = nameInput.value;
    elJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

function makeCard(cardName, cardLink) {
    const elementCopy = element.cloneNode(true);
    elementCopy.querySelector('.element__picture').src = cardLink;
    elementCopy.querySelector('.element__description').textContent = cardName;
    elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    elementCopy.querySelector('.element__close-button').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    elementCopy.querySelector('.element__picture').addEventListener('click', function (evt) {
        document.querySelector('.popup__picture-zoom').src = evt.target.src;
        document.querySelector('.popup__picture-zoom').alt = evt.target.closest('.element').querySelector('.element__description').textContent;
        document.querySelector('.popup__picture-text').textContent = evt.target.closest('.element').querySelector('.element__description').textContent;
        openPopup(popupPicture);
    });
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
    closePopup(popupAddPlace);
    clearAddPlaceForm();
};

initialCards.forEach(function(item) {
    const initialCard = makeCard(item.name, item.link);
    addCard(initialCard, elementsContainer);
});

editButton.addEventListener('click', function() {
    profileInputs();
    openPopup(popupProfile);
});

closeProfileButton.addEventListener('click', function() {
    closePopup(popupProfile);
});

formProfile.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function() {
    openPopup(popupAddPlace);
});

closePopAddPlace.addEventListener('click', function() {
    closePopup(popupAddPlace);
});

formAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

closePictureZoom.addEventListener('click', function() {
    closePopup(popupPicture);
});

window.document.addEventListener('keydown', function (evt) {
    const key = evt.keyCode
    if (key === 27) {
        closePopup(popupPicture);
        closePopup(popupAddPlace);
        closePopup(popupProfile);
    } 
});

popupPicture.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('popup')) {
        closePopup(popupPicture);
    }
});

popupAddPlace.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('popup')) {
        closePopup(popupAddPlace);
    }
});

popupProfile.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('popup')) {
        closePopup(popupProfile);
    }
});

enableValidation(options);