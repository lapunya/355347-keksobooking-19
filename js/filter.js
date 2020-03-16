'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeInput = mapFilters.querySelector('#housing-type');

  var maxPinNumber = 5;

  var FilterType = {
    type: 'any',
    guests: 'any',
    rooms: 'any',
    price: 'any',
    fetures: []
  };

  var currentFilterType;

  var onSuccessApiResponse = function (advertisements) {
    var filteredAdvertisements = getFilterAdvertisements(advertisements, currentFilterType);

    window.pin.reset();
    window.pin.render(filteredAdvertisements);
  };

  var onErrorApiResponse = function (errorMessage) {
    window.form.showErrorMessage(errorMessage);
  };

  var getFilterAdvertisements = function (advertisements, type) {
    if (type === 'any') {
      return getRightAmountPins(advertisements);
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
    return data.slice(0, maxPinNumber);
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins,
    onErrorApiResponse: onErrorApiResponse,
    onSuccessApiResponse: onSuccessApiResponse
  };
})();
