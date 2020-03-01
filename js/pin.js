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

  window.pin = {
    create: createMarker
  };

})();
