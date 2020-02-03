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

var advertisements = [];
var avatar = 'img/avatars/user' + getRandomNumber(1, 8) + '.png';
var titles = ['Title1', 'Title2', 'Title3', 'Title4'];

var types = ['palace', 'flat', 'house', 'bungalo'];
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
console.log(getArrayOfRandomLength(arrayOfFeatures));
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
      rooms: 4,//число, количество комнат
      guests: 4,//число, количество гостей, которое можно разместить
      checkin: getRandomArrayElement(checkinTimes),
      checkout: getRandomArrayElement(checkoutTimes),
      features: getArrayOfRandomLength(arrayOfFeatures),
      description: 'description',//строка с описанием,
      photos: getArrayOfRandomLength(arrayOfPhotos)//массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
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

var gsss = document.querySelector('.map__pins');
var advertisementCard = document.querySelector('#card').content.querySelector('.map__card');

var fragment = document.createDocumentFragment();

var renderCard = function (advertisement) {
  var advertismentElement = advertisementCard.cloneNode(true);
  
  var avatarOfAd = advertismentElement.querySelector('.popup__avatar');
  var titleOfAd = advertismentElement.querySelector('.popup__title');
  var addressOfAd = advertismentElement.querySelector('.popup__text--address');
  
  avatarOfAd.src.replace(advertisement.author.avatar);
  titleOfAd.textContent = advertisement.offer.title;
  addressOfAd.textContent = advertisement.offer.address;
  return advertismentElement;
};

for (i = 0; i < 2; i++) {
  fragment.appendChild(renderCard(advertisements[i]));
}

gsss.appendChild(fragment);