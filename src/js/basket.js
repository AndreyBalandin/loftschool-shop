// модуль выпадающего меню со списком товаров в корзине
'use strict';

var basket = (function (){

  // переменные модуля для ускорения работы с DOM
  var basket = $('#basket'),   // элемент с корзиной
      wrap;                    // обертка для списка товаров

  var init = function() {
      // console.log('Инициализация модуля basket.js');
      _createWrap();
      _setUpListners();
  };


  // создание нового элемента со списком товаров в корзине
  var _createWrap = function () {

      var
          // получили объект с содержимым корзины из запроса или другим способом
          basketArray = [ {name: 'iPhone 6', src: 'img/basket/basket-iphone6.png', url: '#'},
                          {name: 'iPad Air Wi-Fi + Cellular 128GB - Silver', src: 'img/basket/basket-ipad.png', url: '#'},
                          {name: 'Macbook Air', src: 'img/basket/basket-macbook.png', url: '#'},
                        ];

      // сверстать таблицу со списком товаров в корзине
      var markup = '<table id="basket__wrap"><tbody>',
          modificator = '';
      for (var i = 0, len = basketArray.length; i < len; ++i) {
          // для каждой нечетной строки добавляем серый фон
          modificator = (i % 2) ? 'background-color-gray' : '';
          markup += '<tr>' +
                      '<td class="basket__pic ' + modificator + '"><img src="' + basketArray[i].src + '"></td>' +
                      '<td class="basket__item ' + modificator + '"><a href="' + basketArray[i].url + '" class="basket__link">' + basketArray[i].name +'</a></td>' +
                    '</tr>';
      };
      markup += '</tbody></table>';

      // добавить новый элемент в документ
      wrap = $(markup).appendTo('body');

      // вычислить и установить положение элемента со списком товаров
      var wrap_offset = basket.offset();
      wrap_offset.top += basket.outerHeight();
      wrap_offset.left -= wrap.outerWidth() - basket.outerWidth();
      wrap.offset(wrap_offset);
  };


  // установка обработчиков событий
  var _setUpListners = function () {

      // по клику показать список товаров корзине
      basket.on('click', function(event) {
          event.preventDefault();
          wrap.toggle();
          event.stopPropagation();
      });

      // клик по документу за пределами корзины закрывает список
      $(document).on('click', function(event) {
          if (wrap.is(':visible') && !$(event.target).closest(wrap).length) {
              wrap.hide();
          };
      });
  };

  return {
    init: init
  };

})();

basket.init();
