export default class Card {
    constructor(data, cardSelector, { handleCardClick }){
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _addListenerLikeButton () {
      this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
          evt.target.classList.toggle('element__like-button_active');
      });
    };

    _addListenerDeleteCardButton () {
      this._element.querySelector('.element__close-button').addEventListener('click', (evt) => {
          evt.target.closest('.element').remove();
      });
    };
  
    _setEventListeners() {
      this._addListenerLikeButton ();
      this._addListenerDeleteCardButton ();
      this._element.querySelector('.element__picture').addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }
  
    generateCard() {
      this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      this._element.querySelector('.element__picture').src = this._link;
      this._element.querySelector('.element__description').textContent = this._name;
      this._setEventListeners();
  
      return this._element;
    }
  }