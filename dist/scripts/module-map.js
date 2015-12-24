'use strict';

var SplitSlider = {
  Orientation: {
    HORIZONTAL: 0,
    VERTICAL: 1
  },

  init: function () {
    this.top = $('.js-top');
    this.bottom = $('.js-bottom');
    this.detector = $('.js-detector');
    this.handle = $('.js-handle');
    this.slideContainer = this.top.parent();
    this.topHeight = this.top.height();
    this.topWidth = this.top.width();
    this.bottomWidth = this.bottom.outerWidth();
    this.containerHeight = this.slideContainer.height();
    this.containerWidth = this.slideContainer.width();
    this.topMinimumHeight = 0;
    this.topMinimumWidth = 300;
    this.topMaximumWidth = 650;
    this.startingBreakpoint =  this.getCurrentBreakpoint();
    this.currentBreakpoint = this.startingBreakpoint;
    this.touchObj = '';
    this.startx = '';
    this.starty = '';
    this.tabletMediaQuery = window.matchMedia('(min-width: 992px)');
    this.bindEvents();
    this.horizontalEnabled = $('[data-horizontal="true"]').length > 0;
    /*
    this.tabletMediaQuery.matches && this.horizontalEnabled ? this.changeOrientation(this.Orientation.HORIZONTAL) :
    this.changeOrientation(this.Orientation.VERTICAL);
    */
  },

  bindEvents: function () {
    $(window).resize(function () {
      this.containerHeight = this.slideContainer.height();
      this.containerWidth = this.slideContainer.width();
      this.currentBreakpoint = this.getCurrentBreakpoint();

     if (this.currentBreakpoint != this.startingBreakpoint) {

      this.tabletMediaQuery.matches && this.horizontalEnabled ? this.changeOrientation(this.Orientation.HORIZONTAL) :
      this.changeOrientation(this.Orientation.VERTICAL);

      this.resetSlider();
      this.startingBreakpoint  = this.currentBreakpoint;
    }
  }.bind(this));

  this.handle.on('touchstart', function (e) {
    this.touchObj = e.originalEvent.changedTouches[0];
    this.topHeight = parseInt(this.top.height());
    this.topWidth = parseInt(this.top.outerWidth());
    this.bottomWidth = parseInt(this.bottom.outerWidth());
    this.starty = parseInt(this.touchObj.clientY);
    this.startx = parseInt(this.touchObj.clientX);
    e.preventDefault();
  }.bind(this));

  this.handle.on('touchmove', function (e) {
      this.touchObj = e.originalEvent.changedTouches[0];
      if (this.horizontalEnabled && this.tabletMediaQuery.matches) {
        this.handleSlideHorizontal();
      }
      else {
        this.handleSlideVertical();
      }
    }.bind(this));
  },

  getCurrentBreakpoint: function () {
    return this.detector.find(':visible').data('breakpoint');
   },

  resetSlider: function () {
    this.resetProportions(this.top);
    this.resetProportions(this.bottom);
    this.bottom.scrollTop(0);
  },

  resetProportions: function (element) {
    element.css('height', '');
    element.css('width', '');
  },

  handleSlideHorizontal: function () {
    var distX = parseInt(this.touchObj.clientX) - this.startx;
    var newTopWidth = this.topWidth + distX;
    if (newTopWidth > this.topMinimumWidth  && newTopWidth < this.topMaximumWidth) {
      var topWidthPercentage = (newTopWidth < this.topMinimumWidth ? (this.topMinimumWidth/this.containerWidth) : (newTopWidth/this.containerWidth));
      topWidthPercentage *= 100;
      this.top.outerWidth(topWidthPercentage + "%");
      this.bottom.outerWidth(100 - topWidthPercentage + "%");
    }
  },
/*
  changeOrientation: function(orientation) {
    if (orientation == this.Orientation.VERTICAL) {
      this.top.removeClass('slider-top-section--horizontal').addClass('slider-top-section--vertical');
      this.bottom.removeClass('slider-bottom-section--horizontal').addClass('slider-bottom-section--vertical');
      this.handle.removeClass('slider-handle--horizontal').addClass('slider-handle--vertical');
    }
    else {
      this.top.removeClass('slider-top-section--vertical').addClass('slider-top-section--horizontal');
      this.bottom.removeClass('slider-bottom-section--vertical').addClass('slider-bottom-section--horizontal');
      this.handle.removeClass('slider-handle--vertical').addClass('slider-handle--horizontal');
    }
  },
*/
  handleSlideVertical: function () {
    var distY = parseInt(this.touchObj.clientY) - this.starty;
    var topNewHeight = this.topHeight + distY;
    if (topNewHeight > this.topMinimumHeight) {
      var topHeightPercentage = (topNewHeight / this.containerHeight) * 100;
      this.top.outerHeight((topHeightPercentage  + "%"));
      this.bottom.outerHeight((100 - topHeightPercentage) + "%");
    }
  }
}

$(document).ready(function () {
  SplitSlider.init();
});
