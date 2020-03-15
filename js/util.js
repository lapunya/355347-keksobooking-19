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

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNumber;
  };

  var getRandomArrayElement = function (array) {
    var randomElement = Math.floor(Math.random() * array.length);
    return array[randomElement];
  };

  var getArrayRandomLength = function (array) {
    var arrayRandomLength = [];
    for (var i = 0; i < array.length; i++) {
      arrayRandomLength.push(array[i]);
    }
    arrayRandomLength.length = getRandomNumber(0, array.length);
    return arrayRandomLength;
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
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getArrayRandomLength: getArrayRandomLength,
    getSelectedOption: getSelectedOption
  };
})();
