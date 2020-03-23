'use strict';

(function () {
  var markerTemplate = document.querySelector('#pin').content;

  var createMarker = function (advertisement) { // Функция создания маркера
    var markerElement = markerTemplate.cloneNode(true);

    var avatarOfMarker = markerElement.querySelector('img');
    var coorOfMarker = markerElement.querySelector('.map__pin');

    avatarOfMarker.src = advertisement.author.avatar;
    avatarOfMarker.alt = advertisement.offer.title;
    coorOfMarker.style.left = advertisement.location.x + 'px';
    coorOfMarker.style.top = advertisement.location.y + 'px';

    return markerElement;
  };

  var renderPinElements = function (data) {
    var fragment = document.createDocumentFragment();
    var map = document.querySelector('.map__pins');

    data.forEach(function (elem) {
      fragment.appendChild(window.pin.create(elem));
    });
    map.appendChild(fragment);

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // запись коллекции маркеров в переменную, кроме главного маркера

    for (var y = 0; y < mapPins.length; y++) {
      var pin = mapPins[y];

      (function () {
        var index = y;

        var onPinClick = function () {
          var currentCard = map.querySelector('.map__card');

          if (currentCard) {
            currentCard.remove();
          }

          fragment.appendChild(window.card.create(data[index]));
          map.appendChild(fragment);

          var closeButton = document.querySelector('.popup__close');

          (function () {
            currentCard = map.querySelector('.map__card');

            var onCloseCardClick = function () {
              currentCard.remove();
              closeButton.removeEventListener('click', onCloseCardClick);
              document.removeEventListener('keydown', onEscPress);
            };

            var onEscPress = function (evt) {
              window.util.isEscPress(evt, onCloseCardClick);
            };

            closeButton.addEventListener('click', onCloseCardClick);
            document.addEventListener('keydown', onEscPress);
          })();
        };

        pin.addEventListener('click', onPinClick);
      })();
    }
  };

  window.pin = {
    create: createMarker,
    render: renderPinElements
  };

})();
