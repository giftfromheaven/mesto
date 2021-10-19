import '../pages/index.css';
import { userIformation, popups, forms, buttons, template } from '../utils/variables.js';
import { arrayValidation } from '../utils/validation-list.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

function handleCardClick(place, link) {
  popupTypeImage.open(place, link);
}

function handleDeleteButton(card) {
  popupDeleteConfirmation.open();
  popupDeleteConfirmation.setNewHandler(() => {
    popupDeleteConfirmation.setButtonText(true);
    api
      .setDelete(card.getCardId())
      .then(() => {
        card.handleDeleteCard();
        popupDeleteConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteConfirmation.setButtonText(false);
      });
  });
}

function handleLikeClick(card, data) {
  const firstAction = card.isLiked(data) ? api.setDislike(data._id) : api.setLike(data._id);
  firstAction
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createNewElement(data) {
  const card = new Card({
    data: data,
    cardSelector: template.element,
    handleCardClick: handleCardClick,
    userId: userProfile.getUserInfo().userId,
    handleLikeClick: () => handleLikeClick(card, data),
    handleDeleteButton: () => handleDeleteButton(card),
  });
  return card.generateCard();
}

const cardList = new Section({
  render: (item) => {
    cardList.addItem(createNewElement(item));
  },
  containerSelector: template.listElements,
});

const popupAddElement = new PopupWithForm(popups.addPlace, handleFormAddElement);
popupAddElement.setEventListeners();

function handleButtonAddElement() {
  validationAddElementForm.toggleButtonState();
  validationAddElementForm.hideError();
  popupAddElement.open();
}

function handleFormAddElement(data) {
  popupAddElement.setButtonText(true);
  api
    .setCard(data)
    .then((data) => {
      cardList.addItem(createNewElement(data), false);
      popupAddElement.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddElement.setButtonText(false);
    });
}

const popupEditProfile = new PopupWithForm(popups.profile, handleFormProfile);
popupEditProfile.setEventListeners();

function handleButtonEdit() {
  popupEditProfile.open();
  const profile = userProfile.getUserInfo();
  popupEditProfile._inputs[0].value = profile.name;
  popupEditProfile._inputs[1].value = profile.about;
  validationEditForm.toggleButtonState();
  validationEditForm.hideError();
}

function handleFormProfile(userData) {
  popupEditProfile.setButtonText(true);
  api
    .setUserInfo(userData)
    .then((userData) => {
      userProfile.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.setButtonText(false);
    });
}

const popupEditAvatar = new PopupWithForm(popups.avatar, handleFormAvatar);
popupEditAvatar.setEventListeners();

function handleAvatar() {
  validationEditAvatarForm.toggleButtonState();
  validationEditAvatarForm.hideError();
  popupEditAvatar.open();
}

function handleFormAvatar(data) {
  popupEditAvatar.setButtonText(true);
  api
    .setAvatar(data)
    .then((data) => {
      userProfile.setUserInfo(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.setButtonText(false);
    });
}

const popupDeleteConfirmation = new PopupWithSubmit(popups.delete);
popupDeleteConfirmation.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27/',
  headers: {
    authorization: '6adb5917-fadd-495b-b42d-5e1b4d17c497',
    'Content-Type': 'application/json',
  },
});

const userProfile = new UserInfo(userIformation);

const popupTypeImage = new PopupWithImage(popups.image);
popupTypeImage.setEventListeners();

const validationEditAvatarForm = new FormValidator(arrayValidation, forms.avatar);
const validationEditForm = new FormValidator(arrayValidation, forms.plofile);
const validationAddElementForm = new FormValidator(arrayValidation, forms.place);
validationAddElementForm.enableValidation();
validationEditForm.enableValidation();
validationEditAvatarForm.enableValidation();

api
  .getAllneededData()
  .then((data) => {
    const [cards, userData] = data;
    userProfile.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

buttons.avatar.addEventListener('click', handleAvatar);
buttons.addPlace.addEventListener('click', handleButtonAddElement);
buttons.editProfile.addEventListener('click', handleButtonEdit);
