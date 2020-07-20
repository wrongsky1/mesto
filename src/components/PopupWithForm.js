import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._dataInputs = {};
    this._inputList.forEach(input => {
      this._dataInputs[input.name] = input.value;
    });
    return this._dataInputs;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this.handleMessageLoading('Сохранение...');
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit = this._handleSubmit.bind(this);
    this._popupSelector.querySelector('.popup__form').addEventListener('submit', this._submit);
  }

  open() {
    super.open();
    this.handleMessageLoading('Сохранить');
  }

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
  }
}