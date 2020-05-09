const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const pop = document.querySelector('.popup');

function popUp() {
    if (pop.classList.contains('popup_closed') === true) {
        pop.classList.remove('popup_closed');
    } else {
        pop.classList.add('popup_closed');
    }
}

editButton.addEventListener("click", popUp, false);
closePopupButton.addEventListener("click", popUp, false);
const formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault();
    const nameInput = document.querySelector('.popup__name');
    const jobInput = document.querySelector('.popup__about');
    const name = nameInput.value;
    const job = jobInput.value;
    const elName = document.querySelector('.profile__info-name');
    const elJob = document.querySelector('.profile__info-job');
    elName.textContent = name;
    elJob.textContent = job;
    popUp();
}

formElement.addEventListener('submit', formSubmitHandler);

