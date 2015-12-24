var $roomBar = $('.js-room-bar'),
  sticky = $('#bw-selected-rooms-bar'),
  $gridTiles = $('.js-grid-tile'),
  scrolled = false,
  $window = $(window),
  stickyTop = 0,
  
  //Please note the pocHtml is for demonstration purposes only, html should be added dynamically through AJAX or another means. 
  pocHtml = $('.js-poc-room-html').html();
  console.log(pocHtml);

$(document).ready(function() {
   stickyTop = ($roomBar.offset().top - $roomBar.outerHeight());
});

/* Add displaying active state on the room-bar*/
$roomBar.on('click', 'div:not(":last-child")', function() {
   $roomBar.find('.active').toggleClass('active');
   $(this).addClass('active');
});

/* Bind the scroll Event */
$window.on('scroll', function(e) {
    scrolled = true;
});
$window.on('resize', function(e) {
   stickyTop = sticky.offset().top - sticky.outerHeight();
})
var timeout = setInterval(function() {
    /* If the page was scrolled, handle the scroll */
    if (scrolled) {
        scrolled = false;
        if ($window.scrollTop() >= stickyTop) {
            sticky.addClass('fixed');
        } else {
            sticky.removeClass('fixed');
        }
    }
}, 100);

//Traverse the DOM to grab the appropriate room to open and close. Since there are two links with a different DOM structure, we create handlers
//for the two use cases.
$gridTiles.on("click", ".js-expand", function() {
  var $roomToOpen = $(this).parents(".js-grid-tile");
  HandleRoomClick($roomToOpen);
});

//Add the room to the rooms box and advance the user to the next room
$gridTiles.on("click", ".select-room input", function(evt) {
   $roomBar.find(".active .room-indicator").addClass("completed");
   $roomBar.find(".active").removeClass("active").next(":not(.bw-accordion)").addClass("active");
   $(".under div").first().html(pocHtml);
});

$(".room-amenities").on("click", ".js-expand", function () {
   var $roomToOpen = $(this).parents(".room-amenities").prev(".grid-tile");
   HandleRoomClick($roomToOpen);
});

$(".under").on("click", ".remove-room", function() {
   $(this).parents('.room-information-container').html('');
   $(".room-rates").find("input[type='radio']:checked").prop("checked", false);
});

function HandleRoomClick($element) {
   if (window.matchMedia("screen and (min-width: 768px)").matches) {
      TabletRoomHandler($element);
   }
   else {
      MobileRoomHandler($element);
   }
}

function MobileRoomHandler($element)  {
  if (!($element).hasClass('active')) {
      $element.addClass("active").next(".room-amenities").slideDown(400, function() {
        $(this).addClass('active').attr('style', '')});
  }
  else {
      $element.next('.room-amenities').slideUp(400, function() {
        $(this).removeClass('active');
        $element.removeClass('active');
      });
  }
}

function TabletRoomHandler($element) {
   var $this = $element;
   if ($this.hasClass('active')) {
      $this.next(".room-amenities").slideUp(400, function() {
        $(this).removeClass('active').attr('style', '');
        $element.removeClass('active');
      });
   }
  else if ($this.siblings().hasClass("active")) {
      var $closingElement = $this.siblings(".js-grid-tile.active");
      $closingElement.toggleClass("active").next(".room-amenities").toggleClass("active");
      $this.toggleClass("active").next(".room-amenities").toggleClass("active");
   }
   else {
    //There is no open tile, just open the tile
      $this.toggleClass("active").next(".room-amenities").slideDown(400, function() {
        $(this).addClass('active').attr('style', '');
      });
   }
}
