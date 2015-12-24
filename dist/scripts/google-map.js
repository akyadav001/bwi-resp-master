var resizeTimer;
var mobileQuery = window.matchMedia("screen and (min-width: 768px)");

$(window).resize(function(){
   clearTimeout(resizeTimer);
   resizeTimer = setTimeout(function() {
      CenterPins(mobileQuery);
   }, 250);
});

function draggableMapOptions(element, mapOptions) {
  var draggable = element.getAttribute("data-draggable");
  if(draggable == "false") {
     mapOptions.disableDefaultUI = true;
     mapOptions.draggable = false;
     mapOptions.zoomControl = false;
     mapOptions.scrollwheel = false;
     mapOptions.disableDoubleClickZoom = true;
  }
  return mapOptions;
}

function CenterPins(mq) {
    $(".map-pin-container").each(function(index, element) {
       var $element = $(element);
       var originalTop = $element.position().top;
       var originalLeft = $element.position().left;
       var originalHeight = $element.height();
       var originalWidth = $element.width();
       if (mq.matches) {
          $element.removeClass("small-pin");
       }
       else {
          $element.addClass("small-pin");
       }
       var newTop = originalTop + (originalHeight - $element.height());
       var newLeft = originalLeft + ((originalWidth - $element.width()) / 2);
       $element.css("top", newTop);
       $element.css("left", newLeft);

    });
}

function CreateSVGPin (numberToOverlay) {
  //0 indicates home pin, no text is overlayed on this pin.
  if (numberToOverlay == 0) {
    var svgHtml = "<svg class=\"home-map-pin\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" height=\"50\" viewBox=\"0 0 64 83\" width=\"40\" version=\"1.1\" preserveAspectRatio=\"xMidYMid\"><path d=\"M63.996,32.001 C63.996,58.140 32.000,82.813 32.000,82.813 C32.000,82.813 0.004,58.140 0.004,32.001 C0.004,14.327 14.329,-0.000 32.000,-0.000 C49.671,-0.000 63.996,14.327 63.996,32.001 Z\" id=\"path-1\" fill-rule=\"evenodd\" style=\"fill:#df9e02;fill-opacity:1;opacity:1\" \/><g id=\"layer4\" style=\"display:inline;opacity:1\"><path id=\"path-2\" d=\"m 20.837896,48.401794 c 0,0 2.183104,-12.263738 2.183104,-12.263738 0,0 -9.249875,-8.682782 -9.249875,-8.682782 0,0 12.783856,-1.789326 12.783856,-1.789326 0,0 5.717086,-11.156499 5.717086,-11.156499 0,0 5.71947,11.156499 5.71947,11.156499 0,0 12.785049,1.789326 12.785049,1.789326 0,0 -9.253452,8.682782 -9.253452,8.682782 0,0 2.185489,12.263738 2.185489,12.263738 0,0 -11.436556,-5.789673 -11.436556,-5.789673 0,0 -11.434171,5.789673 -11.434171,5.789673 z m 11.434171,-9.976673 c 0,0 6.326351,3.203044 6.326351,3.203044 0,0 -1.208993,-6.782848 -1.208993,-6.782848 0,0 5.116165,-4.803413 5.116165,-4.803413 0,0 -7.069155,-0.989717 -7.069155,-0.989717 0,0 -3.164368,-6.171043 -3.164368,-6.171043 0,0 -3.161984,6.171043 -3.161984,6.171043 0,0 -7.07154,0.989717 -7.07154,0.989717 0,0 5.114974,4.803413 5.114974,4.803413 0,0 -1.205417,6.782848 -1.205417,6.782848 0,0 6.323967,-3.203044 6.323967,-3.203044 z\" style=\"opacity:0.5;fill:#000000;fill-rule:evenodd\"\/><\/g>";
  } else {
     //Not a home pin so create the pin containing the numeric overlay. The switch statement checks the length of the desired string and modifies the positioning
     //of the text so that it appears correctly with 1, 2, or 3 digit numeric values.
    var svgHtml = "<svg class=\"bw-map-pin\" xmlns=\"http:\/\/www.w3.org\/2000\/svg\" height=\"50\" viewBox=\"0 0 39.999998 50.000001\" width=\"40\" version=\"1.1\" preserveAspectRatio=\"xMidYMid meet\"><g transform=\"matrix(.97501 0 0 .98001 .70032 -981.37)\"><path  d=\"m15.176 1048.3c-11.221-10.4-16.556-21.2-14.871-29.9 0.88867-4.5934 2.4455-7.37 5.9482-10.615 7.8463-7.2695 19.638-7.2695 27.484 0 10.821 10.025 7.4731 25.221-8.922 40.501-2.3878 2.2272-4.5569 4.0466-4.8201 4.0466-0.26324 0-2.4323-1.8194-4.8201-4.0466z\"\/><circle cy=\"1021.4\" cx=\"20\" r=\"14.861\"\/><\/g>";
    switch(numberToOverlay.toString().length) {
       case 1:
       svgHtml +=  "<text  y=\"25\" x=\"14\" font-size=\"20\" font-family=\"helvetica\">" + numberToOverlay + "<\/text><\/svg>";
       break;
       case 2:
       svgHtml +=  "<text  y=\"25\" x=\"09\" font-size=\"20\" font-family=\"helvetica\">" + numberToOverlay + "<\/text><\/svg>";
       break;
       case 3:
       svgHtml +=  "<text  y=\"25\" x=\"06\" font-size=\"16\" font-family=\"helvetica\">" + numberToOverlay + "<\/text><\/svg>";
       break;
       default:
       svgHtml += "</svg>";
       break;
    }
  }

  return svgHtml;
}

function CustomMarker(latlng,  map, markerNumber, classToAdd) {
 this.latlng_ = latlng;
 this.classToAdd = classToAdd;
 this.markerNumber = markerNumber;
 // Once the LatLng and text are set, add the overlay to the map.  This will
 // trigger a call to panes_changed which should in turn call draw.
 this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
  var me = this;

  // Check if the div has been created.
  var div = this.div_;
  if (!div) {
    // Create a overlay text DIV
    div = this.div_ = document.createElement('DIV');
    // Create the DIV representing our CustomMarker
    div.style.position = 'absolute';
    div.style.paddingLeft = '0px';
    div.style.cursor = 'pointer';
    div.className = this.classToAdd;
    div.className += " map-pin-container";
    if (!mobileQuery.matches) {
      div.className += " small-pin";
    }
    div.innerHTML = CreateSVGPin(this.markerNumber);

    google.maps.event.addDomListener(div, "click", function(event) {
      //only do this for clickable pins
      if ($(this).hasClass("home-map-pin")) {
        return false;
      }

      //Cache original width and heights.
      var originalHeight = $(this).innerHeight();
      var originalWidth = $(this).innerWidth();

      //Add class to manipulate size of the graphic.
      $(this).toggleClass("active");

      //Calculate the offset changes between the width and height of the old graphic versus the new graphic. We divide by two on the width
      //to center the graphic on the location.
      var offsetWidth = (originalWidth - $(this).innerWidth()) / 2;
      var offsetHeight =  originalHeight - $(this).innerHeight();

      //Apply the changes
      var newLeft = parseInt($(this).css("left"), 10) +  offsetWidth;
      var newTop = parseInt($(this).css("top"), 10) + offsetHeight;
      $(this).css("left", newLeft);
      $(this).css("top", newTop);
      google.maps.event.trigger(me, "click");

    });

    // Then add the overlay to the DOM
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  // Position the overlay
  var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
  if (point) {
    var offsetWidth = $(div).innerWidth() / 2;
    var offsetHeight = $(div).innerHeight();
    div.style.left = (point.x - offsetWidth) + 'px';
    div.style.top = (point.y - offsetHeight) + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  // Check if the overlay was on the map and needs to be removed.
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

CustomMarker.prototype.getPosition = function() {
return this.latlng_;
};