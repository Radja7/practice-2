'use strict';

(function(){

    window.backend = {
        load: load,
        send: send
    };

    var URL = 'https://js.dump.academy/keksobooking';
    var STATUS_OK = 200;
    var TIME_OUT = 10000;

    function load (onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if(xhr.status === STATUS_OK){
                onLoad(xhr.response);
            } else {
                onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function () {
           onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });

        xhr.timeout = TIME_OUT;
        xhr.open('GET', URL + '/data');
        xhr.send();
    }

    function send (data, onLoad, onError){
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            if(xhr.status === STATUS_OK){
                onLoad(xhr.response);
            } else {
                onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
            }
        });

        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });

        xhr.timeout = TIME_OUT;
        xhr.open('POST', URL);
    }

})();