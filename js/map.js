'use strict';
(function () {
  var mainPin = document.querySelector('.map__pin--main');
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

            var closeCard = function () {
              currentCard.remove();
              closeButton.removeEventListener('keydown', onEscPress);
            };

            var onEscPress = function (evt) {
              window.util.isEscPress(evt, closeCard);
            };

            closeButton.addEventListener('click', closeCard);
            document.addEventListener('keydown', onEscPress);
          })();
        };

        pin.addEventListener('click', onPinClick);
      })();
    }
  };

  window.page.setInactiveState();

  var onActiveMouse = function (evt) {
    evt.preventDefault();
    var mapBound = advertisementCard.getBoundingClientRect();
    var scrollY = window.scrollY;

    if (evt.button === 0) {
      window.page.setActiveState();
      appendPinElements();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      window.page.inputAddress.value = startCoords.x + ', ' + (startCoords.y + scrollY);

      var onMouseMove = function (moveEvt) {
        evt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (startCoords.x <= mapBound.left || startCoords.x >= mapBound.right || startCoords.y < mapBound.top + 130 || startCoords.y + scrollY > 630) {
          return;
        }
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

        window.page.inputAddress.value = startCoords.x + ', ' + (startCoords.y + scrollY);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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
