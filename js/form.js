'use strict';

(function () {
  var mainPage = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var roomsInput = adForm.querySelector('#room_number');

  var guestsInput = adForm.querySelector('#capacity');
  var houseTypeInput = adForm.querySelector('#type');
  var housePriceInput = adForm.querySelector('#price');

  var timeFieldset = adForm.querySelector('.ad-form__element--time');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  var guestsArray = guestsInput.querySelectorAll('option');

  var messageElement;
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success'); // сообщение об успешной отправке формы
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error'); // сообщение об ошибке при отправке формы

  /* var validateRoomRuleGuest = {
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
  }; */

  var onTimeInputChange = function (evt) { // валидация полей времени заезда/выезда
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  var onSuccessApiResponse = function () {
    messageElement = successMessageTemplate;

    window.main.setInactiveState();
    window.pin.reset();

    mainPage.appendChild(successMessageTemplate);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onErrorApiResponse = function (errorMessage) {
    messageElement = errorMessageTemplate;

    errorMessageTemplate.querySelector('.error__message').textContent = errorMessage;

    mainPage.appendChild(errorMessageTemplate);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
  };

  var closeMessage = function () { // функция закрытия сообщения
    messageElement.remove();
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', onMessageClick);
  };

  var onMessageEscPress = function (evt) { // нажатие Esc на сообщении
    window.util.isEscPress(evt, closeMessage);
  };

  var onMessageClick = function (evt) { // клик по сообщению
    window.util.isLeftMouseButtonClick(evt, closeMessage);
  };

  var onResetClick = function () {
    window.main.setInactiveState();
    window.pin.reset();
  };

  var installForm = function () {
    roomsInput.addEventListener('change', function (evt) {
      var rooms = evt.target;

      guestsArray.forEach(function (elem) {
        if (+elem.value <= +rooms.value && +elem.value !== 0) {
          elem.disabled = false;
        } else if (+elem.value === 0 && +rooms.value === 100) {
          elem.disabled = false;
          elem.selected = true;
        } else {
          elem.disabled = true;
          elem.selected = false;
        }
      });
    });
    /* guestsInput.addEventListener('input', function () { // Валидация полей с количеством гостей и количеством комнат
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
    }); */

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

    timeFieldset.addEventListener('change', onTimeInputChange);

    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.backend.upload(new FormData(adForm), onSuccessApiResponse, onErrorApiResponse);
    });

    adForm.addEventListener('reset', onResetClick);
  };

  window.form = {
    install: installForm,
    showErrorMessage: onErrorApiResponse
  };

})();
