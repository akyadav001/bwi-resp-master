(function() {
'use strict';

var mapView = "map-view";
var imageView = "hotel-image-list-view";
var listView = "phone-list-view";
var compareView = "compare-view";
//view names

function getCurrentView(){
    return document.body.getAttribute("data-view");
}

function setFooterState(){
	var view = getCurrentView();

	if(view == mapView) {
		var $tabletMapButton = $('#tablet-map-view-button');
		$tabletMapButton.addClass("active");
		$tabletMapButton.find('span.bw-icon').removeClass("bw-icon-map-blue").addClass("bw-icon-map-white");
	} else if (view == imageView) {
		var $tabletImageButton = $('#tablet-image-view-button');
		$tabletImageButton.addClass("active");
		$tabletImageButton.find('span.bw-icon').removeClass("bw-icon-image-blue").addClass("bw-icon-image-white");
	} else if (view == listView) {
		var $mobileListButton = $('#mobile-phone-list-view-button');
		$mobileListButton.addClass("active");
		$mobileListButton.find('span.bw-icon').removeClass("bw-icon-list-blue").addClass("bw-icon-list-white");
	} else if(view == compareView) {
		var $tabletCompareButton = $('#tablet-compare-hotels-button');
		$tabletCompareButton.addClass("active");
		$tabletCompareButton.find('span.bw-icon').removeClass("bw-icon-compare-blue").addClass("bw-icon-compare-white");
    }
}

$(document).ready(function() {
	setFooterState();
	//filter toggle hotel type checkboxes on logo-click
	var cboxPopoverStandard = $('#hotel-type-standard');
	$('#bw-standard-hotel-popover-img').click(function() {
		cboxPopoverStandard.prop("checked", !cboxPopoverStandard.prop("checked"));
	});
	var cboxPopoverPlus = $('#hotel-type-plus');
	$('#bw-plus-hotel-popover-img').click(function() {
		cboxPopoverPlus.prop("checked", !cboxPopoverPlus.prop("checked"));
	});
	var cboxPopoverPremier = $('#hotel-type-premier');
	$('#bw-premier-hotel-popover-img').click(function() {
		cboxPopoverPremier.prop("checked", !cboxPopoverPremier.prop("checked"));
	});
	var cboxModalStandard = $('#modal-hotel-type-standard');
	$('#bw-standard-hotel-modal-img').click(function() {
		cboxModalStandard.prop("checked", !cboxModalStandard.prop("checked"));
	});
	var cboxModalPlus = $('#modal-hotel-type-plus');
	$('#bw-plus-hotel-modal-img').click(function() {
		cboxModalPlus.prop("checked", !cboxModalPlus.prop("checked"));
	});
	var cboxModalPremier = $('#modal-hotel-type-premier');
	$('#bw-premier-hotel-modal-img').click(function() {
		cboxModalPremier.prop("checked", !cboxModalPremier.prop("checked"));
	});
});

$(window).resize(function() {
	setFooterState();
});

})();
