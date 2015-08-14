// функции кнопки для скроллинга вверх

;$(function(){

  $(window).scroll(function(){
    if ($(this).scrollTop() != 0) {
      $('#scrollup').fadeIn();
    } else {
      $('#scrollup').fadeOut();
    }
  });

  $('#scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

});