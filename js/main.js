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

  var avatar = advertisementElement.querySelector('.popup__avatar');
  var title = advertisementElement.querySelector('.popup__title');
  var address = advertisementElement.querySelector('.popup__text--address');

  var price = advertisementElement.querySelector('.popup__text--price');
  var type = advertisementElement.querySelector('.popup__type');
  var capacity = advertisementElement.querySelector('.popup__text--capacity');

  var time = advertisementElement.querySelector('.popup__text--time');
  var features = advertisementElement.querySelector('.popup__features');

  var description = advertisementElement.querySelector('.popup__description');
  var photos = advertisementElement.querySelector('.popup__photos');
  var photo = advertisementElement.querySelector('.popup__photo');

  avatar.src = advertisement.author.avatar;
  title.textContent = advertisement.offer.title;
  address.textContent = advertisement.offer.address;
  price.textContent = advertisement.offer.price + '₽/ночь';
  type.textContent = advertisement.offer.type;
  capacity.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  features.innerHTML = '';

  for (var f = 0; f < advertisement.offer.features.length; f++) {
    var newFeature = advertisement.offer.features[f];
    var feature = document.createElement('li');

    feature.classList.add('popup__feature');
    var classModifier = 'popup__feature--' + newFeature;

    feature.classList.add(classModifier);
    fragment.appendChild(feature);
  }

  features.appendChild(fragment);

  description.textContent = advertisement.offer.description;

  if (advertisement.offer.photos.length < 1) {
    photos.textContent = 'Фотографий нет';
    photo.remove();
  }
  photo.src = advertisement.offer.photos[0];

  for (var p = 1; p < advertisement.offer.photos.length; p++) {
    var photoSource = advertisement.offer.photos[p];

    var imageElement = photo.cloneNode(true);

    imageElement.src = photoSource;
    photos.appendChild(imageElement);
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

var appendPinElements = function () {

  advertisementCard.appendChild(fragment);//рендер маркеров на карту

  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');//запись коллекции маркеров в переменную, кроме главного маркера

  for (var y = 0; y < mapPins.length; y++) {
    var pin = mapPins[y];
  
    (function () {
      var index = y;
    
      var onPinClick = function () {
        var currentCard = advertisementCard.querySelector('.map__card');
        
        if (currentCard) {
          currentCard.remove();
        }
        
        fragment.appendChild(renderCard(advertisements[index]));
        advertisementCard.appendChild(fragment);
        
        var closeButton = document.querySelector('.popup__close');
        
        (function () {
          var currentCard = advertisementCard.querySelector('.map__card');
          
          var onCloseClick = function () {
            currentCard.remove();
          };
          
          closeButton.addEventListener('click', onCloseClick);
        }());
      };
      
      pin.addEventListener('click', onPinClick);     
    }());
  };
};

var onActiveMouse = function (evt) {
  if (evt.button === 0) {
    setActiveState();
    appendPinElements();
  }
};

var onActiveKey = function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveState();
    appendPinElements();
  }
};

mainPin.addEventListener('mousedown', onActiveMouse);
mainPin.addEventListener('keydown', onActiveKey);


var houseTypeInput = document.querySelector('#type');
var housePriceInput = document.querySelector('#price');

houseTypeInput.addEventListener('input', function () {
  var houseType = getSelectedOption(houseTypeInput).value;
  var housePriceMin = housePriceInput.min;
  switch (houseType) {
    case 'bungalo':
    housePriceMin = 0;
    break;

    case 'flat':
    housePriceMin = 1000;
    break;

    case 'house':
    housePriceMin = 5000; 
    break;

    case 'palace':
    housePriceMin = 10000;
    break;  
  }
});