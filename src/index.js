import { initialCards } from './scripts/initial-cards.js';
import FormValidator from './scripts/FormValidator.js';
import Card from './scripts/Card.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import '../src/pages/index.css';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
};

// Popup profile element
const popupProfile = document.querySelector('#popup-profile-data');
const openProfilePopupButton = document.querySelector('.profile__edit');

// Popup add card
const popupAddCard = document.querySelector('#element');
const openCardPopupButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
const formProfile = document.querySelector("form[name='info-form']");
const formPlace = document.querySelector("form[name='new-card']");

const cardsContainer = document.querySelector('.elements');

const validatorProfile = new FormValidator(config, formProfile);
validatorProfile.enableValidation();
const validatorPlace = new FormValidator(config, formPlace);
validatorPlace.enableValidation();

const popupIncludesImage = document.querySelector('#popup-image');
const popupImage = new PopupWithImage(popupIncludesImage);
popupImage.setEventListeners();

function open(name, link) {
  popupImage.open(name, link);
}

function addNewCard({ place, link }) {
  const card = new Card(place, link, '#element-template', open).createCard();
  cardsContainer.prepend(card);
}

function saveProfileData({ name, work }) {
  user.setUserInfo(name, work);
}

const popupFormProfile = new PopupWithForm(popupProfile, saveProfileData);
const popupAddCardObj = new PopupWithForm(popupAddCard, addNewCard);
popupFormProfile.setEventListeners();
popupAddCardObj.setEventListeners();

const user = new UserInfo(profileName, profileJob);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, '#element-template', open).createCard();
      cardList.addItem(card);
    },
  },
  cardsContainer,
);

cardList.renderItems();

// Открытие попапа профиля
openProfilePopupButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupFormProfile.open();
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

// Открытие попапа для добавления карточки
openCardPopupButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupAddCardObj.open();
});
