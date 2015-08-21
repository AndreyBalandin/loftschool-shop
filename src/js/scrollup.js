// модуль кнопки '#scrollup' для скроллинга вверх
'use strict';

var scrollup = (function (){

  var scrollup = {},   // элемент с кнопкой 'Наверх'
      bottomGap = 10,  // отступ снизу для кнопки
      maxPos = $(document).height() - $('.footer').outerHeight();

  var init = function() {
      // console.log('Инициализация модуля scrollup.js');
      _createScrollup();
      _setUpListners();
  };


  // создание нового элемента с кнопкой 'Наверх'
  var _createScrollup = function() {

      // добавить новый элемент в документ
      scrollup = $('<a id="scrollup" href="#"></a>').appendTo('body');
      scrollup.css({ display: 'none',
                     position: 'fixed',
                     bottom: '240px',
                     right: '10px',
                     width: '77px',
                     height: '39px',
                     opacity: 0.5,
                     background: 'url("img/scrollup.png") no-repeat'
      });
  };


  // установка обработчиков событий
  var _setUpListners = function () {

    // если находимся не вверху, то показать кнопку, не залезая на футер
    $(window).on('scroll', function(){
      var curPos = $(window).scrollTop() + $(window).height();
      if (curPos > maxPos) {
          scrollup.css('bottom', curPos - maxPos + bottomGap);
      } else {
          scrollup.css('bottom', bottomGap);
      };
      if ($(this).scrollTop() != 0) {
        scrollup.stop(true, true).fadeIn();
      } else {
        scrollup.stop(true, true).fadeOut();
      }
    });

    // по клику на кнопку прокрутиться вверх
    scrollup.on('click', function(event) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 500);
    });
  };

  return {
    init: init
  };

})();

scrollup.init();
