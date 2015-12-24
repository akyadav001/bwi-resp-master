/* global jQuery */
/* global $ */
(function() {
'use strict';

$(document).ready(function() {

  $('.js-pagination').each(function() {
    var $paginator = $(this);
    var $paginator_left = $paginator.siblings('.js-page-left'),
        $paginator_right = $paginator.siblings('.js-page-right');

    $paginator_left.on('click', function() {
      var $active = $paginator.find('.active');
      if($active.prev().length) {
        //if the previous item is off the left of the screen, scroll left
        if($active.prev().position().left < $active.width()) {
          $paginator.animate({scrollLeft: ($paginator.scrollLeft() + $active.prev().position().left - $paginator.width() + $active.width())}, 200);
        }
        //if the previous item is off the right of the screen, scroll right
        else if ($active.prev().position().left > ($paginator.width() - $active.width())) {
          $paginator.animate({scrollLeft: ($paginator.scrollLeft() + $active.prev().position().left - $paginator.width() + $active.width())}, 200);
        }
        // console.log("paginator.scrollLeft: " + $paginator.scrollLeft());
        // console.log("paginator.width: " + $paginator.width());
        // console.log("prev active position: " + $active.prev().position().left);
        $active.prev().children('a').click();
      } else {
        $paginator.animate({scrollLeft: 0}, 500);
      }
    });
    $paginator_right.on('click', function() {
      var $active = $paginator.find('.active');
      if($active.next().length) {
        //if the next item is off the right of the screen, scroll right
        if($active.next().position().left > ($paginator.width())) {
          $paginator.animate({scrollLeft: ($paginator.scrollLeft() + $active.next().position().left - $active.width() - 20)}, 200);        
        }
        //if the next item is off the left of the screen, scroll left
        else if ($active.next().position().left < $active.width()) {
          $paginator.animate({scrollLeft: ($paginator.scrollLeft() + $active.next().position().left - $active.width() - 20)}, 200);        
        }
        // console.log("paginator.scrollLeft: " + $paginator.scrollLeft());
        // console.log("paginator.width: " + $paginator.width());
        // console.log("next active position: " + $active.next().position().left);
        $active.next().children('a').click();
      } else {
        $paginator.animate({scrollLeft: $paginator[0].scrollWidth}, 500);
      }
    });
  });
});

})();
