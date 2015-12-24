var screenShifted = false;
var $window = $(window);
var $staticModals = $(".modal-static").parent(".modal");
var iOS = false,
    iDevice = ['iPad', 'iPhone', 'iPod'];
  var selector = $('[data-active]');
  selector.each(function() {

    var trigger = $(this).data('target'),
        active = $(this).data('active');

    $(trigger).on('show.bs.collapse', function() {
      $(active).addClass('active');
    }).on('hide.bs.collapse', function() {
      $(active).removeClass('active');
    })
  });


$staticModals.on("shown.bs.modal", function() {
   CalculateModalHeight($(this));
});

//The below code scans the dom for the 'data-linked' attribute. The useage for this is to propagate the radio/checkbox 'checked'
//state to a control specified in the data attribute.
$('[data-linked]').on('change', function(e) {
  var linkedElement = $(this).data('linked');
  $(linkedElement).prop('checked', $(this).prop('checked'));
});

//For ReviewOrderEmail.html.
//TODO: Stratigize on how to generalize this for use with any radio accordion.
$('input[name="shipType"]').change(function() {
  $(this).val() == "other" ?  $('#otherDetails').collapse('show') :
      $('#otherDetails').collapse('hide');
});



//The below code listens for changes in the viewport and will reposition the popovers to proper positions below the triggering element.
//If the user falls into the mobile range after a resize/orientation shift, close the popover per design.
var timeout = setInterval(function() {
    /* If the page was scrolled, handle the scroll */
   if (screenShifted) {
      screenShifted = false;
      if (window.matchMedia("screen and (min-width: 768px)").matches) {
         $(".popover.in").each(function() { $(this).popoverX('refreshPosition'); });
      }
      else {
         $(".popover.in").each(function() { $(this).popoverX('hide') })
      }
   }
}, 100);

function CalculateModalHeight($element) {
   var offsetHeight = 0;
   var $dialog = $element.find(".modal-dialog");
   offsetHeight += (parseInt($dialog.css("marginTop")) + parseInt($dialog.css("marginBottom")));
   offsetHeight += $dialog.find(".bw-modal-header").outerHeight();
   offsetHeight += $dialog.find(".bw-modal-footer").outerHeight();
   var newDialogHeight =  window.innerHeight - offsetHeight;
   if (iOS) {
    $dialog.find(".modal-body").css("max-height", newDialogHeight);
   }
   else {
    $dialog.find(".modal-body").css("height", newDialogHeight);
   }
}

//This will reset the static modal's height to fit the new screen resolution.
$window.on("orientationchange resize", function() {
   screenShifted = true;
   if ($(".modal.in").find('.modal-static').length) {
      CalculateModalHeight($(".modal.in"));
   }
});

//IE 10 specific code. Fix for IE 10 mobile viewport issue and prompt the user
//to select a modern browser.
(function() {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
        promptUserForBrowser();
    }
    for (var i=0; i < iDevice.length; i++ ) {
    if( navigator.platform === iDevice[i] ){ iOS = true; break; }
}
})();

//This function is used to populate the warning prompt with the desired message.
//There is an optional function that can be bound to the modal dismiss button click event. 
function showWarningModalPrompt(message, action) {
  var $modal = $('.js-warning-modal');
  $('.js-warning-modal-text').html(message);
  
  if (typeof action === 'function') {
    $('.js-warning-button').on("click", action);
  }
  $modal.modal('show');
}

//This function will check if the user has viewed the prompt to suggest using
//a modern supported browser. If they have not, the prompt is displayed and a cookie set once the user taps continue.
function promptUserForBrowser() {
  if (!Cookies.get('viewedIEPrompt')) {
    showWarningModalPrompt("This site has been optimized for use in Google Chrome, Mozilla Firefox, and Safari."
      + " For the best browsing experience, we recommend the use of one of the listed browsers.", function() {
      Cookies.set('viewedIEPrompt', 'true', {expires: 365 * 20});
    });
  }
}

//Load the font files
$.getScript("//use.typekit.net/gwh2qmt.js", function() {
   try {
      Typekit.load();
   }
   catch(e) {

   }
});


