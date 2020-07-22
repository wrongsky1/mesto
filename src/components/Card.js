export default class Card {
    constructor(ownId, data, { cardSelector, handleCardClick, handleCardDelete, handleAddLike, handleDeleteLike }) {
      this._ownId = ownId;
      this._id = data._id;
      this._data = data;
      this._like = data.likes;
      this._owner = data.owner;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handleAddLike = handleAddLike;
      this._handleDeleteLike = handleDeleteLike;
    }

    _getTemplate() {
      const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return element;
    }

    toggleLikeButton () {
      this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    deleteCard() {
      this._element.remove();
    }

    addLikeCounter(arr) {
      this._element.querySelector('.elements__like-counter').textContent = arr.length;
    }

    _setLike() {
      if (this._element.querySelector('.element__like-button').classList.contains('element__like-button_active')){
        this._handleAddLike();
      } else {
        this._handleDeleteLike();
      }
    }

    _setEventListeners() {
      this._element.querySelector('.element__like-button').addEventListener('click', () => {
        this._setLike();
      });
      this._element.querySelector('.element__close-button').addEventListener('click', () => {
        this._handleCardDelete(this._element);
      });
      this._element.querySelector('.element__picture').addEventListener('click', () => {
        this._handleCardClick(this._data.name, this._data.link);
      });
    }
  
    makeCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__picture').src = this._data.link;
      this._element.querySelector('.element__description').textContent = this._data.name;
      this._element.id = this._id;
      this._element.querySelector('.elements__like-counter').textContent = `${this._data.likes.length}`;
      if (this._data.likes.find((like) => like._id === this._ownId)) {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
      };
      if (this._data.owner._id === this._ownId) {
        this._element.querySelector('.element__close-button').style.display = 'block';
      } else {
        this._element.querySelector('.element__close-button').style.display = 'none';
      };

      this._setEventListeners();
  
      return this._element;
    }
  }