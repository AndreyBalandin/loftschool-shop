// модуль кнопки '#scrollup' для скроллинга вверх
'use strict';

var scrollup = (function (){

  var scrollup;  // элемент с кнопкой 'Наверх'

  var init = function() {
      // console.log('Инициализация модуля scrollup.js');
      _createScrollup();
      _setUpListners();
  };


  // создание нового элемента с кнопкой 'Наверх'
  var _createScrollup = function() {

      // добавить новый элемент в документ
      scrollup = $('<div id="scrollup"></div>').appendTo('body');
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

    // если находимся не вверху, то показать кнопку
    $(window).on('scroll', function(){
      if ($(this).scrollTop() != 0) {
        scrollup.fadeIn();
      } else {
        scrollup.fadeOut();
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
