import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._form = this._popupSelector.querySelector('.popup_form-card-delete');
    }

    setHandleSubmit(func) {
      this._handleSubmit = func;
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.handleMessageLoading('Удаление...');
        this._handleSubmit();
        this.close();
      });
    }

    open() {
      super.open();
      this.handleMessageLoading('Да');
    }

    
}