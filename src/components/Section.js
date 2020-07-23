export default class Section {
    constructor({ renderer }, containerSelector){
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    renderItems(api) { //если убрать api из аргумента возникает ошибка, которую не пойму как решить иначе
      api.reverse().forEach(item => {
        this._renderer(item)
      })
    }
  
    addItem(item) {
      this._container.prepend(item);
    }
  }