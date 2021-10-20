export default class Section {
  constructor({ render, container }) {
    this._container = document.querySelector(container);
    this._render = render;
  }

  renderItems(renderItems) {
    renderItems.forEach((item) => {
      this._render(item);
    });
  }

  addItem(element, order = true) {
    if (order) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
