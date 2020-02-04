'use strict';

document.querySelector('.map').classList.remove('map--faded');

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return (randomNumber);
  //return ('0' + randomNumber);
};

var getRandomArrayElement = function (nameOfArray) {
  var randomElement = Math.floor(Math.random() * nameOfArray.length);
  return nameOfArray[randomElement];
};

var advertisements = []; // массив с объявлениями
var avatar = 'img/avatars/user0' + getRandomNumber(1, 8) + '.png';
var titles = ['Title1', 'Title2', 'Title3', 'Title4'];

var types = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];

var arrayOfFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var arrayOfPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getArrayOfRandomLength = function (nameOfArray) {
  nameOfArray.length = getRandomNumber(0, nameOfArray.length);
  return nameOfArray;
};

var createArray = function () {
  var advertisement = {
    author: {
      avatar: avatar
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: 'address',//строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      price: 300,//число, стоимость
      type: getRandomArrayElement(types),
      rooms: getRandomNumber(1, 3),//число, количество комнат
      guests: getRandomNumber(1, 2),//число, количество гостей, которое можно разместить
      checkin: getRandomArrayElement(checkinTimes),
      checkout: getRandomArrayElement(checkoutTimes),
      features: getArrayOfRandomLength(arrayOfFeatures),
      description: 'description',//строка с описанием
      photos: getRandomArrayElement(arrayOfPhotos)//массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    location: {
      x: 600,//случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: getRandomNumber(130, 630)//случайное число, координата y метки на карте от 130 до 630.
    }
  };
  return advertisement;
};

for (var i = 0; i < 8; i++) {
  advertisements[i] = createArray();
}

var gsss = document.querySelector('.map__pins'); //блок в который копируем объявления
var advertisementCard = document.querySelector('#card').content.querySelector('.map__card'); //шаблон, содержимое которого мы будем копировать

var fragment = document.createDocumentFragment();

var renderCard = function (advertisement) {
  var advertismentElement = advertisementCard.cloneNode(true); //клонируем содержимое шаблона

  var avatarOfAd = advertismentElement.querySelector('.popup__avatar');
  var titleOfAd = advertismentElement.querySelector('.popup__title');
  var addressOfAd = advertismentElement.querySelector('.popup__text--address');
  
  var priceOfAd = advertismentElement.querySelector('.popup__text--price');
  var typeOfAd = advertismentElement.querySelector('.popup__type');
  var capacityOfAd = advertismentElement.querySelector('.popup__text--capacity');
  var timeOfAd = advertismentElement.querySelector('.popup__text--time');
  //features
  var descriptionOfAd = advertismentElement.querySelector('.popup__description');
  //var photosOfAd = advertismentElement.querySelector('.popup__photos');
  
  avatarOfAd.src = advertisement.author.avatar;
  titleOfAd.textContent = advertisement.offer.title;
  addressOfAd.textContent = advertisement.offer.address;
  priceOfAd.innerText = advertisement.offer.price;
  typeOfAd.textContent = advertisement.offer.type;
  capacityOfAd.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  timeOfAd.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  //features
  descriptionOfAd.textContent = advertisement.offer.description;
  //photosOfAd.src = advertisement.offer.photos;
  
  return advertismentElement;
};

for (var j = 0; j < advertisements.length; j++) {
  fragment.appendChild(renderCard(advertisements[j]));
}

gsss.appendChild(fragment);

