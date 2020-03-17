'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeInput = mapFilters.querySelector('#housing-type');
  var guestsInput = mapFilters.querySelector('#housing-guests');

  var roomsInput = mapFilters.querySelector('#housing-rooms');
  var priceInput = mapFilters.querySelector('#housing-price');
  var maxPinNumber = 5;

  var HousePrice = {
    any: 'any',
    low: '10000',
    high: '50000'
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
        return item.offer.guests === +value;
      });
    } else if (selectType === 'rooms') {
      return advertisements.filter(function (item) {
        return item.offer.rooms === +value;
      });
    } else if (selectType === 'price') {
      if (value === 'low') {
        return advertisements.filter(function (item) {
          return item.offer.price <= HousePrice.low;
        });
      } else if (value === 'middle') {
        return advertisements.filter(function (item) {
          return item.offer.price >= HousePrice.low && item.offer.price < HousePrice.high;
        });
      } else if (value === 'high') {
        return advertisements.filter(function (item) {
          return item.offer.price >= HousePrice.high;
        });
      }
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
  guestsInput.addEventListener('change', onChangeInput);
  roomsInput.addEventListener('change', onChangeInput);
  priceInput.addEventListener('change', onChangeInput);

  var getRightAmountPins = function (data) {
    return data.slice(0, maxPinNumber);
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins,
    onErrorApiResponse: onErrorApiResponse,
    onSuccessApiResponse: onSuccessApiResponse
  };
})();
