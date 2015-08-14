// функции кнопки для скроллинга вверх

;$(function(){

  $(window).scroll(function(){
    if ($(this).scrollTop() != 0) {
      $('#scrollup').fadeIn();
    } else {
      $('#scrollup').fadeOut();
    }
  });

  $('#scrollup').on('click', function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
});