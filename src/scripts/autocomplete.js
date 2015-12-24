(function ($) {
   if (!window.google) {
      throw new Error("Google places not found. Bailing");
      return;
   }

   var defaults = {
      delay: 3
   };

   var service = new google.maps.places.AutocompleteService();

   $('.js-autocomplete').each(function () {

      var $autocomplete = $(this),
         $input = $autocomplete.find('input'),
         $favIcons = $autocomplete.find('.fav-icon'),
         $clearButton = $autocomplete.find('.js-clear'),
         $dropdown = $autocomplete.find('.js-dropdown'),
         $dropdownToggle = $autocomplete.find('.js-dropdown-toggle');

      $input.on('input', function () {
         var inputLength = $input.val().length;
         openDropdown();
         if (inputLength >= defaults.delay) {
            service.getPlacePredictions({ input: this.value, types: ["(regions)"] }, placesCB);
            showDropdownSection('.js-places-results');
         }
         else if (inputLength === 0) {
            showDropdownSection('.js-recent');
         }
         else {
            hideDropdownSections();
         }
         inputLength > 0 ? showIcon('.js-remove') : showIcon('.js-logged-out');
         
         /*
         When the user gives focus to the input box, select all of the text so the user can overwrite their entry by typing.
         */
      }).on('focus', function () {
         $input.select();
         $input.one('mouseup.mouseupSelect', function () {
            $input.select();
            return false;
         }).one('mousedown', function () {
            // compensate for untriggered 'mouseup' caused by focus via tab
            $input.off('mouseup.mouseupSelect');
         }).select();
      });

      $clearButton.click(function () {
         $input.val('');
         $input.trigger('input');
         $input.focus();
         $dropdown.trigger('click.bs.dropdown');
      });
      
      $dropdown.on('click', 'a', function() {
         $input.val($(this).html());
      });
      
      $favIcons.siblings('.fav-icon-unfilled').click(function() {
         showDropdownSection('.js-favorites');
         showIcon('.js-logged-in');
      });
      $dropdown.on('hide.bs.dropdown', function() { 
           showDropdownSection('.js-recent');
           $input.val().length > 0 ? showIcon('.js-remove') : showIcon('.js-logged-out');
      });
      function hideDropdownSections() {
         $dropdown.find('.dropdown-menu').addClass('hidden');
      }
      function showIcon(selector) {
         $favIcons.addClass('hidden');
         $favIcons.siblings(selector).removeClass('hidden');
      }
      function openDropdown() {
         if (isDropdownOpen()) {
            return false;
         }
         $dropdownToggle.dropdown('toggle');
      }
      function closeDropdown() {
            if (!isDropdownOpen()) {
                  return false;
            }
            $dropdownToggle.dropdown('toggle');
      }
      function isDropdownOpen() {
         return $dropdown.hasClass('open');
      }

      function showDropdownSection(selector) {
         $dropdown.find('.dropdown-menu').addClass('hidden');
         $dropdown.find(selector).removeClass('hidden');
      }

      function placesCB(predictions, status) {
            var serviceStatus = google.maps.places.PlacesServiceStatus;
            switch (status) {
                  case serviceStatus.OK: {
                        updateResults(predictions);
                        break;
                  }
                  case serviceStatus.ZERO_RESULTS: {
                        $dropdown.find('.js-places-results').html('<li class="disabled"><a>No places found for the term ' 
                              + $input.val() + '</a></li>');
                  }
                  default: {
                        throw new Error("Error occured in retrieving places");
                  }
            }
      }

      function updateResults(results) {
         var html = "";

         $.each(results, function (index, result) {
            console.log(result);
            html += "<li><a class='u-ellipsis' href='#'>" + result.description + "</a></li>";
         });

         $dropdown.find('.js-places-results').html(html);
      }
   });

})(jQuery);