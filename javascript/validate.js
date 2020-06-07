function handleInput(evt, errorClass) {
    const input = evt.target;
    const error = document.querySelector(`#${input.id}-error`);
    const isInputValid = input.checkValidity();
    if (isInputValid) {
        input.classList.remove(errorClass);
        error.textContent = '';
    } else {
        input.classList.add(errorClass);
        error.textContent = input.validationMessage;
    }
}

function handleFormSubmit(submitButton, inputs) {
    const areAllValid = inputs.every(input => input.checkValidity());
}

function enableValidation(options) {
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach(formElement => {
        const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
        const submitButton = formElement.querySelector('.popup__save-button');
        
        inputElements.forEach(input => {
            input.addEventListener('input', e => handleInput(e, options.inputErrorClass))
        })
              
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        })

        formElement.addEventListener('input', () => {
            const isFormValid = formElement.checkValidity();
            submitButton.disabled = !isFormValid;
            submitButton.classList.toggle(
                options.inactiveButtonClass,
                !isFormValid
            )
        })       
    })
}