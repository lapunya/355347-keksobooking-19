'use strict';

(function () {
  var titles = ['Title1', 'Title2', 'Title3', 'Title4'];
  var types = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var checkinTimes = ['12:00', '13:00', '14:00'];

  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  window.data = {
    advertisementTitles: titles,
    advertisementTypes: types,
    checkinTimes: checkinTimes,
    checkoutTimes: checkoutTimes,
    advertisementFeatures: features,
    advertisementPhotos: photos
  };
})();
