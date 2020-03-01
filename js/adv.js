'use strict';

(function () {
  var mapPinsElement = document.querySelector('.map__pins');
  var mapWidth = mapPinsElement.offsetWidth;

  var createAdvertisement = function (index) {
    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + index + '.png'
      },
      offer: {
        title: window.util.getRandomArrayElement(window.data.title),
        address: '600, 350',
        price: window.util.getRandomNumber(1000, 10000),
        type: window.util.getRandomArrayElement(window.data.type),
        rooms: window.util.getRandomNumber(1, 3),
        guests: window.util.getRandomNumber(1, 2),
        checkin: window.util.getRandomArrayElement(window.data.checkinTime),
        checkout: window.util.getRandomArrayElement(window.data.checkoutTime),
        features: window.util.getArrayRandomLength(window.data.feature),
        description: 'description',
        photos: window.util.getArrayRandomLength(window.data.photo)
      },
      location: {
        x: window.util.getRandomNumber(0, mapWidth),
        y: window.util.getRandomNumber(130, 630)
      }
    };
    return advertisement;
  };

  window.adv = {
    create: createAdvertisement
  };

})();
