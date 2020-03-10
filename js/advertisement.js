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
        title: window.util.getRandomArrayElement(window.data.advertisementTitles),
        address: '600, 350',
        price: window.util.getRandomNumber(1000, 10000),
        type: window.util.getRandomArrayElement(window.data.advertisementTypes),
        rooms: window.util.getRandomNumber(1, 3),
        guests: window.util.getRandomNumber(1, 2),
        checkin: window.util.getRandomArrayElement(window.data.checkinTimes),
        checkout: window.util.getRandomArrayElement(window.data.checkoutTimes),
        features: window.util.getArrayRandomLength(window.data.advertisementFeatures),
        description: 'description',
        photos: window.util.getArrayRandomLength(window.data.advertisementPhotos)
      },
      location: {
        x: window.util.getRandomNumber(0, mapWidth),
        y: window.util.getRandomNumber(130, 630)
      }
    };
    return advertisement;
  };

  window.advertisement = {
    create: createAdvertisement
  };

})();
