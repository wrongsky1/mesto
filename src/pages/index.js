import "./index.css";
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { options } from '../utils/constants.js';

// кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__edit-pen');

// попапы
const popupProfile = document.querySelector('.popup_profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupPicture = document.querySelector('.popup_picture-zoom');
const popupAvatarEdit = document.querySelector('.popup_avatar-edit');
const popupDeleteCard = document.querySelector('.popup_card-delete');

// формы и инпуты
const formProfile = document.querySelector('.popup_form-profile');
const nameInput = document.querySelector('.popup__input-name');
const jobInput = document.querySelector('.popup__input-job');

const formAddPlace = document.querySelector('.popup_form-add-place');
const inputTitleAddPlace = document.querySelector('.popup__input-title');
const inputLinkAddPlace = document.querySelector('.popup__input-link');

const formAvatarEdit = document.querySelector('.popup_form-avatar-edit');
const inputLinkAvatar = document.querySelector('.popup__input-avatar-edit');
const formDeleteCard = document.querySelector('.popup_form-card-delete');

// элементы профиля 
const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__info-name');
const profileAbout = document.querySelector('.profile__info-job');

// элементы для открытия попапов и валидации 
const openedPopup = document.querySelector('.popup_opened');
const saveButtonProfile = document.querySelector('.popup__save-button_profile');  

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
        api.deleteCard(item._id)
        .then(() => {
          card.delete();
        })
        .catch((err) => {
          console.log(err);
        });
      })
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addNewPlace.close();
      })
  }
});

addNewPlace.setEventListeners();

const userFormProfile = {
  api: api,
  name: profileName,
  about: profileAbout,
  avatar: profileAvatar
};

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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editPopup.close();
      })
  }
});
  
editPopup.setEventListeners();  

const avatarPopup = new PopupWithForm(popupAvatarEdit, {
  handleFormSubmit: () => {
    const inputValue = avatarPopup.getInputValues();
    api.changeAvatar(inputValue)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .catch((err) => {console.log(err);
      })
      .finally(() => {
        avatarPopup.close();
      })
  }
});

avatarPopup.setEventListeners(); 

avatarEditButton.addEventListener('click', () => {
  validationFormAvatar.hideInputError(formAvatarEdit, inputLinkAvatar);
  avatarPopup.open();
});

editButton.addEventListener('click', () => {
  saveButtonProfile.classList.remove('popup__button_disabled');
  saveButtonProfile.removeAttribute('disabled');
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  validationFormProfile.hideInputError(formProfile, nameInput);
  validationFormProfile.hideInputError(formProfile, jobInput);
  editPopup.open();
});
  
addButton.addEventListener('click', () => {
  validationFormAddPlace.hideInputError (formAddPlace, inputTitleAddPlace);
  validationFormAddPlace.hideInputError (formAddPlace, inputLinkAddPlace);
  addNewPlace.open();
});

const validationFormProfile = new FormValidator (options, formProfile);
validationFormProfile.enableValidation();
const validationFormAddPlace = new FormValidator (options, formAddPlace);
validationFormAddPlace.enableValidation();
const validationFormAvatar = new FormValidator (options, formAvatarEdit);
validationFormAvatar.enableValidation();