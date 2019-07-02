'use srict';

(function () {
    var advertForm = document.querySelector('.notice__form');
    var fieldsetsAdvertForm = advertForm.querySelectorAll('fieldset');
    var submit = document.querySelector('.form__element--submit');

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
        window.backend.send(new FormData(advertForm), successHandler, errorHandler);
    });

    function successHandler() {
        var node = document.createElement('div');
        node.id = 'successMes';
        node.style = 'position: fixed; z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #fff;border: 5px solid #000; margin: 0 auto; padding: 50px; font-size: 30px; text-align: center; background-color: green;';
        advertForm.reset();
        node.textContent = 'Форма отправлена!';

        document.body.insertAdjacentElement('afterbegin', node);

        setTimeout(function() {
            console.log('ERR');
            successMes.remove();
        }, 2000)
    }

    function errorHandler(errorMessage) {
        var node = document.createElement('div');
        node.id = 'errorMes';
        node.style = 'position: fixed; z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #fff;border: 5px solid #000; margin: 0 auto; padding: 50px; font-size: 30px; text-align: center; background-color: red;';
        advertForm.reset();
        node.textContent = errorMessage;

        document.body.insertAdjacentElement('afterbegin', node);

        setTimeout(function() {
            console.log('ERR');
            errorMes.remove();
        }, 2000)
    }

})();