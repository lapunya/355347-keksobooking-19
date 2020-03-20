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

  var onTimeInputChange = function (evt) { // валидация полей времени заезда/выезда
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  var onSuccessApiResponse = function () {
    messageElement = successMessageTemplate;

    window.main.setInactiveState();
    window.main.reset();

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
    window.main.reset();
  };

  var validateRoomInputElement = function () {
    guestsArray.forEach(function (guest) {
      var roomsCount = +roomsInput.value;
      var guestValue = +guest.value;

      switch (roomsCount) {
        case 100:
          if (guestValue === 0) {
            guest.disabled = false;
            guest.selected = true;
          } else {
            guest.disabled = true;
          }
          break;

        case 1:
          if (guestValue === 1) {
            guest.disabled = false;
            guest.selected = true;
          } else {
            guest.disabled = true;
          }
          break;

        case 2:
          if (guestValue <= 2 && guestValue !== 0) {
            guest.disabled = false;
            guest.selected = true;
          } else {
            guest.disabled = true;
          }
          break;

        case 3:
          if (guestValue <= 3 && guestValue !== 0) {
            guest.disabled = false;
            guest.selected = true;
          } else {
            guest.disabled = true;
          }
          break;
      }
    });
  };

  var installForm = function () {
    roomsInput.addEventListener('change', validateRoomInputElement);

    validateRoomInputElement();

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
