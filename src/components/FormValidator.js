import {options} from '../utils/constants.js';

export default class FormValidator {
    constructor (options, formElement) {
      this._formElement = formElement;
      this._options = options;
      this._formSelector = options.formSelector;
      this._inputSelector = options.inputSelector;
      this._submitButtonSelector = options.submitButtonSelector;
      this._inactiveButtonClass = options.inactiveButtonClass;
      this._inputErrorClass = options.inputErrorClass;
      this._errorClass = options.errorClass;
      this._inputs = this._formElement.querySelectorAll(options.inputSelector);
    }

    _showInputError (formElement, inputElement, errorMessage) {
      this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      this._errorElement.textContent = errorMessage;
    };

    _hideInputError (formElement, inputElement) {
      this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = '';
    };

    _hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    _toggleButtonState (inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", "disabled");
        buttonElement.classList.add(this._inactiveButtonClass);
      } else {
        buttonElement.removeAttribute("disabled", "disabled");
        buttonElement.classList.remove(this._inactiveButtonClass);
      }
    };
    
    _isValid (formElement, inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
    };
    
    _setEventListeners ()  {
      const inputList = Array.from(this._inputs);
      const buttonElement = this._formElement.querySelector(options.submitButtonSelector);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(this._formElement, inputElement);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };
    
    enableValidation () {
      const formList = Array.from(document.querySelectorAll(this._options.formSelector));
      formList.forEach(() => {
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners(this._formElement, this._options);
      });
    };
}