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
const inputTitleAddPlace = document.querySelector('.popup__input-title');
const inputLinkAddPlace = document.querySelector('.popup__input-link');
const closePopAddPlace = document.querySelector('.popup_close-add-place');
const formAddPlace = document.querySelector('.popup_form-add-place');
const popupPicture = document.querySelector('.popup_picture-zoom');
const closePictureZoom = document.querySelector('.popup_close-picture-zoom');
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
const element = cardTemplate.querySelector('.element');

function closePopup(popup) {
    document.removeEventListener('keydown', addListenerEsc);
    popup.removeEventListener('click', addListenerOverlay);
    popup.classList.remove('popup_opened');
};

function openPopup(popup) {
    document.addEventListener('keydown', addListenerEsc);
    popup.addEventListener('click', addListenerOverlay);
    popup.classList.add('popup_opened');
};

function profileInputs() {
    nameInput.value = elName.textContent;
    jobInput.value = elJob.textContent;
    document.querySelector('.popup__save-button_profile').classList.remove('popup__button_disabled');
    document.querySelector('.popup__save-button_profile').removeAttribute('disabled');
    nameInput.classList.remove('popup__input_type_error');
    jobInput.classList.remove('popup__input_type_error');
    document.querySelector('#profile-name-error').textContent = '';
    document.querySelector('#profile-job-error').textContent = '';
};

function clearAddPlaceForm() {
    inputTitleAddPlace.value = '';
    inputLinkAddPlace.value = '';
    document.querySelector('#add-place-title-error').textContent = '';
    document.querySelector('#add-place-link-error').textContent = '';
    inputLinkAddPlace.classList.remove('popup__input_type_error');
    inputTitleAddPlace.classList.remove('popup__input_type_error');
    document.querySelector('.popup__save-button_add-place').classList.add('popup__button_disabled');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    elName.textContent = nameInput.value;
    elJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

function addListenerLikeButton (elementCopy) {
    elementCopy.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
};

function addListenerDeleteCardButton (elementCopy) {
    elementCopy.querySelector('.element__close-button').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
};

function addListenerPictureZoom (elementCopy, cardName, cardLink) {
    elementCopy.querySelector('.element__picture').addEventListener('click', function () {
        document.querySelector('.popup__picture-zoom').src = cardLink;
        document.querySelector('.popup__picture-zoom').alt = cardName;
        document.querySelector('.popup__picture-text').textContent = cardName;
        openPopup(popupPicture);
     });
};

function makeCard(cardName, cardLink) {
    const elementCopy = element.cloneNode(true);
    elementCopy.querySelector('.element__picture').src = cardLink;
    elementCopy.querySelector('.element__description').textContent = cardName;
    addListenerLikeButton (elementCopy);
    addListenerDeleteCardButton (elementCopy);
    addListenerPictureZoom (elementCopy, cardName, cardLink);
    return(elementCopy);
};

function addCard(elementCopy, elementsContainer){
    elementsContainer.prepend(elementCopy);
};

function formSubmitHandlerAddPlace(evt) {
    evt.preventDefault();
    const cardLink = inputLinkAddPlace.value;
    const cardName = inputTitleAddPlace.value;
    const newCard = makeCard(cardName, cardLink);
    addCard(newCard, elementsContainer);
    closePopup(popupAddPlace);
    clearAddPlaceForm();
};

function addListenerEsc (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape' && openedPopup) {
        closePopup(openedPopup);
    } 
};

function addListenerOverlay (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') && openedPopup) {
        closePopup(openedPopup);
    } 
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
    clearAddPlaceForm();
    openPopup(popupAddPlace);
});

closePopAddPlace.addEventListener('click', function() {
    closePopup(popupAddPlace);
});

formAddPlace.addEventListener('submit', formSubmitHandlerAddPlace);

closePictureZoom.addEventListener('click', function() {
    closePopup(popupPicture);
});