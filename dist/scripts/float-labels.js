(function($) { 


$(".form-control.-floating").bind("checkval", function() {
  var wrapper = $(this),
      control = wrapper.find('.form-control__input');

  control.val() == "" ? wrapper.addClass("-is-empty") : wrapper.removeClass("-is-empty");
})
.on("keyup",function() {
  $(this).trigger("checkval");
})
.trigger("checkval");

})(jQuery);