export default class Card {
    constructor(ownId, data, { cardSelector, handleCardClick, handleCardDelete, handleAddLike, handleDeleteLike }) {
      this._ownId = ownId;
      this._id = data._id;
      this._data = data;
      this._like = data.likes;
      this._owner = data.owner;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardClick = this._handleCardClick.bind(this);
      this._handleCardDelete = handleCardDelete;
      this._handleCardDelete = this._handleCardDelete.bind(this);
      this._handleAddLike = handleAddLike;
      this._handleAddLike = this._handleAddLike.bind(this);
      this._handleDeleteLike = handleDeleteLike;
      this._handleDeleteLike = this._handleDeleteLike.bind(this);
      this._setLike = this._setLike.bind(this);
    }

    _getTemplate() {
      const element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return element;
    }

    makeCard() {
      this._element = this._getTemplate();
      this._elementLike = this._element.querySelector('.element__like-button');
      this._elementClose = this._element.querySelector('.element__close-button');
      this._elementPicture = this._element.querySelector('.element__picture');

      this._elementPicture.src = this._data.link;
      this._element.querySelector('.element__description').textContent = this._data.name;
      this._element.id = this._id;
      this._element.querySelector('.elements__like-counter').textContent = `${this._data.likes.length}`;
      if (this._data.likes.find((like) => like._id === this._ownId)) {
        this._elementLike.classList.add('element__like-button_active');
      }
      this._data.owner._id === this._ownId ? this._elementClose.style.display = 'block' : this._elementClose.style.display = 'none';

      this._setEventListeners();
  
      return this._element;
    }

    toggleLikeButton () {
      this._elementLike.classList.toggle('element__like-button_active');
    }

    delete() {     
      this._element.remove();
      this._element = null;
      this._removeEventListeners();
    }

    addLikeCounter(arr) {
      this._element.querySelector('.elements__like-counter').textContent = arr.length;
    }

    _setLike() {
      if (this._elementLike.classList.contains('element__like-button_active')){
        this._handleDeleteLike();
      } else {
        this._handleAddLike();
      }
    }

    _setEventListeners() {
      this._elementLike.addEventListener('click', this._setLike);
      this._elementClose.addEventListener('click', this._handleCardDelete);
      this._elementPicture.addEventListener('click', this._handleCardClick);
    }

    _removeEventListeners() {
      this._elementLike.removeEventListener('click', this._setLike);
      this._elementClose.removeEventListener('click', this._handleCardDelete);
      this._elementPicture.removeEventListener('click', this._handleCardClick);
    }
  }