export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._buttonSubmit = this._popupSelector.querySelector('.popup__save-button');
    }
  
    _handleEscClose = (evt) => {
      const openedPopup = document.querySelector('.popup_opened');
      if (evt.key === 'Escape' && openedPopup) {
        this.close();
      }
    }
  
    _handleOverlayClose = (evt) => {
      const openedPopup = document.querySelector('.popup_opened');
      if (evt.target.classList.contains('popup') && openedPopup) {
        this.close();
      }
    }
  
    open() {
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
      document.addEventListener('click', this._handleOverlayClose);
    }
  
    close() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
      document.removeEventListener('click', this._handleOverlayClose);
    }
  
    setEventListeners() {
      this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
        this.close();
      });
    }

    handleMessageLoading(message) {
      this._buttonSubmit.textContent = message;
    }
  }