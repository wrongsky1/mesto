import { popupPicture, openedPopup, closePopup, openPopup, addListenerEsc, addListenerOverlay } from './utils.js'

export default class Card {
    constructor (cardTemplate, cardName, cardLink) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._cardTemplate = cardTemplate;
    };

    _getTemplate () {
        this._elementCopy = this._cardTemplate.content.querySelector('.element').cloneNode(true);
        return this._elementCopy;
    };
   
    _addListenerLikeButton () {
        this._elementCopy.querySelector('.element__like-button').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like-button_active');
        });
    };

    _addListenerDeleteCardButton () {
        this._elementCopy.querySelector('.element__close-button').addEventListener('click', (evt) => {
            evt.target.closest('.element').remove();
        });
    };

    _addListenerPictureZoom () {
        const picture = document.querySelector('.popup__picture-zoom');
        this._elementCopy.querySelector('.element__picture').addEventListener('click', () => {
            picture.src = this._cardLink;
            picture.alt = this._cardName;
            document.querySelector('.popup__picture-text').textContent = this._cardName;
            openPopup(popupPicture);
        });
    };

    _setEventListeners () {
        this._addListenerLikeButton ();
        this._addListenerDeleteCardButton ();
        this._addListenerPictureZoom ();
    }

    makeCard() {
        this._getTemplate ();
        this._elementCopy.querySelector('.element__picture').src = this._cardLink;
        this._elementCopy.querySelector('.element__description').textContent = this._cardName;
        this._setEventListeners ();
        return(this._elementCopy);
    };
}
