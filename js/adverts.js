'use strict';

(function () {
    window.adverts = {
        request: request,
        loadList: []
    };

    function request () {
        window.backend.load(loadHandler, err);
        return window.adverts.loadList;
    }

    function err () {
        console.log('Error');
    }

    function loadHandler (data) {
        for (var i = 0; i < window.data.NUMBER_OF_ADVERTS; i++) {
            var count = data.length - 1;
            var randomNumber = window.utilities.getRandomNumber(0, count);
            window.adverts.loadList.push(data[randomNumber]);
            data.splice(randomNumber, 1);
        }
    }
})();