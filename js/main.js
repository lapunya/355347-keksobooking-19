'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');

  var mapFiltersContainer = map.querySelector('.map__filters');
  var mapFilters = mapFiltersContainer.childNodes;

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;

  var mainPinInitialX = mainPin.style.left;
  var mainPinInitialY = mainPin.style.top;

  var mainPinX = Math.round(parseInt(mainPin.style.left, 10) + mainPinWidth / 2);
  var inactiveMainPinY = Math.round(parseInt(mainPin.style.top, 10) + mainPinHeight / 2);
  var activeMainPinY = Math.round(parseInt(mainPin.style.top, 10) + mainPinHeight);

  var inputAddress = document.querySelector('#address');
  var isSceneCreated = false;

  var setInactiveState = function () { // неактивное состояние страницы
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');

    mainPin.style.left = mainPinInitialX;
    mainPin.style.top = mainPinInitialY;

    adFormFields.forEach(function (item) {
      item.disabled = true;
    });

    mapFilters.forEach(function (item) {
      item.disabled = true;
    });

    inputAddress.placeholder = mainPinX + ', ' + inactiveMainPinY; // заполнение поля адреса в неактивном состоянии
    isSceneCreated = false;
  };

  var setActiveState = function () { // активное состояние страницы
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');

    adFormFields.forEach(function (item) {
      item.disabled = false;
    });

    mapFilters.forEach(function (item) {
      item.disabled = false;
    });

    inputAddress.placeholder = mainPinX + ', ' + activeMainPinY; // заполнение поля адреса в активном состоянии
  };

  var createScene = function (advertisements) {
    if (!isSceneCreated) {
      window.main.setActiveState(); // включаем активное состояние страницы

      var filteredAdvertisements = window.filter.getRightAmountPins(advertisements); // создаем массив отфильтрованных объявлений

      window.pin.render(filteredAdvertisements); // рендерим отфильтрованные метки
      isSceneCreated = true;
    }
  };

  var resetMap = function () {
    var renderedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    renderedPins.forEach(function (pin) {
      pin.remove();
    });

    var renderedCard = map.querySelector('.map__card');

    if (renderedCard) {
      renderedCard.remove();
    }
  };

  var resetAdForm = function () {
    adForm.querySelectorAll('input').forEach(function (item) {
      if (item.type === 'checkbox') {
        item.checked = false;
      }
      item.value = '';
    });
  };

  var fetchApiData = function () {
    window.backend.download(createScene, window.filter.onErrorApiResponse);
  };

  var setupApplication = function () {
    window.map.install();
    window.form.install();
    setInactiveState();
  };

  setupApplication();

  window.main = {
    inputAddress: inputAddress,
    setInactiveState: setInactiveState,
    setActiveState: setActiveState,
    fetchApiData: fetchApiData,
    createScene: createScene,
    resetMap: resetMap,
    resetAdForm: resetAdForm
  };

})();
