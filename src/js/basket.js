// функции выпадающего меню со списком товаров в корзине
'use strict';

;$(function(){

  var basket = $('#basket'),     // элемент с корзиной
      wrap = $("#basket__wrap"), // обертка для списка товаров
      wrap_offset = basket.offset();

  // вычислить и установить положение элемента со списком товаров
  wrap_offset.top += basket.outerHeight();
  wrap_offset.left -= wrap.outerWidth() - basket.outerWidth();
  wrap.offset(wrap_offset);

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
      //event.stopPropagation();
    };
  });

});