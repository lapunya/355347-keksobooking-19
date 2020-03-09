'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');

  var mainPin = document.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;

  var mainPinX = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
  var inactiveMainPinY = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2);
  var activeMainPinY = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT);

  var inputAddress = document.querySelector('#address');

  inputAddress.value = mainPinX + ', ' + inactiveMainPinY; // заполнение поля адреса в неактивном состоянии

  var setInactiveState = function () { // неактивное состояние страницы
    for (var i = 0; i < adFormFields.length; i++) {
      adFormFields[i].disabled = true;
    }
  };

  var setActiveState = function () { // активное состояние страницы
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    for (var i = 0; i < adFormFields.length; i++) {
      adFormFields[i].disabled = false;
    }
    inputAddress.value = mainPinX + ', ' + activeMainPinY;
  };

  var setupApplication = function () {
    setInactiveState();
  };

  setupApplication();

  window.main = {
    inputAddress: inputAddress,
    setInactiveState: setInactiveState,
    setActiveState: setActiveState
  };

})();
