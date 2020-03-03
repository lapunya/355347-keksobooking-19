'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var advertisements = []; // массив с объявлениями
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    var correctIndex = i + 1;
    advertisements[i] = window.advertisement.create(correctIndex);
    var newPin = window.pin.create(advertisements[i]);
    fragment.appendChild(newPin);
  }

  var advertisementCard = document.querySelector('.map__pins'); // блок в который копируем объявления

  var appendPinElements = function () {
    advertisementCard.appendChild(fragment); // рендер маркеров на карту

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // запись коллекции маркеров в переменную, кроме главного маркера

    for (var y = 0; y < mapPins.length; y++) {
      var pin = mapPins[y];

      (function () {
        var index = y;

        var onPinClick = function () {
          var currentCard = advertisementCard.querySelector('.map__card');

          if (currentCard) {
            currentCard.remove();
          }

          fragment.appendChild(window.card.create(advertisements[index]));
          advertisementCard.appendChild(fragment);

          var closeButton = document.querySelector('.popup__close');

          (function () {
            var currentCard = advertisementCard.querySelector('.map__card');

            var onCloseClick = function () {
              currentCard.remove();
              closeButton.removeEventListener('click', onCloseClick);
            };

            var onEscPress = function (evt) {
              if (evt.key === ESC_KEY) {
                currentCard.remove();
                document.removeEventListener('keydown', onEscPress);
              }
            };

            closeButton.addEventListener('click', onCloseClick);
            document.addEventListener('keydown', onEscPress);
          })();
        };

        pin.addEventListener('click', onPinClick);
      })();
    }
  };

  window.page.setInactiveState();

  var onActiveMouse = function (evt) {
    if (evt.button === 0) {
      window.page.setActiveState();
      appendPinElements();
    }
  };

  var onActiveKey = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.page.setActiveState();
      appendPinElements();
    }
  };

  mainPin.addEventListener('mousedown', onActiveMouse);
  mainPin.addEventListener('keydown', onActiveKey);
})();
