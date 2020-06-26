const options = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const popupPicture = document.querySelector('.popup_picture-zoom');
const openedPopup = document.querySelector('.popup_opened');

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
    const openedPopup = document.querySelector('.popup_opened'); //если вынести эту переменную в начало файла и удалить из функции, то данная функция не работает (тк элемент отсутствует в DOM до определенного момента).
    if (evt.key === 'Escape' && openedPopup) {
        closePopup(openedPopup);
    } 
};
    
function addListenerOverlay (evt) {
    const openedPopup = document.querySelector('.popup_opened'); //если вынести эту переменную в начало файла и удалить из функции, то данная функция не работает (тк элемент отсутствует в DOM до определенного момента).
    if (evt.target.classList.contains('popup') && openedPopup) {
        closePopup(openedPopup);
    } 
};

export { popupPicture, openedPopup, closePopup, openPopup, addListenerEsc, addListenerOverlay, options };