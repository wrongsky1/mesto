import "./index.css";
//import {initialCards} from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
    options,
    popupPicture,
    editButton,
    popupProfile,
    saveButtonProfile,
    formProfile,
    nameInput,
    jobInput,
    elName,
    elJob,
    addButton,
    popupAddPlace,
    inputTitleAddPlace,
    inputLinkAddPlace,
    formAddPlace,
    formAvatarEdit,
    popupDeleteCard,
    apiData
  } from '../utils/constants.js';

function clearProfileForm() {
    saveButtonProfile.classList.remove('popup__button_disabled');
    saveButtonProfile.removeAttribute('disabled');
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

/*  
function renderInitialCards(item) {
    const card = new Card(item, '.element-template', {
      handleCardClick: () => {
        popupWithImage.open(item.name, item.link);
      }
    });
    defaultCards.addItem(card.generateCard());
  }
  
const defaultCards = new Section({
    items: initialCards,
    renderer: ((item) => {
      renderInitialCards(item);
    })
  }, '.elements');
  
defaultCards.renderItems();


const defaultCards = new Section ({
  renderer: (item) => {
    const card = new Card(api, userInfo, item, '.element-template', {
      handleCardClick: () => {
        popupWithImage.open(item.name, item.link);
      },
      handleCardDelete: () => {
        popupWithDeleteCard.open();
        popupWithDeleteCard.setHandleSubmit(function() {
          api.deleteCard(card._id);
          card.deleteCard();
        });
      }
  });
  defaultCards.addItem(card.generateCard());
  }
}, '.elements');

api.getInitialCards()
  .then((res) => {
    defaultCards.renderItems(res);
  });
  */
// остановился на отправке карточки на сервер 
/*
const addPopup = new PopupWithForm(popupAddPlace, {
    handleFormSubmit: () => {
      const newItem = {name: inputTitleAddPlace.value, link: inputLinkAddPlace.value};
      renderInitialCards(newItem);
    }
  });
  
addPopup.setEventListeners();
  
const userInfo = new UserInfo({
    elName: elName,
    elJob: elJob
  });
  
const editPopup = new PopupWithForm(popupProfile, {
    handleFormSubmit: () => {
      const newData = {name: nameInput.value, job: jobInput.value};
      userInfo.setUserInfo(newData);
    }
  });
  
editPopup.setEventListeners();
  
editButton.addEventListener('click', () => {
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.job;
    clearProfileForm();
    editPopup.open();
});
  
addButton.addEventListener('click', () => {
    clearAddPlaceForm()
    addPopup.open();
});
*/
const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

const popupWithDeleteCard = new PopupWithDeleteCard(popupDeleteCard);
popupWithDeleteCard.setEventListeners();

const api = new Api(apiData);

const validationFormProfile = new FormValidator (options, formProfile);
validationFormProfile.enableValidation();
const validationFormAddPlace = new FormValidator (options, formAddPlace);
validationFormAddPlace.enableValidation();
const validationFormAvatar = new FormValidator (options, formAvatarEdit);
validationFormAvatar.enableValidation();