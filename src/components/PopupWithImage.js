import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open(name, link) {
    super.open();
    const picture = document.querySelector('.popup__picture-zoom');
    picture.src = link;
    picture.alt = name;
    document.querySelector('.popup__picture-text').textContent = name;
  }
}