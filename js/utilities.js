'use strict';

(function () {
    window.utilities = {

        // Генерируем случайное число
        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },

        // Возвращает случайное значение из массива
        getRandomItemOfArray: function (array) {
            return array[window.utilities.getRandomNumber(0, array.length)];
        },

        // Генерирует случайную длинну и случайные порядок вывода элементов масива
        getRandomCountItemOfArray: function (array, stat) { // 2 свойство выводит фиксированное количество выводимых значений в массиве
            var finishArray = [];

            if(stat) {
                var count = array.length;
            } else {
                var count = window.utilities.getRandomNumber(1, array.length);
            }

            var i = 0;
            while(i !== count) {
                var val = window.utilities.getRandomItemOfArray(array);
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

    }
})();