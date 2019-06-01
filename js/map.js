"use strict";

(function () {
    // Отрисовка меток
    //var adverts = window.pin.create(window.data.NUMBER_OF_ADVERTS);
    var adverts = window.adverts.request();
    console.log(adverts);

    var pinElements = document.querySelector('.map__pins');

    var mainPin = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var advertFormAddress = document.querySelector('#address');
    var mainPinSize = {
        WIDTH: 65,
        HEIGHT: 65
    };


    function enableFields() {
        //advertFormAddress.value = (mainPin.getBoundingClientRect().left + pageXOffset + mainPinSize.WIDTH / 2) + ', ' + (mainPin.getBoundingClientRect().top + pageYOffset + mainPinSize.HEIGHT / 2);
        //advertFormAddress.value = (parseFloat(mainPin.style.left, 10) + mainPinSize.WIDTH / 2) + ', ' + (parseFloat(mainPin.style.top, 10) + mainPinSize.HEIGHT / 2);
        advertFormAddress.value = map.offsetWidth / 2 + ', ' + (map.offsetHeight / 2 + mainPinSize.HEIGHT / 2 + 15);

        window.form.activate();

    }


    mainPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
        var flag = false;
        var dragged = false;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        // functions
        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            dragged = true;

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            //console.log(map.offsetHeight - mapFiltersContainer.offsetHeight);
            //console.log(mainPinSize.WIDTH / 2);


            // position X
            if (parseFloat(mainPin.style.left, 10) < mainPinSize.WIDTH / 2) {
                mainPin.style.left = mainPinSize.WIDTH / 2 + 'px';
            } else if (parseFloat(mainPin.style.left, 10) > map.offsetWidth - mainPinSize.WIDTH / 2) {
                mainPin.style.left = map.offsetWidth - mainPinSize.WIDTH / 2 + 'px';
            } else {
                mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
            }

            // position Y
            if (parseFloat(mainPin.style.top, 10) < mainPinSize.HEIGHT / 2 + 98.5) {
                mainPin.style.top = mainPinSize.HEIGHT / 2 + 98.5 + 'px';
            } else if (parseFloat(mainPin.style.top, 10) > map.offsetHeight - mapFiltersContainer.offsetHeight - mainPinSize.HEIGHT / 2 - 15) {
                mainPin.style.top = map.offsetHeight - mapFiltersContainer.offsetHeight - mainPinSize.HEIGHT / 2 - 15 + 'px';
            } else {
                mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
            }

            advertFormAddress.value = (parseFloat(mainPin.style.left, 10)) + ', ' + (parseFloat(mainPin.style.top, 10));

        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            if (dragged) {
                var onClickPreventDefault = function (evt) {
                    evt.preventDefault();
                    mainPin.removeEventListener('click', onClickPreventDefault);
                };
                mainPin.addEventListener('click', onClickPreventDefault);
            }

            if (map.classList.contains('map--faded')) {
                buttonMouseupHandler();
            }

        }

        function buttonMouseupHandler(e) {

            map.classList.remove('map--faded');

            enableFields();

            pinElements.appendChild(window.pin.getFragment(adverts)); // отрисовать метки
            //pinElements.appendChild(window.pin.getFragment(window.backend.load));

            var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

            pins.forEach(function (pin, pinCount) {
                pin.addEventListener('click', function () {
                    console.log(adverts[pinCount]);

                    var openedCard = map.querySelector('.map__card');
                    if (openedCard) {
                        map.removeChild(openedCard);
                    }

                    mapFiltersContainer.insertAdjacentElement('beforebegin', window.card.render(adverts[pinCount])); // отрисовать рекламные карточки

                });
            });
        }

    });

})();








