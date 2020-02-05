'use strict';

document.querySelector('.map').classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return randomNumber;
  //return ('0' + randomNumber);
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
  var arrayRandomLength = array;
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
      x: 600,//случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: getRandomNumber(130, 630)//случайное число, координата y метки на карте от 130 до 630.
    }
  };
  return advertisement;
};

//var createMarker = function () {
//  var marker = {
//    avatar: advertisement.author.avatar,
//    altText: advertisement.offer.title
//  }
//};

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
  
  avatarOfAd.src = advertisement.author.avatar;
  titleOfAd.textContent = advertisement.offer.title;
  addressOfAd.textContent = advertisement.offer.address;
  priceOfAd.innerText = advertisement.offer.price;
  typeOfAd.textContent = advertisement.offer.type;
  capacityOfAd.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  timeOfAd.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  featuresOfAd.textContent = advertisement.offer.features;
  descriptionOfAd.textContent = advertisement.offer.description;
  //photosOfAd.src = advertisement.offer.photos;
  
  return advertisementElement;
};

for (var i = 0; i < 8; i++) {
  var correctIndex = i + 1;
  advertisements[i] = createAdvertisement(correctIndex);
  fragment.appendChild(renderCard(advertisements[i]));
}

advertisementCard.appendChild(fragment);

