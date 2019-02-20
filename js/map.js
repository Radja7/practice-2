"use strict";

var NUMBER_OF_ADVERTS = 8;

var AUTOR_AVATAR = "img/avatars/user";
var OFFER_TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дв орец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый него степриимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по коле но в воде"];
var OFFER_PRICE = [1000, 1000000]; // min and max
var OFFER_TYPE = ["palace", "flat", "house", "bungalo"];
var OFFER_ROOMS = [1, 5]; // min and max
var OFFER_GUESTS = [1, 20]; // min and max
var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
var OFFER_CHECKOUT = ["12:00", "13:00", "14:00"];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_DESCRIPTION = "";
var OFFER_PHOTOS = ["img/hotel1.jpg", "img/hotel2.jpg", "img/hotel3.jpg"];
var MAP_PIN_TAIL_HEIGHT = 18;
var LOCATION_MIN_X = 100;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;

//document.querySelector('.map').classList.remove('map--faded');
var locationMaxX = document.querySelector('.map').offsetWidth - 100;
var mapPinWidth = document.querySelector('.map__pin').children[0].getAttribute('width');
var mapPinHeight = document.querySelector('.map__pin').children[0].getAttribute('height');



// Генерирует случайную длинну и случайные порядок вывода элементов масива
function getRandomCountItemOfArray(array, stat){ // 2 свойство выводит фиксированное количество выводимых значений в массиве
    var finishArray = [];

    if(stat) {
        var count = array.length;
    } else {
        var count = getRandomNumber(1, array.length);
    }

    var i = 0;
    while(i !== count) {
        var val = getRandomItemOfArray(array);
        var flag = true;

        for (var k = 0; k < finishArray.length; k++){
            if(val === finishArray[k]){
                flag = false;
            }
        }

        if(flag){
            finishArray.push(val);
            i++
        }
    }

    return finishArray;
}

// Генерируем случайное число
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
};

// Возвращает случайное значение из массива
function getRandomItemOfArray(array) {
    return array[getRandomNumber(0, array.length)];
};

// Генерируем аватар пользователя
function getAvatarUser(indexAvatarImage) {
    var index = indexAvatarImage + 1;
    return AUTOR_AVATAR + '0' + index + '.png'
}

// функция генерирует объекты с описанием объявлений
function advertsMock(advertsCount) {
    var adverts = [];

    for(var i = 0; i < advertsCount; i++) {
        var x = getRandomNumber(LOCATION_MIN_X, locationMaxX);
        var y = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

        var oneAdvert = {
            author: {
                avatar: getAvatarUser(i)
            },

            offer: {
                title: OFFER_TITLE[i],
                address: x + ', ' + y,
                price: getRandomNumber(OFFER_PRICE[0], OFFER_PRICE[1]),
                type: getRandomItemOfArray(OFFER_TYPE),
                rooms: getRandomNumber(OFFER_ROOMS[0], OFFER_ROOMS[1]),
                guests: getRandomNumber(OFFER_GUESTS[0], OFFER_GUESTS[1]),
                checkin: getRandomItemOfArray(OFFER_CHECKIN),
                checkout: getRandomItemOfArray(OFFER_CHECKOUT),
                features: getRandomCountItemOfArray(OFFER_FEATURES),
                description: OFFER_DESCRIPTION,
                photos: getRandomCountItemOfArray(OFFER_PHOTOS, true) // неправильная функция поменять
            },

            location: {
                x: x,
                y: y
            }
        }

        adverts.push(oneAdvert);
    }

    return adverts;
}

// Отрисовка меток
var adverts = advertsMock(NUMBER_OF_ADVERTS);
var pinTemplate = document.querySelector('#map-template').content.querySelector('.map__pin');
var similarListElement = document.querySelector('.map__pins'); // удалить позже !!!!!!!!!!!!!!!!!!!!!
var pinElements = document.querySelector('.map__pins');

var renderMapPin = function(charactersPin) {
    var mapPinElement = pinTemplate.cloneNode(true);
    var mapPinImages = mapPinElement.querySelector('img');

    mapPinElement.style.left = charactersPin.location.x - (+mapPinWidth / 2) + 'px'; // отцентрируем метку по X координате
    mapPinElement.style.top =  charactersPin.location.y + (+mapPinHeight + MAP_PIN_TAIL_HEIGHT) + 'px'; // поднимаем метку чтобы острый край касался Y координаты
    mapPinImages.setAttribute('src', charactersPin.author.avatar);
    mapPinImages.setAttribute('alt', 'charactersPin.offer.title');

    return mapPinElement;
};

var getMapPinFragment = function(adverts){
    var fragment = document.createDocumentFragment();

    for(var i = 0; i < adverts.length; i++) {
        fragment.appendChild(renderMapPin(adverts[i]));
    }

    pinElements.appendChild(fragment);
};


// Отрисуем объявления
var mapCardTemplate = document.querySelector('#map-template').content.querySelector('.map__card');

var getFeatures = function(featuresArr) {
    var featusesFragment = document.createDocumentFragment();
    for(var i = 0; i < featuresArr.length; i++) {
        var featuresOneElement = document.createElement('li');
        featuresOneElement.className = 'feature feature--' + featuresArr[i];
        featusesFragment.appendChild(featuresOneElement);
    }
    return featusesFragment;
};

function getPhotos(photosArr) {
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
};

var renderCardOffers = function(charactersCard) {
    var mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = charactersCard.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = charactersCard.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = charactersCard.offer.price + ' ₽/ночь.';
    mapCardElement.querySelector('.popup__type').textContent = charactersCard.offer.type;
    mapCardElement.querySelector('.popup__text--capacity').textContent = charactersCard.offer.rooms + ' комнаты для ' + charactersCard.offer.guests + ' гостей.';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + charactersCard.offer.checkin + ', выезд до ' + charactersCard.offer.checkout;
    mapCardElement.querySelector('.popup__features').textContent = '';
    mapCardElement.querySelector('.popup__features').appendChild(getFeatures(charactersCard.offer.features)); ///////// go
    mapCardElement.querySelector('.popup__description').textContent = charactersCard.offer.description;
    mapCardElement.querySelector('.popup__photos').textContent = '';
    mapCardElement.querySelector('.popup__photos').appendChild(getPhotos(charactersCard.offer.photos));

    return mapCardElement;
};

var getCardFragment = function(indexPinsData) {

    var card = renderCardOffers(adverts[indexPinsData]);
    var openedCard = map.querySelector('.map__card');
    if(openedCard) {
        map.removeChild(openedCard);
    }

    document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', card);

    // var cardFragment = document.createDocumentFragment();
    //
    // for (var i = 0; i < adverts.length; i++) {
    //     cardFragment.appendChild(renderCardOffers(adverts[i]));
    //
    //     document.querySelector('.map').insertBefore(cardFragment, document.querySelector('.map__filter-container'));
    // }
};

// Активация активного режима
var mainPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var advertForm = document.querySelector('.notice__form');
var fieldsetsAdvertForm = advertForm.querySelectorAll('fieldset');

function enableFields() {
    var advertFormAddress = document.querySelector('#address');
    var mainPinSize = {
        WIDTH: 65,
        HEIGHT: 65
    };

    advertFormAddress.value = (mainPin.getBoundingClientRect().left + pageXOffset + mainPinSize.WIDTH / 2) + ', ' + (mainPin.getBoundingClientRect().top + pageYOffset + mainPinSize.HEIGHT / 2);
    advertForm.classList.remove('notice__form--disabled');

    fieldsetsAdvertForm.forEach(function (fieldset) {
        fieldset.disabled = false;
    });
}

function buttonMouseupHandler(e) {
    map.classList.remove('map--faded');

    enableFields();
    getMapPinFragment(adverts); // отрисовать метки

    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin, pinCount) {
        pin.addEventListener('click', function () {
            console.log(pinCount);
            getCardFragment(pinCount); // отрисовать рекламные карточки
        });
    });
}

mainPin.addEventListener('mouseup', buttonMouseupHandler);
//////////////////////////////////////////////////





