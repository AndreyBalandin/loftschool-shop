$(document).ready(function(){

  // placeholder для ie8
  if (!Modernizr.input.placeholder) {
    $('input, textarea').placeholder();
  };

});