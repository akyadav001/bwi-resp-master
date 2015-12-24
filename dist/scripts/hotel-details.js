
(function() {
'use strict';

//Docking book a room bar
$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = 1000;             

    if(y_scroll_pos > scroll_pos_test) {
      $(".bw-bottom-bar.single-button.hotel-details").addClass("docked");
      $(".docking-wrapper").addClass("docked");
      $(".site-footer").css("margin-bottom","50px");
    }
    else{
      $(".bw-bottom-bar.single-button.hotel-details").removeClass("docked");
      $(".docking-wrapper").removeClass("docked");
      $(".site-footer").css("margin-bottom","0px");
    }
});

//Clicking outside of map 2 will disable its draggability/scroll zoom
$(document).click(function(event) { 
    if(!$(event.target).closest("#attractions-map-canvas").length) {
        googleMap2.set('draggable',false);
        googleMap2.set('scrollwheel',false);
    }        
})

//Clicking inside of map 2 will enable its draggability/scroll zoom
$("#attractions-map-canvas").click(function(){
  if($("#details-collapse-toggle").css("display")=="none") {  
    googleMap2.set('draggable',true);
    googleMap2.set('scrollwheel',true);
  }
});

function initialize() {
  
  var map1 = document.getElementById('map-canvas');
  var mapOptions1 = {
    center: {lat: 39.929996, lng: -82.792249},
    zoom: 16
  }
  mapOptions1 = draggableMapOptions(map1, mapOptions1);

  var map2 = document.getElementById('attractions-map-canvas');
  var mapOptions2 = {
    center: {lat: 39.933, lng: -82.787},
    zoom: 14,
    disableDefaultUI: true
  }
  mapOptions2 = draggableMapOptions(map2, mapOptions2);

  // var draggable = document.getElementById('map-canvas').getAttribute("data-draggable");
  // if(draggable == "false") {
  //    mapOptions.disableDefaultUI = true;
  //    mapOptions.draggable = false;
  //    mapOptions.zoomControl = false;
  //    mapOptions.scrollwheel = false;
  //    mapOptions.disableDoubleClickZoom = true;
  // }

    window.googleMap1 = new google.maps.Map(map1,mapOptions1);
    var BWColumbusEastLatLong = new google.maps.LatLng(39.929996, -82.792249);
    var BWColumbusEast = new CustomMarker(BWColumbusEastLatLong, googleMap1, 0, "" );

    window.googleMap2 = new google.maps.Map(map2,mapOptions2);
    var homeLatLong = new google.maps.LatLng(39.929, -82.792);
    var home = new CustomMarker(homeLatLong, googleMap2, 0, "" );
    var poi1LatLong = new google.maps.LatLng(39.927, -82.784);
    var poi1 = new CustomMarker(poi1LatLong, googleMap2, 1, "active" );
    var poi2LatLong = new google.maps.LatLng(39.934, -82.782);
    var poi2 = new CustomMarker(poi2LatLong, googleMap2, 2, "" );
    var poi3LatLong = new google.maps.LatLng(39.938, -82.785);
    var poi3 = new CustomMarker(poi3LatLong, googleMap2, 3, "" );
    var poi4LatLong = new google.maps.LatLng(39.936, -82.784);
    var poi4 = new CustomMarker(poi4LatLong, googleMap2, 4, "" );

  //recenter map so pin is visible 

    googleMap1.panBy(($('#address-directions > div.col-xs-12').width())/-2,0);
}

$(window).resize(function() {
    googleMap1.setCenter(new google.maps.LatLng(39.929996, -82.792249));  
    googleMap1.panBy(($('#address-directions > div.col-xs-12').width())/-2,0);
    
    if($("#details-collapse-toggle").css("display")=="none") {
    $("#hotel-details").removeClass("collapsed");
    $("#hotel-details .gradient").addClass("hidden");
  }
  
  if(!$("#hotel-details").hasClass("collapsed")){
    $("#hotel-details .gradient").addClass("hidden");
    $("#details-toggle-expand").addClass("hidden");
    $("#details-toggle-collapse").removeClass("hidden");
  }
  
  if($("#details-collapse-toggle").css("display")=="none") {  
    $("#attractions-map-canvas").attr("data-draggable", "true");
  }
  else {$("#attractions-map-canvas").attr("data-draggable", "false");}
})

$(document).ready(function() {
  var $amenities = $('.js-amenities'),
      $amenitiesCarousel = $('.js-amenities-carousel'),
      $amenitiesCollapseContainer = $('.js-amenities-collapse-container'),
      $amenitiesExpand = $('.js-amenities-expand'),
      $amenitiesCollapse = $('.js-amenities-collapse'),
      $amenitiesScrollBar = $('.js-amenity-scrollbar'),
      $roomCarousel = $('#room-carousel'),
      $amenityHeaderLeft = $('.js-amenity-header--left'),
      $amenityHeaderRight = $('.js-amenity-header--right');
	// try {
	// 	var firstItemSrc = $(".virtual-tour-list-item:eq(0)").attr("data-frame-src");
	// 	$("#virtual-tour-frame iframe").attr("src", firstItemSrc);
	// } catch (e) {
	// 	console.log(e);
	// }
  
  $('#attractions-map > ul > li').click(function() {
    $('#attractions-map > ul > li').removeClass('-selected');
    $(this).addClass('-selected');    
  })

  function pageCarouselBack() {
    $amenitiesCarousel.carousel('prev');
    $amenitiesScrollBar.removeClass("scroll-right");
  }
  
  function pageCarouselForward() {
    $amenitiesCarousel.carousel('next');
    $amenitiesScrollBar.addClass("scroll-right");
  }
  
   google.maps.event.addDomListener(window, 'load', initialize);

  $roomCarousel.swiperight(function() {
    $roomCarousel.carousel('prev');
  })
  .swipeleft(function() {
    $roomCarousel.carousel('next');
  });

  $("#virtual-tour .transparent").swiperight(function() {
    $("#room-carousel-background").carousel('prev');
  })
  .swipeleft(function() {
    $("#room-carousel-background").carousel('next');
  });

  $(".virtual-tour-list-item").click(function() {
    var src = $(this).attr("data-frame-src");
    $("#virtual-tour-frame iframe").attr("src", src);
  });

  $("#details-collapse-toggle").click(function() {
    $("#hotel-details").toggleClass("collapsed");
    if($("#hotel-details").hasClass("collapsed")) {
      $('html, body').animate({
        scrollTop: $("#hotel-details").offset().top
      }, 500);
    }
    $("#hotel-details .gradient").toggleClass("hidden");
    $("#details-toggle-expand").toggleClass("hidden");
    $("#details-toggle-collapse").toggleClass("hidden");
  });

  if($("#details-collapse-toggle").css("display")=="none") {
    $("#hotel-details").removeClass("collapsed");
    $("#hotel-details .gradient").addClass("hidden");
  }

  $amenitiesCollapseContainer.click(function() {
    $amenities.toggleClass("collapsed");
    if($amenities.hasClass("collapsed")) {
      $('html, body').animate({
        scrollTop: $amenities.offset().top
      }, 500);
    }
    $amenities.find('.gradient').toggleClass("hidden");
    $amenitiesExpand.toggleClass("hidden");
    $amenitiesCollapse.toggleClass("hidden");
  });

  $amenitiesCarousel.swiperight(pageCarouselBack)
    .swipeleft(pageCarouselForward);
  
  $amenityHeaderLeft.click(pageCarouselBack);
  $amenityHeaderRight.click(pageCarouselForward);
  
});

})();
