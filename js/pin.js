'use strict';

(function () {
  var mainPage = document.querySelector('main');
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

  var appendPinElements = function (container, fragment, data) {
    window.filter.getRightAmountPins(window.filter.advArray);

    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)'); // запись коллекции маркеров в переменную, кроме главного маркера

    for (var y = 0; y < mapPins.length; y++) {
      var pin = mapPins[y];

      (function () {
        var index = y;

        var onPinClick = function () {
          var currentCard = container.querySelector('.map__card');

          if (currentCard) {
            currentCard.remove();
          }

          fragment.appendChild(window.card.create(data[index]));
          container.appendChild(fragment);

          var closeButton = document.querySelector('.popup__close');

          (function () {
            currentCard = container.querySelector('.map__card');

            var closeCard = function () {
              currentCard.remove();
              closeButton.removeEventListener('click', closeCard);
              document.removeEventListener('keydown', onEscPress);
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

  var removePinElements = function () {
    var renderedPins = mainPage.querySelectorAll('.map__pin:not(.map__pin--main)');
    renderedPins.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    create: createMarker,
    render: appendPinElements,
    reset: removePinElements
  };

})();
