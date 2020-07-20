import Popup from './Popup.js';

export default class PopupWithDeleteCard extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }


    setEventListeners() {
      super.setEventListeners();
      this._form = this._popupSelector.querySelector('.popup_form-card-delete');
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this.handleMessageLoading('Удаление...');
        
        this.close();
      });
    }

    open() {
      super.open();
      this.handleMessageLoading('Да');
    }

    
}