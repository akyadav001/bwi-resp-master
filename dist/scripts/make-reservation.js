(function() {
'use strict';

$('[data-toggle="popover"]').popover();
$(document).ready(function() {

  $('.taxes-expandables').on('show.bs.collapse hide.bs.collapse', function () {
    $(this).siblings(".taxes-header").children(".bw-icon").toggleClass("hidden");
  });
  $('.room-amenities .close-details').click(function() {
    var $scrollToElement = $(this).parent().parent().parent().parent();
    console.log($scrollToElement);
    $('html, body').animate({
        scrollTop: $scrollToElement.offset().top
    }, 500);
  });

  $('.request-expandables').on('show.bs.collapse hide.bs.collapse', function () {
    $(this).siblings(".requests-header").children(".requests-icon").toggleClass("hidden");
  });
  $('#creditcard').click(function() {
    $(this).toggleClass('selected');
    $('#credit-card-info').toggleClass('hidden');
  });
  $('#sameAddress').click(function() {
    $('#billing-address').toggleClass('hidden');
  });
  $('#check-reservation input[type="radio"]').click(function() {
    if($(this).attr("value")=="rewards-confirmation"){
      //show rewards login
      $('#rewards-info').removeClass('hidden');
      $('#confirmation-info').addClass('hidden');
    }
    if($(this).attr("value")=="number-confirmation"){
      //show confirmation number
      $('#rewards-info').addClass('hidden');
      $('#confirmation-info').removeClass('hidden');
    }
  });
  $('#rewards-member input[type="radio"]').click(function() {
    var value = $(this).attr("value");
    if(value == "yes"){
      //show rewards login
      $('#rewards-login').removeClass('hidden');
      $('#guest-login').addClass('hidden');
      $('.bw-bottom-bar .login').removeClass('hidden');
      $('.bw-bottom-bar .continue').addClass('hidden');
    }
    else if(value == "no"){
      //show confirmation number
      $('#rewards-login').addClass('hidden');
      $('#guest-login').removeClass('hidden');
      $('.bw-bottom-bar .login').addClass('hidden');
      $('.bw-bottom-bar .continue').removeClass('hidden');
    }
  });
  $('#new-card input[type="radio"]').click(function() {
    var value = $(this).attr("value");
    if(value == "new-member"){
      //show rewards login
      $('.bw-bottom-bar .new-member').removeClass('hidden');
      $('.bw-bottom-bar .new-card').addClass('hidden');
    }
    else if(value == "replacement-card"){
      //show confirmation number
      $('.bw-bottom-bar .new-member').addClass('hidden');
      $('.bw-bottom-bar .new-card').removeClass('hidden');
    }
  });
});

})();
