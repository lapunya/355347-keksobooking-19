'use strict';
(function () {
  var map = document.querySelector('.map__pins'); // блок в который копируем объявления
  var mainPin = map.querySelector('.map__pin--main');
  var ENTER_KEY = 'Enter';

  var fragment = document.createDocumentFragment();

  var onActiveMouse = function (evt) {
    evt.preventDefault();
    var mapBound = map.getBoundingClientRect();
    var scrollY = window.scrollY;

    if (evt.button === 0) {
      createScene();
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      window.main.inputAddress.value = startCoords.x + ', ' + (startCoords.y + scrollY);

      var onMouseMove = function (moveEvt) {
        evt.preventDefault();

        var isLeftBoundOver = startCoords.x <= mapBound.left;
        var isRightBoundOver = startCoords.x >= mapBound.right;
        var isTopBoundOver = startCoords.y < mapBound.top + 130;
        var isBottomBoundOver = startCoords.y + scrollY > 630;

        var isMapBoundOver = isLeftBoundOver || isRightBoundOver || isTopBoundOver || isBottomBoundOver;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (isMapBoundOver) {
          return;
        }
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

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
      window.pin.render(map, fragment, window.filter.advArray);
      mainPin.removeEventListener('keydown', onActiveKey);
    }
  };
  var installMap = function () {
    mainPin.addEventListener('mousedown', onActiveMouse);
    mainPin.addEventListener('keydown', onActiveKey);
  };

  var createScene = function () {
    if (!window.main.isSceneCreated) {
      window.main.setActiveState(); // включаем активное состояние страницы
      window.pin.render(map, fragment, window.filter.advArray);
      window.main.isSceneCreated = true;
    }
  };

  window.map = {
    install: installMap
  };

})();
