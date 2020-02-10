'use strict';

document.querySelector('.map').classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
};

var getRandomArrayElement = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};

var advertisements = []; // массив с объявлениями
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
      description: 'description',//строка с описанием
      photos: getArrayRandomLength(photos)//массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    location: {
      x: getRandomNumber(0, 1150),
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
  
  avatarOfAd.src = advertisement.author.avatar;
  titleOfAd.textContent = advertisement.offer.title;
  addressOfAd.textContent = advertisement.offer.address;
  priceOfAd.innerText = advertisement.offer.price;
  typeOfAd.textContent = advertisement.offer.type;
  capacityOfAd.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  timeOfAd.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  featuresOfAd.textContent = advertisement.offer.features;
  descriptionOfAd.textContent = advertisement.offer.description;
  photosOfAd.src = advertisement.offer.photos;
  
  return advertisementElement;
};

var adMarker = document.querySelector('.map__pin');
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
  
}

for (var i = 0; i < 8; i++) {
  var correctIndex = i + 1;
  advertisements[i] = createAdvertisement(correctIndex);
  fragment.appendChild(renderCard(advertisements[i]));
  fragment.appendChild(renderMarker(advertisements[i]));
}

advertisementCard.appendChild(fragment);

