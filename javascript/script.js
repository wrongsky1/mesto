let editButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let pop = document.querySelector('.popup');

function popUp() {
    
    if (pop.classList.contains('popup_closed') === true) {
        pop.classList.remove('popup_closed');
    } else {
        pop.classList.add('popup_closed');
    }
}

editButton.addEventListener("click", popUp, false);
closePopupButton.addEventListener("click", popUp, false);