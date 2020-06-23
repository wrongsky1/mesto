/* 
код работает, но есть проблемы с отображением ошибок при валидации input-ов. 
запутался с переменными в классе и их селекторами, прошу на ревью указать все недочеты по возможности с подробными комментариями. 
Тема интересная и хочется разобраться, теория и тренажер простые и доступные, а вот с практической работой возникает много вопросов.
*/

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

class FormValidator {
    constructor (options, formElement) {
      this._formElement = formElement;
      this._options = options;
      this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
      this._inputs = this._formElement.querySelectorAll(options.inputSelector);
      this._input = this._formElement.querySelector(options.inputSelector);
    }

    _showInputError = () => {
      const errorElement = this._formElement.querySelector(`#${this._input.id}-error`);
      this._input.classList.add(options.inputErrorClass);
      errorElement.textContent = this._input.validationMessage;
    };

    _hideInputError = () => {
      const errorElement = this._formElement.querySelector(`#${this._input.id}-error`);
      this._input.classList.remove(options.inputErrorClass);
      errorElement.textContent = '';
    };

    _hasInvalidInput = () => {
      const inputList = Array.from(this._inputs);
      const input = this._formElement.querySelector(options.inputSelector);
      return inputList.some((input) => {
      
        return !input.validity.valid;
      })
    };

    _toggleButtonState = () => {
      const buttonElement = this._formElement.querySelector(options.submitButtonSelector);
      const inputList = Array.from(this._inputs);
      if (this._hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", "disabled");
        buttonElement.classList.add(options.inactiveButtonClass);
      } else {
        buttonElement.removeAttribute("disabled", "disabled");
        buttonElement.classList.remove(options.inactiveButtonClass);
      }
    };
    
    _isValid = () => {
      const input = this._formElement.querySelector(options.inputSelector);
      if (!input.validity.valid) {
        this._showInputError(this._formElement, this._options.inputSelector, this._options.inputSelector.validationMessage);
      } else {
        this._hideInputError(this._formElement, this._options.inputSelector);
      }
    };
    
    _setEventListeners = () => {
      const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
      const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector); 
      const input = this._formElement.querySelector(options.inputSelector);
      this._toggleButtonState();
      inputList.forEach((input) => {
        
        input.addEventListener('input', () => {
          this._isValid(this._formElement, input);
          this._toggleButtonState(inputList, buttonElement);
        });
      });
    };
    
    enableValidation = () => {
      const formList = Array.from(document.querySelectorAll(this._options.formSelector));
      formList.forEach(() => {
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
        });
        this._setEventListeners();
      });
    };
}

export {options, FormValidator}