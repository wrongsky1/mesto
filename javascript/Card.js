const popupPicture = document.querySelector('.popup_picture-zoom');

function closePopup(popup) {
    document.removeEventListener('keydown', addListenerEsc);
    popup.removeEventListener('mousedown', addListenerOverlay);
    popup.classList.remove('popup_opened');
};
    
function openPopup(popup) {
    document.addEventListener('keydown', addListenerEsc);
    popup.addEventListener('mousedown', addListenerOverlay);
    popup.classList.add('popup_opened');
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

export default class Card {
    constructor (cardTemplate, cardName, cardLink) {
        this._cardName = cardName;
        this._cardLink = cardLink;
        this._cardTemplate = cardTemplate;
        this._elementCopy = this._cardTemplate.content.querySelector('.element').cloneNode(true);
    }
   
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
        this._elementCopy.querySelector('.element__picture').addEventListener('click', () => {
            document.querySelector('.popup__picture-zoom').src = this._cardLink;
            document.querySelector('.popup__picture-zoom').alt = this._cardName;
            document.querySelector('.popup__picture-text').textContent = this._cardName;
            openPopup(popupPicture);
        });
    };

    makeCard() {
        this._elementCopy.querySelector('.element__picture').src = this._cardLink;
        this._elementCopy.querySelector('.element__description').textContent = this._cardName;
        this._addListenerLikeButton ();
        this._addListenerDeleteCardButton ();
        this._addListenerPictureZoom ();
        return(this._elementCopy);
    };
}
