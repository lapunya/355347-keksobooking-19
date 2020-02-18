'use strict';

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var mainPin = document.querySelector('.map__pin--main');

var ENTER_KEY = 'Enter';
var MAIN_PIN_WIDTH = mainPin.offsetWidth;
var MAIN_PIN_HEIGHT = mainPin.offsetHeight;

var mainPinX = Math.round(parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
var inactiveMainPinY = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2);
var activeMainPinY = Math.round(parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT);

var inputAddress = adForm.querySelector('#address');

inputAddress.value = mainPinX  + ', ' + inactiveMainPinY; //заполнение поля адреса в неактивном состоянии

var setInactiveState = function () {//неактивное состояние страницы
  for (var fieldIndex = 0; fieldIndex < adFormFields.length; fieldIndex++) { 
    adFormFields[fieldIndex].disabled = true;
  }
};

var setActiveState = function () {//активное состояние страницы
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  for (var fieldIndex = 0; fieldIndex < adFormFields.length; fieldIndex++) { 
    adFormFields[fieldIndex].disabled = false;
  }
  inputAddress.value = mainPinX  + ', ' + activeMainPinY;
};

setInactiveState();

var roomsInput = adForm.querySelector('#room_number');
var guestsInput = adForm.querySelector('#capacity');

var roomsArray = roomsInput.querySelectorAll('option');
var guestsArray = guestsInput.querySelectorAll('option');

var getSelectedOption = function (selectArray) { //Функция нахождения выбранного элемента в select
  var selectedOption;
  for (var j = 0; j < selectArray.length; j++) {
    if (selectArray[j].selected) {
      selectedOption = selectArray[j];
      return selectedOption;
    }
  }
};

guestsInput.addEventListener('input', function () {
  if (getSelectedOption(guestsArray).value > getSelectedOption(roomsArray).value) {
    guestsInput.setCustomValidity('Количество гостей не должно превышать количество комнат');
  } else {
    guestsInput.setCustomValidity('');
  }
}); 

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

var getRandomArrayElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var advertisements = []; // массив с объявлениями
var mapPinsElement = document.querySelector('.map__pins');
var mapWidth = mapPinsElement.offsetWidth;

var titles = ['Title1', 'Title2', 'Title3', 'Title4'];
var types = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var checkinTimes = ['12:00', '13:00', '14:00'];

var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getArrayRandomLength = function (array) {
  var arrayRandomLength = [];
  for (var h = 0; h < array.length; h++) {
    arrayRandomLength.push(array[h]);
  }
  arrayRandomLength.length = getRandomNumber(0, array.length);
  return arrayRandomLength;
};

var createAdvertisement = function (index) {
  var advertisement = {
    author: {
      avatar: 'img/avatars/user0' + index + '.png'
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: '600, 350',
      price: getRandomNumber(1000, 10000),
      type: getRandomArrayElement(types),
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 2),
      checkin: getRandomArrayElement(checkinTimes),
      checkout: getRandomArrayElement(checkoutTimes),
      features: getArrayRandomLength(features),
      description: 'description',
      photos: getArrayRandomLength(photos)
    },
    location: {
      x: getRandomNumber(0, mapWidth),
      y: getRandomNumber(130, 630)
    }
  };
  return advertisement;
};

var advertisementCard = document.querySelector('.map__pins'); //блок в который копируем объявления
var advertisementTemplate = document.querySelector('#card').content.querySelector('.map__card'); //шаблон, содержимое которого мы будем копировать

var fragment = document.createDocumentFragment();

var renderCard = function (advertisement) {
  var advertisementElement = advertisementTemplate.cloneNode(true); //клонируем содержимое шаблона

  var avatarOfAd = advertisementElement.querySelector('.popup__avatar');
  var titleOfAd = advertisementElement.querySelector('.popup__title');
  var addressOfAd = advertisementElement.querySelector('.popup__text--address');

  var priceOfAd = advertisementElement.querySelector('.popup__text--price');
  var typeOfAd = advertisementElement.querySelector('.popup__type');
  var capacityOfAd = advertisementElement.querySelector('.popup__text--capacity');

  var timeOfAd = advertisementElement.querySelector('.popup__text--time');
  var featuresOfAd = advertisementElement.querySelector('.popup__features');

  var descriptionOfAd = advertisementElement.querySelector('.popup__description');
  var photosOfAd = advertisementElement.querySelector('.popup__photos');
  var photoOfAd = advertisementElement.querySelector('.popup__photo');

  avatarOfAd.src = advertisement.author.avatar;
  titleOfAd.textContent = advertisement.offer.title;
  addressOfAd.textContent = advertisement.offer.address;
  priceOfAd.textContent = advertisement.offer.price + '₽/ночь';
  typeOfAd.textContent = advertisement.offer.type;
  capacityOfAd.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  timeOfAd.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  for (var f = 0; f < advertisement.offer.features.length; f++) {
    var feature = advertisement.offer.features[f];
    var featureOfAd = document.createElement('li');

    featureOfAd.classList.add('popup__feature');
    var classModifier = 'popup__feature--' + feature;

    featureOfAd.classList.add(classModifier);
    fragment.appendChild(featureOfAd);
  }

  featuresOfAd.appendChild(fragment);

  descriptionOfAd.textContent = advertisement.offer.description;

  if (advertisement.offer.photos.length < 1) {
    photosOfAd.textContent = 'Фотографий нет';
    photoOfAd.remove();
  }
  photoOfAd.src = advertisement.offer.photos[0];

  for (var p = 1; p < advertisement.offer.photos.length; p++) {
    var photoSource = advertisement.offer.photos[p];

    var imageElement = photoOfAd.cloneNode(true);

    imageElement.src = photoSource;
    photosOfAd.appendChild(imageElement);
  }
  return advertisementElement;
};

var markerTemplate = document.querySelector('#pin').content;

var renderMarker = function (advertisement) {
  var markerElement = markerTemplate.cloneNode(true);

  var avatarOfMarker = markerElement.querySelector('img');
  var coorOfMarker = markerElement.querySelector('.map__pin');

  avatarOfMarker.src = advertisement.author.avatar;
  avatarOfMarker.alt = advertisement.offer.title;
  coorOfMarker.style.left = advertisement.location.x + 'px';
  coorOfMarker.style.top = advertisement.location.y + 'px';

  return markerElement;

};

for (var i = 0; i < 8; i++) {
  var correctIndex = i + 1;
  advertisements[i] = createAdvertisement(correctIndex);
  fragment.appendChild(renderMarker(advertisements[i]));
}

var getAllPins = function () {
  if (!(map.classList.contains('map--faded'))) {
    var mapPins = document.querySelectorAll('.map__pin');
    return mapPins;
  }
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActiveState();
    advertisementCard.appendChild(fragment);
    var mapPins = document.querySelectorAll('.map__pin');
    for (var pinIndex = 1; pinIndex < mapPins.length; pinIndex++) {
      var pin = mapPins[pinIndex];
      pin.addEventListener('click', function () {
        fragment.appendChild(renderCard(advertisements[1]));
        advertisementCard.appendChild(fragment);
      });
    }
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveState();
    advertisementCard.appendChild(fragment);
  }
});

