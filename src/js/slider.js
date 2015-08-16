// Модуль работы со слайдером
'use strict';

var slider = (function (){

  var init = function() {
      // console.log('Инициализация модуля slider.js');
      _setUpListners();
  };

   // установка обработчиков событий
  var _setUpListners = function () {
      $('.product-slider__pic').on('click', _changePic);
  };

  // сменить картинку
  var _changePic = function (event) {
    event.preventDefault();

    var pic = $(this),
        item = pic.closest('.product-slider__item'),
        container = pic.closest('.product-slider'),
        display = container.find('.product-slider__display'),
        path = item.find('img').attr('src'),
        duration = 150;

    if (!item.hasClass('active')) {
        item.addClass('active').siblings().removeClass('active');
        display.find('img').fadeOut(duration, function() {
            $(this).attr('src', path).fadeIn(duration);
        });
    };

  };

  return {
    init: init
  };

})();

slider.init();
