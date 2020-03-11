'use strict';

(function () {
  var mainPage = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var roomsInput = adForm.querySelector('#room_number');
  var guestsInput = adForm.querySelector('#capacity');

  var houseTypeInput = adForm.querySelector('#type');
  var housePriceInput = adForm.querySelector('#price');

  var roomsArray = roomsInput.querySelectorAll('option');
  var guestsArray = guestsInput.querySelectorAll('option');

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // сообщение об успешной отправке формы
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // сообщение об ошибке при отправке формы

  var validateRoomRuleGuest = {
    '100': function (value) {
      return value === 0;
    },
    '1': function (value) {
      return value === 1;
    },
    '2': function (value) {
      return value === 1 || value === 2;
    },
    '3': function (value) {
      return value === 1 || value === 2 || value === 3;
    }
  };

  var onSuccessApiResponse = function () {
    mainPage.appendChild(successMessageTemplate);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onError = function (errorMessage) {
    var fragment = document.createDocumentFragment();

    errorMessageTemplate.querySelector('.error__message').textContent = errorMessage;

    fragment.appendChild(errorMessageTemplate);
    mainPage.appendChild(fragment);
  };

  var closeMessage = function () {
    successMessageTemplate.remove();
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onMessageEscPress = function (evt) {
    window.util.isEscPress(evt, closeMessage);
  };

  var installForm = function () {
    guestsInput.addEventListener('input', function () { // Валидация полей с количеством гостей и количеством комнат
      var guests = window.util.getSelectedOption(guestsArray);
      var rooms = window.util.getSelectedOption(roomsArray);

      var guestValue = Number(guests.value);
      var roomValue = rooms.value;

      var validateMethod = validateRoomRuleGuest[roomValue];

      var isValidInput = validateMethod(guestValue);

      if (!isValidInput) {
        guestsInput.setCustomValidity('Число гостей не должно превышать количество комнат');
      } else {
        guestsInput.setCustomValidity('');
      }
    });

    houseTypeInput.addEventListener('input', function () { // функция валидации полей типа жилья и цены
      var houseType = window.util.getSelectedOption(houseTypeInput).value;

      switch (houseType) {
        case 'bungalo':
          housePriceInput.min = 0;
          housePriceInput.placeholder = 0;
          break;

        case 'flat':
          housePriceInput.min = 1000;
          housePriceInput.placeholder = 1000;
          break;

        case 'house':
          housePriceInput.min = 5000;
          housePriceInput.placeholder = 5000;
          break;

        case 'palace':
          housePriceInput.min = 10000;
          housePriceInput.placeholder = 10000;
          break;
      }
    });

    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.upload(new FormData(adForm), onSuccessApiResponse, onError);
    });
  };

  window.form = {
    install: installForm
  };

})();
