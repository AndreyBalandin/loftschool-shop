// Модуль работы со слайдером
'use strict';

var slider = (function (){

  var init = function() {
      // console.log('Инициализация модуля slider.js');
      _setUpListners();
  };

   // установка обработчиков событий
  var _setUpListners = function () {
      $('.slider__pic').on('click', _changePic);
      $('.slider__controls').on('click', _slidePic);
  };

  // сменить картинку
  var _changePic = function(event) {
    event.preventDefault();

    var pic = $(this),
        item = pic.closest('.slider__item'),
        container = pic.closest('.slider'),
        display = container.find('.slider__display'),
        path = item.find('img').attr('src'),
        duration = 150;

    if (!item.hasClass('slider__display-slide')) {
        item.addClass('slider__display-slide').siblings().removeClass('slider__display-slide');
        display.find('img').fadeOut(duration, function() {
            $(this).attr('src', path).fadeIn(duration);
        });
    };
  };


  // пролистнуть картинку
  var _slidePic = function(event) {
      event.preventDefault();

      var controlBtn = $(this),
          container = controlBtn.closest('.slider'),
          list = container.find('.slider__list'),
          items = list.find('.slider__item'),
          activeSlides = items.filter('.slider__active-slide'),
          nextSlide = activeSlides.last().next(),
          prevSlide = activeSlides.first().prev();

      if (controlBtn.hasClass('slider__controls-next') && nextSlide.length) {
          activeSlides.first().removeClass('slider__active-slide');
          nextSlide.addClass('slider__active-slide');
      } else if (controlBtn.hasClass('slider__controls-prev') && prevSlide.length) {
          activeSlides.last().removeClass('slider__active-slide');
          prevSlide.addClass('slider__active-slide');
      } else {
        return;  // ничего не поменялось
      };

      // проверить, какое состояние кнопок должно быть после изменения слайдера
      activeSlides = items.filter('.slider__active-slide');
      if (activeSlides.last().next().length) {
          // есть куда листать вперед
          container.find('.slider__controls-next').removeClass('disabled').attr('disabled', false);
      } else {
          container.find('.slider__controls-next').addClass('disabled').attr('disabled', true);
      };
      if (activeSlides.first().prev().length) {
          // есть куда листать назад
          container.find('.slider__controls-prev').removeClass('disabled').attr('disabled', false);
      } else {
          container.find('.slider__controls-prev').addClass('disabled').attr('disabled', true);
      };
  };


  return {
    init: init
  };

})();

// проверить, что есть элементы со слайдером
if ($('.slider').length) {
  slider.init();
};
