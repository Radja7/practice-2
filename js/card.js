'use strict';

(function () {
    window.card = {

        getFeatures: function(featuresArr) {
            var featusesFragment = document.createDocumentFragment();
            for(var i = 0; i < featuresArr.length; i++) {
                var featuresOneElement = document.createElement('li');
                featuresOneElement.className = 'feature feature--' + featuresArr[i];
                featusesFragment.appendChild(featuresOneElement);
            }
            return featusesFragment;
        },

        getPhotos: function (photosArr) {
            var photosFragment = document.createDocumentFragment();
            for(var i = 0; i < photosArr.length; i++) {
                var photosTemplate = document.querySelector('#map-template').content.querySelector('.popup__photos');
                var photosOneElement = photosTemplate.cloneNode(true);
                photosOneElement.querySelector('img').src = photosArr[i];
                photosOneElement.querySelector('img').width = 60;
                photosOneElement.querySelector('img').height = 60;
                photosFragment.appendChild(photosOneElement);
            }
            return photosFragment;
        },

        render: function(charactersCard) {
            var mapCardTemplate = document.querySelector('#map-template').content.querySelector('.map__card');
            var mapCardElement = mapCardTemplate.cloneNode(true);

            mapCardElement.querySelector('.popup__avatar').setAttribute('src', charactersCard.author.avatar);
            mapCardElement.querySelector('.popup__title').textContent = charactersCard.offer.title;
            mapCardElement.querySelector('.popup__text--address').textContent = charactersCard.offer.address;
            mapCardElement.querySelector('.popup__text--price').textContent = charactersCard.offer.price + ' ₽/ночь.';
            mapCardElement.querySelector('.popup__type').textContent = charactersCard.offer.type;
            mapCardElement.querySelector('.popup__text--capacity').textContent = charactersCard.offer.rooms + ' комнаты для ' + charactersCard.offer.guests + ' гостей.';
            mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + charactersCard.offer.checkin + ', выезд до ' + charactersCard.offer.checkout;
            mapCardElement.querySelector('.popup__features').textContent = '';
            mapCardElement.querySelector('.popup__features').appendChild(window.card.getFeatures(charactersCard.offer.features)); ///////// go
            mapCardElement.querySelector('.popup__description').textContent = charactersCard.offer.description;
            mapCardElement.querySelector('.popup__photos').textContent = '';
            mapCardElement.querySelector('.popup__photos').appendChild(window.card.getPhotos(charactersCard.offer.photos));

            return mapCardElement;
        },

        getFragment: function() {


        },

    }
})();