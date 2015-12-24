/* global jQuery */

(function($) {
'use strict';

//Variables 

var mq = window.matchMedia('(min-width: 60em), (min-width: 70em)'),
    searchResults = $('.search-results-list'),
    numSlides = 1;

function UpdateSlider() {
  if (mq.matches && !searchResults.hasClass('slick-initialized')) {
    searchResults.slick({slidesToShow: numSlides});
  } else if(!mq.matches && searchResults.hasClass('slick-initialized')) {
    searchResults.slick('unslick');
  }
}


function initialize() {
  var mapOptions = {
     center: { lat: 36.107169, lng: -112.113115},
     zoom: 10,
     disableDefaultUI: true
  };
  var draggable = document.getElementById('map-canvas').getAttribute("data-draggable");
  if(draggable == "false") {
     mapOptions.disableDefaultUI = true;
     mapOptions.draggable = false;
     mapOptions.zoomControl = false;
     mapOptions.scrollwheel = false;
     mapOptions.disableDoubleClickZoom = true;
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
     mapOptions);
     var grandCanyonLatLong = new google.maps.LatLng(36.107169, -112.113115);
     var grandCanyon = new CustomMarker(grandCanyonLatLong, map, 1, "" );
     var northRimLatLong = new google.maps.LatLng(36.2105, -112.0613);
     var northRim = new CustomMarker(northRimLatLong, map, 99, "active" );
     var kiababPlateauLatLong = new google.maps.LatLng(36.396216, -112.150598);
     var kiababPlateau = new CustomMarker(kiababPlateauLatLong, map, 100, "" );
}



$(window).resize(UpdateSlider);

UpdateSlider();

google.maps.event.addDomListener(window, 'load', initialize);

})(jQuery);
