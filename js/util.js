'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var DEBOUNCE_INTERVAL = 300;

  var isEscPress = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var isLeftMouseButtonClick = function (evt, action) {
    if (evt.button === 0) {
      action();
    }
  };

  var getSelectedOption = function (selectArray) {
    var selectedOption;
    for (var i = 0; i < selectArray.length; i++) {
      if (selectArray[i].selected) {
        selectedOption = selectArray[i];
        break;
      }
    }
    return selectedOption;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    isEscPress: isEscPress,
    isLeftMouseButtonClick: isLeftMouseButtonClick,
    getSelectedOption: getSelectedOption,
    debounce: debounce
  };
})();
