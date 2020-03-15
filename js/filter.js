'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map__pins');
  var maxPinNumber = 5;

  var allAdvertisements = []; // массив со всеми объявлениями на сервере

  var onSuccessApiResponse = function (advs) {
    advs.forEach(function (elem) {
      allAdvertisements.push(elem);
    });
  };

  var onErrorApiResponse = function (errorMessage) {
    window.form.showErrorMessage(errorMessage);
  };

  window.backend.download(onSuccessApiResponse, onErrorApiResponse);

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeInput = mapFilters.querySelector('#housing-type');
  var housingTypes = housingTypeInput.querySelectorAll('option');

  var inputFilter = function () {
    var selectedOption = window.util.getSelectedOption(housingTypes);
    return selectedOption.value;
  };

  var filteredAdvertisement = [];

  var pinFilter = function () {
    filteredAdvertisement = allAdvertisements.filter(function (elem) {
      if (inputFilter() !== 'any') {
        return elem.offer.type === inputFilter();
      }
    });
    /* allAdvertisements.forEach(function (elem) {
      if (elem.offer.type !== inputFilter()) {
        filteredAdvertisement.push(elem);
      }
    });
    return filteredAdvertisement; */
  };
  console.log(allAdvertisements);
  pinFilter();
  console.log(pinFilter());

  var getRightAmountPins = function (data) {
    data.slice(0, maxPinNumber).forEach(function (elem) {
      fragment.appendChild(window.pin.create(elem));
    });
    map.appendChild(fragment);
  };

  var getFilteredPins = getRightAmountPins(filteredAdvertisement);

  var filterInstall = function () {
    housingTypeInput.addEventListener('change', getFilteredPins);
  };
  window.filter = {
    getRightAmountPins: getRightAmountPins,
    advArray: allAdvertisements,
    install: filterInstall
  };
})();
