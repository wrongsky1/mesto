const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const formElement = document.querySelector(options.formSelector);
const inputElement = formElement.querySelector(options.inputSelector);
const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
const buttonElement = formElement.querySelector(options.submitButtonSelector);

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.textContent = '';
  };  

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.add(options.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled", "disabled");
      buttonElement.classList.remove(options.inactiveButtonClass);
    }
  };

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector); 
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
  
enableValidation(options);