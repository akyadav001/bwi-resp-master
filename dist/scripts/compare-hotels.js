'use strict';

var compare = {
  init: function () {
    this.amenities = $('.js-amenities');
    this.compareAreaContainer = $('.compare-row');
    this.compareArea = $('.compare-row > div');
    this.images = $('.image-list-img');
    this.columnControls = $('.js-compare-controls div');
    this.columnContainer = $('.js-hotel-columns');
    this.columnDetails = this.columnContainer.find('.js-hotel-column');
    this.columns = [];
    this.numberSelected = 0;
    this.compareArea.height(this.compareAreaContainer[0].scrollHeight);
    this.hammertime = this.images.hammer();
    this.setEqualHeight(this.amenities);
    this.setCompareRowHeight();
    this.bindEvents();
    this.bindColumns();
  },

  bindEvents: function () {
    this.amenities.on('slid.bs.carousel', function () {
      this.setEqualHeight(this.amenities);
      this.setCompareRowHeight();
    }.bind(this));

    this.hammertime.on("press", function (evt) {
      if (compare.numberSelected <= compare.columns.length - 1 && !$(evt.target).hasClass('is-selected')) {
        compare.addHotel($(this));
      }
    });
    $('.js-compare-controls').on('click', '.js-close', function () {
      compare.removeHotel($(this).data('column'));
    });
    this.compareAreaContainer.on('bw.compare.update', function() {
      $(this).find('.instructions').removeClass('active').filter(':visible:first').addClass('active');
      compare.compareArea.height(compare.compareAreaContainer[0].scrollHeight);
      compare.setEqualHeight(compare.amenities);
    });
  },
  setEqualHeight: function ($elements) {
    $elements.css('height', '');
    $elements.each(function () {
      var maxHeight = Math.max.apply(Math, $elements.map(function () {
        return $(this).height();
      }).get());
      $elements.height(maxHeight);
    });
  },

  setCompareRowHeight: function () {
    this.compareArea.css('height', '');
    this.compareArea.height(this.compareArea.height(this.compareAreaContainer[0].scrollHeight));
  },

  addHotel: function ($element) {
    var column,
      columnNumber;
    $element.addClass('is-selected');
    $.each(this.columns, function (index, el) {
      if (!el.active) {
        column = el;
        columnNumber = index;
        return false;
      }
    });
    column.instructions.addClass('hidden');
    column.control.removeClass('invisible');
    column.details.removeClass('hidden');
    column.active = true;
    column.associatedHotel = $element;

    this.numberSelected++;
    this.compareAreaContainer.trigger('bw.compare.update');
  },

  removeHotel: function (columnNumber) {
    var column = this.columns[columnNumber - 1];

    column.instructions.removeClass('hidden');
    column.control.addClass('invisible');
    column.details.addClass('hidden');
    column.active = false;
    column.associatedHotel.removeClass('is-selected');
    column.associatedHotel = '';
    this.numberSelected--;
    this.compareAreaContainer.trigger('bw.compare.update');
  },
  bindColumns: function () {
    this.columnDetails.each(function (index, el) {
      var hotel = {
        active: false,
        control: compare.columnControls.eq(index),
        details: $(el),
        instructions: $(el).siblings('.js-instructions'),
        associatedHotel: ''
      };
      compare.columns.push(hotel);
    });
  }
};

(function () {
$('.js-carousel').on('swiperight',function () {
  $(this).carousel('prev');
}).on('swipeleft', function () {
  $(this).carousel('next');
});

compare.init()

})();
