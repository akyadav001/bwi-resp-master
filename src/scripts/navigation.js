(function() {
'use strict';

var $header = $('#header'),
  $body = $('body');

function closeMenu() {
   $('#left-menu').addClass('hide-me');
   $('#blur').addClass('invisible');
   $body.removeClass('menu-open');
}
//In the demo site, we are rendering the header dynamically through jQuery. Since this is the case, we register the click handlers through delegates
//on the element present in the document. If the header is not being rendered dynamically in production, this code can be refactored to remove delegation and 
//register the events on the elements directly. 

$(document).ready(function() {
  $header.on("click", "#menu-burger, .closes-modal-from-nav", function() {
    $('#left-menu').removeClass('hide-me');
    $('#blur').removeClass('invisible');
    $body.addClass('menu-open');
  }).on("click", "#menu-close-button, #blur, #menu-overlay, .opens-modal", closeMenu)
    .on("swipeleft", "#menu-list", closeMenu)
    .on("click", "#login-button > button, #logout", function() {
    $('#account-menu').toggleClass('hidden').addClass('hide-me');
    $('#rewards-menu').addClass('hide-me');
    $('#main-menu').removeClass('hide-me');
    $('#menu-user').toggleClass('hidden');
    $('#login-button').toggleClass('hidden');
    $('.account-menu-forward').toggleClass('hidden');
  }).on("click", ".rewards-menu-forward", function() {
    $('#rewards-menu').removeClass('hide-me');
    $('#main-menu').addClass('hide-me');
  }).on("click", ".settings-menu-forward", function() {
    $('#settings-menu').removeClass('hide-me');
    $('#main-menu').addClass('hide-me');
  }).on("click", ".account-menu-forward", function() {
    $('#account-menu').removeClass('hide-me');
    $('#main-menu').addClass('hide-me');
  }).on("click", ".main-menu-back", function() {
    $('#rewards-menu').addClass('hide-me');
    $('#settings-menu').addClass('hide-me');
    $('#account-menu').addClass('hide-me');
    $('#main-menu').removeClass('hide-me');
  });

});


})();
