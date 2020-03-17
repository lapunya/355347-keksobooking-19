'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeInput = mapFilters.querySelector('#housing-type');
  var guests = mapFilters.querySelector('#housing-guests');
  var maxPinNumber = 5;

  var FilterType = {
    type: 'any',
    guests: 'any',
    rooms: 'any',
    price: 'any',
    fetures: []
  };

  var currentFilterValue;
  var selectType;

  var onSuccessApiResponse = function (advertisements) {
    var filteredAdvertisements = getFilterAdvertisements(advertisements, currentFilterValue);

    window.pin.reset();
    window.pin.render(filteredAdvertisements);
  };

  var onErrorApiResponse = function (errorMessage) {
    window.form.showErrorMessage(errorMessage);
  };

  var getFilterAdvertisements = function (advertisements, value) {
    if (value === 'any') {
      return getRightAmountPins(advertisements);
    }

    return onSelectChange(advertisements, value);
  };

  var onSelectChange = function (advertisements, value) {
    if (selectType === 'type') {
      return advertisements.filter(function (item) {
        return item.offer.type === value;
      });
    } else if (selectType === 'guests') {
      return advertisements.filter(function (item) {
        return item.offer.guests === value;
      });
    }
  };

  var onChangeInput = function (event) {
    var value = event.target.value;
    currentFilterValue = value;

    var target = event.target;
    selectType = target.getAttribute('data-select-type');

    window.backend.download(onSuccessApiResponse, onErrorApiResponse);
  };

  housingTypeInput.addEventListener('change', onChangeInput);
  guests.addEventListener('change', onChangeInput);

  var getRightAmountPins = function (data) {
    return data.slice(0, maxPinNumber);
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins,
    onErrorApiResponse: onErrorApiResponse,
    onSuccessApiResponse: onSuccessApiResponse
  };
})();
