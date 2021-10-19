import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import '../pages/index.css';

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
const profileAvatar = document.querySelector('.profile__info-img');
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
  cardList.addItem(card);
  api.setCard({
    name: place,
    link,
  });
}

function saveProfileData({ name, work }) {
  user.setUserInfo(name, work);
  api.setUserInfo({
    name,
    about: work,
  });
}

const popupFormProfile = new PopupWithForm(popupProfile, saveProfileData);
const popupAddCardObj = new PopupWithForm(popupAddCard, addNewCard);
popupFormProfile.setEventListeners();
popupAddCardObj.setEventListeners();

const user = new UserInfo(profileName, profileJob, profileAvatar);

// Открытие попапа профиля
openProfilePopupButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupFormProfile.open();
  const profile = user.getUserInfo();
  inputName.value = profile.name;
  inputJob.value = profile.work;
});

// Открытие попапа для добавления карточки
openCardPopupButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  popupAddCardObj.open();
  validatorPlace.toggleButtonState();
});

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(item.name, item.link, '#element-template', open).createCard();
      cardList.addItem(card);
    },
  },
  cardsContainer,
);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  headers: {
    authorization: '6adb5917-fadd-495b-b42d-5e1b4d17c497',
    'Content-Type': 'application/json',
  },
});

api.getUserInfo().then((res) => {
  user.setUserInfo(res.name, res.about, res.avatar, res.id);
  console.log(res);
});

api.getCards().then((res) => {
  cardList.setItems(res);
  cardList.renderItems();
});
