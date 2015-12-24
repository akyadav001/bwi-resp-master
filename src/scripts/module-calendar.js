/* global $ */
/* global moment */
'use strict';

//Cache the elements interacting with the calendar widget
var $calendarModal = $('#bw-calendar');
var $doneButton = $('#bw-calendar-done');
var $cancelButton = $('#bw-calendar-cancel');
var $calendarStayNights = $('#bw-calendar .bw-stay-nights');
var $stayDurationContainer = $('.bw-stay-nights');
var $stayStartDateContainer = $('#bw-stay-start-date');
var $stayEndDateContainer = $('#bw-stay-end-date');
var $stayNights = $('#bw-stay-nights');

$doneButton.click(function() {
   if (calendar.numberSelected === 1) {
      $calendarStayNights.text("Please select an end date").show().addClass("warning");
   }
   if(calendar.numberSelected === 2) {
      var firstDay = moment(calendar.firstStayDate);
      var lastDay = moment(calendar.lastStayDate);
      OutputDates($stayStartDateContainer, firstDay.format("dddd"), firstDay.format("LL"));
      OutputDates($stayEndDateContainer, lastDay.format("dddd"), lastDay.format("LL"));
      $stayNights.text(calendar.stayDuration.toString() + (calendar.stayDuration > 1 ? " Nights" : " Night"));
      $calendarModal.modal('hide');
   }
});

$cancelButton.click(function() {
   ResetCalendar();
});

function OutputDates($container, day,date) {
   $container.find(".bw-day-label").text(day);
   $container.find(".bw-date-label").text(date);
}

var calendar = {
   options: {
      months: 12
   },
   stayDates: [],
   clearDates: function() {
      this.stayDates.length = 0;
   },
   get numberSelected() {
      return this.stayDates.length;
   },
   get stayDuration() {
      if (this.numberSelected === 2) {
         return Math.abs(moment(calendar.stayDates[0]).diff(moment(calendar.stayDates[1]), 'days'));
      }
      else {
         return null;
      }
   },
   get firstStayDate() {
      if (this.numberSelected === 2) {
         var tmpStayDates = this.stayDates;
         tmpStayDates.sort(function(a , b) {
            return (new Date(a) > new Date(b)) ? 1 : -1;
         });
         return tmpStayDates[0];
      }
      return null;
   },
   get lastStayDate() {
      if (this.numberSelected === 2) {
         var tmpStayDates = this.stayDates;
         tmpStayDates.sort(function(a , b) {
            return (new Date(a) > new Date(b)) ? 1 : -1;
         });
         return tmpStayDates[1];
      }
      return null;
   }
};



$(document).ready(function() {
   OutputDates($stayStartDateContainer, moment().format("dddd"), moment().format("LL"));
   OutputDates($stayEndDateContainer, moment().add(1,'d').format("dddd"), moment().add(1, 'd').format("LL"));
   $stayNights.text("1 Night");

   //Once the document is loaded, generate the calendars and append them to the end of the calendar container.
   $(".bw-calendar-container").append(RenderCalendar());

   var $calendars = $('.calendar');
   $calendars.find("span[data-date='" + moment().format("YYYY-MM-DD") + "']:not('.after-current-month')").addClass("today");
   $calendars.on("click", ".week span:not('.after-current-month'):not('.indicator'):not('.previous-month-day')", function() {
      //If the user taps on a date that has previously been selected, reset the calendar.
      if ($(this).hasClass("selected")) {
         ResetCalendar();
      }
      if (calendar.numberSelected  === 0 ) {
         $(this).prepend("<span class='indicator indicator-left'></span>");
         AddToCalendar($(this));
         return true;
      }
      if (calendar.numberSelected === 1) {
         if (moment(calendar.stayDates[0]).isAfter($(this).data("date"), "d")) {
            ResetCalendar();
            AddToCalendar($(this));
            $(this).prepend("<span class='indicator indicator-left'></span>");
            return true;
         }
         else {
            AddToCalendar($(this));
            $(this).prepend("<span class='indicator indicator-right'></span>");
            var $selectableElements = $(".week span:not('.after-current-month')");
            var startingIndex = $selectableElements.index($('.indicator:first').parent());
            var endingIndex = $selectableElements.index($('.indicator:last').parent());
            $selectableElements.slice(startingIndex, endingIndex).addClass('selected');
            $calendarStayNights.removeClass("warning").show().text(calendar.stayDuration + " " +  (calendar.stayDuration > 1 ? " Nights" : " Night"));
            return true;
         }
      }

      if (calendar.numberSelected === 2) {
         ResetCalendar();
         AddToCalendar($(this));
         $(this).prepend("<span class='indicator indicator-left'></span>");
      }
   });
});

function AddToCalendar($elementToAdd) {
   calendar.stayDates.push($elementToAdd.data("date"));
   $elementToAdd.toggleClass("selected");
}
function ResetCalendar() {
   $('.selected').removeClass('selected').find('.indicator').remove();
   $calendarStayNights.hide();
   calendar.clearDates();
}
function RenderCalendar()
{
   var calendarHtml = "<div class='calendar'>";
   var monthIterator = 0;

   while (monthIterator <= calendar.options.months) {
      calendarHtml +=   RenderMonth(moment().add(monthIterator, 'M'));
      monthIterator++;
   }

   calendarHtml += "</div>";
   return calendarHtml;
}

function RenderMonth(monthToRender) {
   var dateOfMonth = moment(monthToRender);
   var weekdayNames = moment.weekdaysShort();
   var weekdayHtml = "";
  weekdayNames.forEach(function(val) {
  weekdayHtml += "<span>" + val + "</span>";
  });
   var monthHtml =  "<h1 class='header'>" +
                  dateOfMonth.format("MMMM YYYY") +
               "</h1>" +
               "<div class='calendar-week-days'>" +
               weekdayHtml +
                  "</div>" +
               "<div class='calendar-week-container'>";


   //If Sunday is not the beginning of the month, we need to render the previous month's last days on the calendar
   //being rendered.
   var offset = 0;
   var startRenderingFromDate = moment(monthToRender).startOf("month");


   if (moment(monthToRender).startOf("month").day() != 0)
   {
      //Retrieve the day index that the month begins on (eg. first of Janurary occurs on Thursday).
      //We will use this offset to calculate the day to begin rendering the 35 day calendar.
      offset = moment(monthToRender).startOf("month").day();
      //Since offset is 0 based, we need to add one to get the accurate number of days to subtract.

      startRenderingFromDate = moment(monthToRender).startOf("month").add(-offset,'d');
   }

   var endRenderingDate = moment(monthToRender).endOf("month");

   //Since difference is 0 based, we need to add one to get the accurate difference
   var difference = endRenderingDate.diff(startRenderingFromDate, "d");
   difference++;

   //Now divide by 7 to test if the calendar will render the full month. If there is a remainder, keep adding until we get a round number.
   while (difference % 7 != 0) {
      difference++;
   }

   var dayIterator = 0;
      while (dayIterator - difference != 0)
      {
         if (dayIterator % 7 == 0) {
            monthHtml += "<div class='week'>";
         }

         var styles = "";
         if (startRenderingFromDate.isBefore(moment(), 'd')) {
            styles = "class = 'previous-month-day'";
         }
         else if (monthToRender.month() != startRenderingFromDate.month() || startRenderingFromDate.isAfter(moment().add(350, 'd'))) {
            styles = "class = 'after-current-month'";
         }

         monthHtml += "<span data-date = " + startRenderingFromDate.format("YYYY-MM-DD") + " " + styles + ">" +
            startRenderingFromDate.date() + "</span>";
         startRenderingFromDate.add(1, 'd');
         dayIterator++;
         if (dayIterator % 7 == 0) {
            monthHtml += "</div>";
         }
      }
      monthHtml += "</div>";

   return monthHtml;
}
