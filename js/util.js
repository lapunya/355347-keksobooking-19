'use strict';

(function () {
  var ESC_KEY = 'Escape';

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

  window.util = {
    isEscPress: isEscPress,
    isLeftMouseButtonClick: isLeftMouseButtonClick,
    getSelectedOption: getSelectedOption
  };
})();
