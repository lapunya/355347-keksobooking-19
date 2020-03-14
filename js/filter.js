'use strict';
(function () {
  var fragment = document.createDocumentFragment();
  var map = document.querySelector('.map__pins');
  var maxPinNumber = 5;

  var getRightAmountPins = function (data) {
    data.slice(0, maxPinNumber).forEach(function (elem) {
      fragment.appendChild(window.pin.create(elem));
    });
    map.appendChild(fragment);
  };

  window.filter = {
    getRightAmountPins: getRightAmountPins
  };
})();
