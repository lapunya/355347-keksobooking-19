'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map__pins'); // блок в который копируем объявления
  var mainPin = map.querySelector('.map__pin--main');

  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;

  var mapWidth = map.offsetWidth;
  var mapTopBound = 130;
  var mapBottomBound = 630;

  var onActiveMouse = function (evt) {
    evt.preventDefault();

    var scrollY = window.scrollY;

    if (evt.button === 0) {
      window.main.fetchApiData();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      window.main.inputAddress.value = startCoords.x + ', ' + (startCoords.y + scrollY);

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

        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

        if (mainPin.offsetLeft < -(mainPinWidth / 2)) {
          mainPin.style.left = (-(mainPinWidth / 2)) + 'px';
        }

        if (mainPin.offsetLeft > mapWidth - (mainPinWidth / 2)) {
          mainPin.style.left = (mapWidth - (mainPinWidth / 2)) + 'px';
        }

        if (mainPin.offsetTop < mapTopBound - mainPinHeight) {
          mainPin.style.top = (mapTopBound - mainPinHeight) + 'px';
        }

        if (mainPin.offsetTop > mapBottomBound - mainPinHeight) {
          mainPin.style.top = (mapBottomBound - mainPinHeight) + 'px';
        }

        window.main.inputAddress.value = startCoords.x + ', ' + (startCoords.y + scrollY);
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
      window.main.setActiveState();
      window.main.fetchApiData();
      mainPin.removeEventListener('keydown', onActiveKey);
    }
  };
  var installMap = function () {
    mainPin.addEventListener('mousedown', onActiveMouse);
    mainPin.addEventListener('keydown', onActiveKey);
  };

  window.map = {
    install: installMap
  };

})();
