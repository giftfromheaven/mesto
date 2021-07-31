export default class Card {
  constructor(name, link, templateSelector, openPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    return cardTemplate.cloneNode(true).querySelector('.element');
  }

  createCard() {
    this._cardElem = this._getTemplate();

    this.imageInCard = this._cardElem.querySelector('.element__image');
    this.textInCard = this._cardElem.querySelector('.element__text');
    this.likeInCard = this._cardElem.querySelector('.element__like');
    this.deleteIcon = this._cardElem.querySelector('.element__delete-icon');

    this._setEventListeners();

    this.imageInCard.src = this._link;
    this.imageInCard.alt = this._name;
    this.textInCard.textContent = this._name;
    return this._cardElem;
  }

  _setEventListeners() {
    this.imageInCard.addEventListener('click', () => {
      this._openPopup(this._name, this._link);
    });

    this.likeInCard.addEventListener('click', () => {
      this._handleLike();
    });

    this.deleteIcon.addEventListener('click', (evt) => {
      this._handleDelete();
    });
  }

  _handleLike() {
    this.likeInCard.classList.toggle('element__like_active');
  }

  _handleDelete() {
    this._cardElem.remove();
    this._cardElem = null;
  }
}
