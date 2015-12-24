/* global $ */
(function () {
  'use strict';

$(document).ready(function() {

	$('#add-a-room-2').click(function() {
		$(this).toggleClass("hidden");
		$('#room-2').toggleClass("hidden");
	});

	$('#add-a-room-3').click(function() {
		$(this).toggleClass("hidden");
		$('#room-3').toggleClass("hidden");
	});

	$('#close-room-2').click(function() {
		$('#add-a-room-2').toggleClass("hidden");
		$('#room-2').toggleClass("hidden");
	});

	$('#close-room-3').click(function() {
		$('#add-a-room-3').toggleClass("hidden");
		$('#room-3').toggleClass("hidden");
	});

   $('.bw-bottom-bar #search-button').click(function() {
   $('#loading-wrapper').removeClass('hidden');
   $('body').css('overflow','hidden');
      setTimeout(function() {
      window.location.href='HotelImageListView.html';
   }, 4000);
});

});

})();
