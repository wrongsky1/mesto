import "./index.css";
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
    profileName,
    profileAbout,
    profileAvatar,
    addButton,
    popupAddPlace,
    inputTitleAddPlace,
    inputLinkAddPlace,
    formAddPlace,
    formAvatarEdit,
    popupDeleteCard,
    popupAvatarEdit,
    avatarEditButton,
    inputLinkAvatar
  } from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  ownId: '993c8682f39a3e6b3e598d71',
  headers: {
    authorization: 'c0f1ac49-a1c2-4501-916f-6ad383af4504',
     'Content-Type': 'application/json'
  }
});

const ownId = api.ownId;

function handleCard(item) {
  const card = new Card(ownId, item, { cardSelector: '.element-template',
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },
    handleCardDelete: () => {
      popupWithDeleteCard.open();
      popupWithDeleteCard.setHandleSubmit(() => {
        api.deleteCard(item._id);
        card.delete();
      });
    },
    handleAddLike: () => {
      api.setLike(item._id)
        .then((item) => {
          card.addLikeCounter(item.likes);
          card.toggleLikeButton();
        })
    },
    handleDeleteLike: () => {
      api.deleteLike(item._id)
        .then((item) => {
          card.addLikeCounter(item.likes);
          card.toggleLikeButton();
        })
    }
  });
  defaultCards.addItem(card.makeCard());
}

const defaultCards = new Section({
  renderer: (item) => {
    handleCard(item);
  }
}, '.elements');

api.getInitialCards()
  .then((res) => {
    defaultCards.renderItems(res);
  });

const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();
  
const popupWithDeleteCard = new PopupWithDeleteCard(popupDeleteCard);
popupWithDeleteCard.setEventListeners();

const addNewPlace = new PopupWithForm(popupAddPlace, {
  handleFormSubmit: () => {
    const inputValue = addNewPlace.getInputValues();
    api.setCard(inputValue)
      .then((item) => {
        handleCard(item);
      })
  }
});

addNewPlace.setEventListeners();

const userFormProfile = {
  api: api,
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar
}

const userInfo = new UserInfo(userFormProfile);

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
  });

const editPopup = new PopupWithForm(popupProfile, {
  handleFormSubmit: () => {
    const inputValue = editPopup.getInputValues();
    console.log(inputValue); 
    api.setUserInfo(inputValue) 
      .then((data) => {
        userInfo.setUserInfo(data);
      })
  }
})
  
editPopup.setEventListeners();  

const avatarPopup = new PopupWithForm(popupAvatarEdit, {
  handleFormSubmit: () => {
    const inputValue = avatarPopup.getInputValues();
    api.changeAvatar(inputValue)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
  }
})

avatarPopup.setEventListeners(); 

function clearAvatarEditForm() {
  inputLinkAvatar.value = '';
  document.querySelector('#avatar-edit-link-error').textContent = '';
  inputLinkAvatar.classList.remove('popup__input_type_error');
  document.querySelector('.popup__save-button_avatar-edit').classList.add('popup__button_disabled');
}

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

avatarEditButton.addEventListener('click', () => {
  clearAvatarEditForm();
  avatarPopup.open();
});

editButton.addEventListener('click', () => {
    const profileInfo = userInfo.getUserInfo();
    nameInput.value = profileInfo.name;
    jobInput.value = profileInfo.about;
    clearProfileForm();
    editPopup.open();
});
  
addButton.addEventListener('click', () => {
    clearAddPlaceForm()
    addNewPlace.open();
});

const validationFormProfile = new FormValidator (options, formProfile);
validationFormProfile.enableValidation();
const validationFormAddPlace = new FormValidator (options, formAddPlace);
validationFormAddPlace.enableValidation();
const validationFormAvatar = new FormValidator (options, formAvatarEdit);
validationFormAvatar.enableValidation();