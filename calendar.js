/*
* InDesign Academic Weekly Calendar Script
* by Sarah Federman
* Notes:
* - add leapyear boolean eventually
* - switch back to indesign object model
*/

var monthsList = ["August", "September", "October", "November", "December", "January", "March", "February", "April", "May", "June", "July"];

var days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = {};  // associative array of month name to month object


// Month object
var Month = function(document) {

  // Constructor
  function Month (name, startDay, dayCount) {
    this.name = name;               // name of the month
    this.startDay = startDay;       // name of first day of the month (ex: August is Friday)
    this.dayCount = dayCount;       // total number of days in the month
    this.populate();
  }

  // Methods
  // Create the text frames
  Month.prototype.populate = function() {
    var day = days.indexOf(this.startDay),
        date;

    for (var i = 1; i < this.dayCount + 1; i++) {
      date = i + ": " + days[day];

      day = (day + 1) % 7;
    }
  }

  return Month;
}();


function findDayCount (month) {
  var dayCount;
  if (month === "February") {
    dayCount = 28;
  }
  else if (month != "September" && month != "April" && month != "June" && month != "November") {
    dayCount = 31;
  }
  else {
    dayCount = 30;
  }
  return dayCount;
}

function init() {
  var startDayIndex = days.indexOf("Friday"),  // August starts on Friday, index of Friday in days array
      dayCount,
      monthName;

  for (var i = 0; i < monthsList.length; i++) {
    monthName = monthsList[i];
    dayCount = findDayCount(month);

    // Fill the months associative array
    months[monthsList[i]] = new Month(monthName, days[startDayIndex], dayCount);

    console.log(months[monthsList[i]]);

    // Calculate next month's start day
    startDayIndex = (startDayIndex + dayCount) % 7;
  }
};

window.onload = init;
