// модуль выпадающего меню со списком товаров в корзине
'use strict';

var basket = (function (){

  // переменные модуля для ускорения работы с DOM
  var basket = $('#basket'),   // элемент с корзиной
      listItem = basket.parent(), // пункт меню, относительно которого будем располагать список товаров
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
  };


  // установка обработчиков событий
  var _setUpListners = function () {

      // по клику показать список товаров корзине
      basket.on('click', function(event) {
          event.preventDefault();
          listItem.toggleClass('active');
          wrap.toggle();
          _setWrapOffset();
          event.stopPropagation();
      });

      // клик по документу за пределами корзины закрывает список
      $(document).on('click', function(event) {
          if (wrap.is(':visible') && !$(event.target).closest(wrap).length) {
              listItem.removeClass('active');
              wrap.hide();
          };
      });

      // если изменились размеры окна, то пересчитать положение элемента со списком товаров
      $(window).on('resize', function(){
          _setWrapOffset();
      });
  };


  // вычислить и установить положение элемента со списком товаров
  var _setWrapOffset = function () {
      if (wrap.is(':visible')) {
        var wrap_offset = listItem.offset();
        wrap_offset.top += listItem.outerHeight();
        wrap_offset.left -= wrap.outerWidth() - listItem.outerWidth();
        wrap.offset(wrap_offset);
      };
  };


  return {
    init: init
  };

})();

basket.init();
