'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var maxPinNumber = 5;

  var HousePrice = {
    any: 'any',
    low: '10000',
    high: '50000'
  };

  var currentFilterValue;
  var currentInputElement;

  var onSuccessApiResponse = function (advertisements) {
    var filteredAdvertisements = getFilterAdvertisements(advertisements, currentFilterValue);
    var cutAdvertisements = getRightAmountPins(filteredAdvertisements);

    window.main.reset();
    window.pin.render(cutAdvertisements);
  };

  var onErrorApiResponse = function (errorMessage) {
    window.form.showErrorMessage(errorMessage);
  };

  var getFilterAdvertisements = function (advertisements, value) {
    if (value === 'any') {
      return advertisements;
    }

    return applyFilter(advertisements, value);
  };

  var onChangeSelect = function (advertisements, value) {
    var selectType = currentInputElement.getAttribute('data-select-type');

    switch (selectType) {
      case 'type':
        return advertisements.filter(function (item) {
          return item.offer.type === value;
        });
      case 'guests':
        return advertisements.filter(function (item) {
          return item.offer.guests === +value;
        });
      case 'rooms':
        return advertisements.filter(function (item) {
          return item.offer.rooms === +value;
        });
      case 'price':
        switch (value) {
          case 'low':
            return advertisements.filter(function (item) {
              return item.offer.price <= HousePrice.low;
            });
          case 'middle':
            return advertisements.filter(function (item) {
              return item.offer.price >= HousePrice.low && item.offer.price < HousePrice.high;
            });
          case 'high':
            return advertisements.filter(function (item) {
              return item.offer.price >= HousePrice.high;
            });
          default:
            return advertisements;
        }
      default:
        return advertisements;
    }
  };

  var onChangeInput = function (advertisements, value) {
    var inputType = currentInputElement.type;

    switch (inputType) {
      case 'checkbox':
        var checked = currentInputElement.checked;

        if (checked) {
          return advertisements.filter(function (item) {
            return item.offer.features.includes(value);
          });
        } else {
          return advertisements.filter(function (item) {
            return !(item.offer.features.includes(value));
          });
        }
      default:
        return advertisements;
    }
  };

  var applyFilter = function (advertisements, value) {
    var inputTag = currentInputElement.tagName.toLowerCase();

    switch (inputTag) {
      case 'input':
        return onChangeInput(advertisements, value);
      case 'select':
        return onChangeSelect(advertisements, value);
      default:
        return advertisements;
    }
  };

  var onChangeFilter = window.util.debounce(function (event) {
    var target = event.target;

    currentInputElement = target;
    currentFilterValue = target.value;
    window.backend.download(onSuccessApiResponse, onErrorApiResponse);
  });

  mapFilters.addEventListener('change', onChangeFilter);


  var getRightAmountPins = function (data) {
    return data.slice(0, maxPinNumber);
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins,
    onErrorApiResponse: onErrorApiResponse,
    onSuccessApiResponse: onSuccessApiResponse
  };
})();
