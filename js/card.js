'use strict';

(function () {
  var advertisementTemplate = document
    .querySelector('#card')
    .content.querySelector('.map__card'); // шаблон, содержимое которого мы будем копировать

  var createCard = function (advertisement) { // Функция создания карточки объявления
    var fragment = document.createDocumentFragment();
    var advertisementElement = advertisementTemplate.cloneNode(true); // клонируем содержимое шаблона

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

    advertisement.offer.features.forEach(function (newFeature) {
      var feature = document.createElement('li');

      feature.classList.add('popup__feature');
      var classModifier = 'popup__feature--' + newFeature;

      feature.classList.add(classModifier);
      fragment.appendChild(feature);
    });

    features.appendChild(fragment);

    description.textContent = advertisement.offer.description;

    if (advertisement.offer.photos.length < 1) {
      photos.textContent = 'Фотографий нет';
      photo.remove();
    }

    photo.src = advertisement.offer.photos[0];

    for (var i = 1; i < advertisement.offer.photos.length; i++) {
      var photoSource = advertisement.offer.photos[i];

      var imageElement = photo.cloneNode(true);

      imageElement.src = photoSource;
      photos.appendChild(imageElement);
    }
    return advertisementElement;
  };

  window.card = {
    create: createCard
  };

})();
