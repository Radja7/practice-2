"use strict";

var NUMBER_OF_OFFERS = 8;

var AUTOR_AVATAR = "img/avatars/user";
var OFFER_TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дв орец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый него степриимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по коле но в воде"];
var OFFER_ADDRESS = [0, 1000];
var OFFER_PRICE = [1000, 1000000];
var OFFER_TYPE = ["palace", "flat", "house", "bungalo"];
var OFFER_ROOMS = [1, 5];
var OFFER_GUESTS = [1, 20];
var OFFER_CHECKIN = ["12:00", "13:00", "14:00"];
var OFFER_CHECKOUT = ["12:00", "13:00", "14:00"];
var OFFER_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var OFFER_DESCRIPTION = "";
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github .io/assets/images/tokyo/hotel3.jpg"];
var OFFER_LOCATION = [130, 630];
var MAP_PIN_TAIL_HEIGHT = 18;

document.querySelector('.map').classList.remove('map--faded');
var mapContainerWidth = document.querySelector('.map').offsetWidth;
var mapPinWidth = document.querySelector('.map__pin').children[0].getAttribute('width');
var mapPinHeight = document.querySelector('.map__pin').children[0].getAttribute('height');

// Перетосовать элементы массива
function shuffle(arr){
    var j, temp;
    for(var i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// Возвращает случайные числа из промежутка числового массива
var getRandomNamberOfArray = function (array) {
    var locationArray = [];
    var min = +array[0];
    var max = +array[1];
    var locationX = getRandomInteger(min, max);
    var locationY = getRandomInteger(min, max);
    return locationX + ' ' + locationY;
};

// Возвращает случайное значение из массива
var getRandomItemOfArray = function (array) {
    return array[getRandomInteger(0, array.length)];
};

// Случайный номер элемента массива
var getRandomInteger = function (min, max){
    return Math.floor(Math.random() * (max - min - 1)) + min;
};

// функция генерирует объекты с описанием объявлений
function offersMock(numberOfOffers) {
    var offers = [];

    for(var i = 0; i < numberOfOffers; i++) {
        var obj = {};
        var author = obj.author = {};
        var offer = obj.offer = {};
        var location = obj.location = {};

        author.avatar = AUTOR_AVATAR + '0' + (i+1) + '.png';

        offer.title = OFFER_TITLE[i];
        offer.address = getRandomNamberOfArray(OFFER_ADDRESS);
        offer.price = getRandomInteger(OFFER_PRICE[0], OFFER_PRICE[1]);
        offer.type = getRandomItemOfArray(OFFER_TYPE);
        offer.rooms = getRandomInteger(OFFER_ROOMS[0], OFFER_ROOMS[1]);
        offer.guests = getRandomInteger(OFFER_GUESTS[0], OFFER_GUESTS[1]);
        offer.checkin = getRandomItemOfArray(OFFER_CHECKIN);
        offer.checkout = getRandomItemOfArray(OFFER_CHECKOUT);
        //offer.features = ;
        offer.description = "";
        offer.photos = shuffle(OFFER_PHOTOS); // неправильная функция поменять

        location.x = getRandomInteger(0, mapContainerWidth); // временное
        location.y = getRandomInteger(130, 630); // временное

        offers.push(obj);
    }

    return offers;
    //console.log(offers);
}

var similarListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#map-template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('#map-template').content.querySelector('.map__card');


var renderMapPin = function(offer) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    var mapPinImages = mapPinElement.children[0];

    mapPinElement.style.left = offer.location.x - (+mapPinWidth / 2) + 'px';
    mapPinElement.style.top =  offer.location.y + (+mapPinHeight + MAP_PIN_TAIL_HEIGHT) + 'px';
    mapPinImages.setAttribute('alt', 'заголовок объявления');
    mapPinImages.setAttribute('src', offer.author.avatar);

    return mapPinElement;
};

var renderCardOffers = function(offer) {
    var mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__title').textContent = offer.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь.';
    mapCardElement.querySelector('.popup__type').textContent = offer.offer.type;
    mapCardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей.';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    //mapCardElement.querySelector('.popup__features')
    mapCardElement.querySelector('.popup__description').textContent = offer.offer.description;

    var photosContainer = mapCardElement.querySelector('.popup__photos');
    var photoItem = mapCardElement.querySelector('.popup__photo').cloneNode(true);
    for(var i = 0; i < offer.offer.photos.length; i++){
        var photo = photoItem.setAttribute('src', offer.offer.photos[i]);
        //photosContainer.appendChild(photo); // ? как переделать?
    }

    return mapCardElement;

};

var createSimilarList = function (offers, flag) {
    var fragment = document.createDocumentFragment();

    if (flag === 'pin') {

        for(var i = 0; i < offers.length; i++) {
            fragment.appendChild(renderMapPin(offers[i]));
        }

    } else {

        for(var i = 0; i < offers.length; i++) {
            fragment.appendChild(renderCardOffers(offers[i]));
        }

    }


    return fragment;
};

var offers = offersMock(NUMBER_OF_OFFERS);
//console.log(maps[2].location.x);
similarListElement.appendChild(createSimilarList(offers, 'pin'));
similarListElement.appendChild(createSimilarList(offers, 'card'));



