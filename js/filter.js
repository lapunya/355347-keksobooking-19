'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map__pins');
  var maxPinNumber = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeInput = mapFilters.querySelector('#housing-type');

  var FilterType = {
    type: 'any',
    guests: 'any',
    rooms: 'any',
    price: 'any',
    fetures: []
  };

  var filteredAdvertisements = []; // массив со всеми объявлениями на сервере

  var currentFilterType;

  var onSuccessApiResponse = function (advertisements) {
    filteredAdvertisements = getFilterAdvertisements(advertisements, currentFilterType);
    window.pin.reset();
    getRightAmountPins(filteredAdvertisements);

  };

  var onErrorApiResponse = function (errorMessage) {
    window.form.showErrorMessage(errorMessage);
  };

  var getFilterAdvertisements = function (advertisements, type) {
    if (type === 'any') {
      return advertisements;
    }

    return advertisements.filter(function (item) {
      return item.offer.type === type;
    });
  };

  var onChangeInput = function (event) {
    var type = event.target.value;
    currentFilterType = type;

    window.backend.download(onSuccessApiResponse, onErrorApiResponse);
  };

  housingTypeInput.addEventListener('change', onChangeInput);

  var getRightAmountPins = function (data) {
    data.slice(0, maxPinNumber).forEach(function (elem) {
      fragment.appendChild(window.pin.create(elem));
    });
    map.appendChild(fragment);
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins,
    advArray: allAdvertisements
  };
})();
