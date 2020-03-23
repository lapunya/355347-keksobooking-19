'use strict';
(function () {
  var mapFiltersContainer = document.querySelector('.map__filters');
  var maxPinNumber = 5;

  var HousePrice = {
    any: 'any',
    low: '10000',
    high: '50000'
  };

  var onSuccessApiResponse = function (advertisements) {
    var filteredAdvertisements = advertisements
      .filter(onChangeHousingType)
      .filter(onChangeHousingPrice)
      .filter(onChangeHousingGuests)
      .filter(onChangeHousingRooms)
      .filter(onChangeHousingFeatures);

    window.main.resetMap();
    window.pin.render(filteredAdvertisements);
  };

  var onErrorApiResponse = function (errorMessage) {
    window.form.showErrorMessage(errorMessage);
  };

  var housingType = mapFiltersContainer.querySelector('#housing-type');

  var onChangeHousingType = function (advertisement) {
    var housingValue = housingType.value;

    if (housingValue === 'any') {
      return advertisement;
    }

    return advertisement.offer.type === housingValue;
  };

  var housingPrice = mapFiltersContainer.querySelector('#housing-price');

  var onChangeHousingPrice = function (advertisement) {
    var housingPriceValue = housingPrice.value;

    if (housingPriceValue === 'any') {
      return advertisement;
    }

    switch (housingPriceValue) {
      case 'low':
        return advertisement.offer.price <= HousePrice.low;
      case 'middle':
        return advertisement.offer.price >= HousePrice.low && advertisement.offer.price < HousePrice.high;
      case 'high':
        return advertisement.offer.price >= HousePrice.high;
      default:
        return advertisement;
    }
  };

  var housingRooms = mapFiltersContainer.querySelector('#housing-rooms');

  var onChangeHousingRooms = function (advertisement) {
    var housingRoomsValue = housingRooms.value;

    if (housingRoomsValue === 'any') {
      return advertisement;
    }

    return advertisement.offer.rooms === +housingRoomsValue;
  };

  var housingGuests = mapFiltersContainer.querySelector('#housing-guests');

  var onChangeHousingGuests = function (advertisement) {
    var housingGuestsValue = housingGuests.value;

    if (housingGuestsValue === 'any') {
      return advertisement;
    }

    return advertisement.offer.guests === +housingGuestsValue;
  };

  var features = mapFiltersContainer.querySelectorAll('input');
  var newArray = [];

  var onChangeHousingFeatures = function (advertisement) {
    features.forEach(function (item) {
      if (item.checked) {
        newArray.push(item.value);
      } else if (!(item.checked)) {
        newArray.pop(item.value);
      }
    });

    newArray.forEach(function (item) {
      return advertisement.offer.features.includes(item.value);
    });
  };

  var onChangeFilter = window.util.debounce(function () {
    window.backend.download(onSuccessApiResponse, onErrorApiResponse);
  });

  mapFiltersContainer.addEventListener('change', onChangeFilter);

  var getRightAmountPins = function (data) {
    return data.slice(0, maxPinNumber);
  };

  var resetFilters = function () {
    var mapSelects = mapFiltersContainer.querySelectorAll('select');
    var mapInputs = mapFiltersContainer.querySelectorAll('input');

    mapSelects.forEach(function (item) {
      if (item.value !== 'any') {
        item.value = 'any';
      }
    });

    mapInputs.forEach(function (item) {
      if (item.checked) {
        item.checked = false;
      }
    });
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins,
    onErrorApiResponse: onErrorApiResponse,
    onSuccessApiResponse: onSuccessApiResponse,
    reset: resetFilters
  };
})();
