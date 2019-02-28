'use srict';

(function () {
    window.pin = {

        // Генерируем аватар пользователя
        getAvatarUser: function (indexAvatarImage) {
            var index = indexAvatarImage + 1;
            return window.data.AUTOR_AVATAR + '0' + index + '.png'
        },

        // функция генерирует объекты с описанием объявлений
        create: function (advertsCount) {
            var adverts = [];
            var locationMaxX = document.querySelector('.map').offsetWidth - 100;

            for(var i = 0; i < advertsCount; i++) {
                var x = window.utilities.getRandomNumber(window.data.LOCATION_MIN_X, locationMaxX);
                var y = window.utilities.getRandomNumber(window.data.LOCATION_MIN_Y, window.data.LOCATION_MAX_Y);

                var oneAdvert = {
                    author: {
                        avatar: window.pin.getAvatarUser(i)
                    },

                    offer: {
                        title: window.data.OFFER_TITLE[i],
                        address: x + ', ' + y,
                        price: window.utilities.getRandomNumber(window.data.OFFER_PRICE[0], window.data.OFFER_PRICE[1]),
                        type: window.utilities.getRandomItemOfArray(window.data.OFFER_TYPE),
                        rooms: window.utilities.getRandomNumber(window.data.OFFER_ROOMS[0], window.data.OFFER_ROOMS[1]),
                        guests: window.utilities.getRandomNumber(window.data.OFFER_GUESTS[0], window.data.OFFER_GUESTS[1]),
                        checkin: window.utilities.getRandomItemOfArray(window.data.OFFER_CHECKIN),
                        checkout: window.utilities.getRandomItemOfArray(window.data.OFFER_CHECKOUT),
                        features: window.utilities.getRandomCountItemOfArray(window.data.OFFER_FEATURES),
                        description: window.data.OFFER_DESCRIPTION,
                        photos: window.utilities.getRandomCountItemOfArray(window.data.OFFER_PHOTOS, true) // неправильная функция поменять
                    },

                    location: {
                        x: x,
                        y: y
                    }
                }

                adverts.push(oneAdvert);
            }

            return adverts;
        },

        render: function (charactersPin) {
            var pinTemplate = document.querySelector('#map-template').content.querySelector('.map__pin');
            var mapPinWidth = document.querySelector('.map__pin').children[0].getAttribute('width');
            var mapPinHeight = document.querySelector('.map__pin').children[0].getAttribute('height');

            var mapPinElement = pinTemplate.cloneNode(true);
            var mapPinImages = mapPinElement.querySelector('img');

            mapPinElement.style.left = charactersPin.location.x - (+mapPinWidth / 2) + 'px'; // отцентрируем метку по X координате
            mapPinElement.style.top =  charactersPin.location.y + (+mapPinHeight + window.data.MAP_PIN_TAIL_HEIGHT) + 'px'; // поднимаем метку чтобы острый край касался Y координаты
            mapPinImages.setAttribute('src', charactersPin.author.avatar);
            mapPinImages.setAttribute('alt', charactersPin.offer.title);

            return mapPinElement;
        },

        getFragment: function (adverts) {
            var fragment = document.createDocumentFragment();

            for(var i = 0; i < adverts.length; i++) {
                fragment.appendChild(window.pin.render(adverts[i]));
            }

            return fragment;
        }

    }
})();