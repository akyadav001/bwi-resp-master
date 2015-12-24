(function() {
'use strict';

var $body = $('body');

$(document).ready(function() {
	$('#login-page-login-btn').click(function() {
		$('#account-menu').removeClass('hidden').addClass('hide-me');
	    $('#rewards-menu').addClass('hide-me');
	    $('#main-menu').removeClass('hide-me');
	    $('#menu-user').removeClass('hidden');
	    $('#login-button').addClass('hidden');
	    $('.account-menu-forward').removeClass('hidden');
	    $('#left-menu').removeClass('hide-me');
	    $('#blur').removeClass('hidden');
	    $body.addClass('menu-open');
	});
});

})();
