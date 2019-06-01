'use srict';

(function () {
    var advertForm = document.querySelector('.notice__form');
    var fieldsetsAdvertForm = advertForm.querySelectorAll('fieldset');

    window.form = {

        activate: function () {
            advertForm.classList.remove('notice__form--disabled');
            fieldsetsAdvertForm.forEach(function (fieldset) {
                fieldset.disabled = false;
            });
        }

    },

    advertForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('SUBMIT');
        window.backend.send(new FormData(form), successHandler, errorHandler);
    });

    function successHandler() {
        console.log('Отправил');
    }

    function errorHandler() {
        console.log('Ошибка');
    }

})();