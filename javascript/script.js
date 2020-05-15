const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const pop = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const elName = document.querySelector('.profile__info-name');
const elJob = document.querySelector('.profile__info-job');

function popUp() {
    pop.classList.add('popup_opened');
    nameInput.value = elName.textContent;
    jobInput.value = elJob.textContent;
}

function popDown() {
    pop.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    elName.textContent = nameInput.value;
    elJob.textContent = jobInput.value;
    popDown()
}

editButton.addEventListener("click", popUp, false);
closePopupButton.addEventListener("click", popDown, false);
formElement.addEventListener('submit', formSubmitHandler);