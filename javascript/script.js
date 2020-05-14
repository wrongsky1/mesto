const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
const pop = document.querySelector('.popup');

function popUp() {pop.classList.add('popup_opened')}
function popDown() {pop.classList.remove('popup_opened')}

editButton.addEventListener("click", popUp, false);
closePopupButton.addEventListener("click", popDown, false);
const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__about');
const elName = document.querySelector('.profile__info-name');
const elJob = document.querySelector('.profile__info-job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    elName.textContent = name;
    elJob.textContent = job;
    popDown();
}

formElement.addEventListener('submit', formSubmitHandler);