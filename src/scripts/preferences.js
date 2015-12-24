(function() {
'use strict';

var $phone1 = $('#phone-1'),
  $phone2 = $('#phone-2'),
  $phone3 = $('#phone-3');

$(document).ready(function() {

  $('.add-a-number').on("click", function(){
    if($phone2.hasClass('hidden')) {
      $phone2.removeClass('hidden');
    } else if ($phone3.hasClass('hidden')) {
      $phone3.removeClass('hidden');
      $(this).addClass('hidden');
    }
  });

  $('select.phone-type').bind('change', function() {
    if($(this).val() == "mobile") {
      $(this).parent().parent().find('.text-offers').removeClass('hidden');
    } else {
      $(this).parent().parent().find('.text-offers').addClass('hidden').find('.check_box').prop('checked',false);
    }
  });

  $('select.addr-type').bind('change', function() {
    if($(this).val() == "business") {
      $(this).parent().parent().parent().parent().find('.business-address').removeClass('hidden');
    } else {
      $(this).parent().parent().parent().parent().find('.business-address').addClass('hidden');
    }
  });

  $('.membership-details-collapsible').on('show.bs.collapse', function() {
    $(this).parent().addClass('active');
  }).on('hide.bs.collapse', function() {
    $(this).parent().removeClass('active');
  });
});

})();
