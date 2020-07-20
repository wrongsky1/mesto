export default class Card {
    constructor(api, userInfo, data, cardSelector, { handleCardClick, handleCardDelete}){
      this._api = api;
      this._userInfo = userInfo;
      this._data = data;
      this._id = data._id;
      this._owner = data.owner;

      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
    }

    _setLikeCounter() {
      const like = this._element.querySelector('.element__like-button');
      const likeCounter = this._element.querySelector('.elements__like-counter');
      if (!like.classList.contains('element__like-button_active')) {
        this._api.setLike(this._id)
          .then((data) => {
            like.classList.add('element__like-button_active');
            likeCounter.textContent = `${data.likes.length}`;
          })
      } else {
        this._api.deleteLike(this._id)
          .then((data) => {
            like.classList.remove('element__like-button_active');
            likeCounter.textContent = `${data.likes.length}`;
          })
      }
    }

    _addListenerLikeButton () {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
          evt.target.classList.toggle('element__like-button_active');
      });
    }

    _addListenerDeleteCardButton () {
      this._element.querySelector('.element__close-button').addEventListener('click', (evt) => {
          evt.target.closest('.element').remove();
      });
    }
  
    _setEventListeners() {
      this._addListenerLikeButton ();
      this._addListenerDeleteCardButton ();
      this._element.querySelector('.element__picture').addEventListener('click', () => {
        this._handleCardClick(this._data.name, this._data.link);
      });
    }
  
    generateCard() {
      this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      this._element.querySelector('.element__picture').src = this._data.link;
      this._element.querySelector('.element__description').textContent = this._data.name;
      this._element.id = this._id;
      this._element.querySelector('.elements__like-counter').textContent = `${this._data.likes.length}`;
/*
      if (this._data.likes.find((like) => like._id === this._api.myId)) {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
      };
  
      if (this._data.owner._id === this._api.myId) {
        this._element.querySelector('.element__close-button').style.display = 'block';
      } else {
        this._element.querySelector('.element__close-button').style.display = 'none';
      };
*/

      this._setEventListeners();
  
      return this._element;
    }
  }