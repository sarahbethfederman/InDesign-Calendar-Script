/*
* InDesign Academic Weekly Calendar Script
* by Sarah Federman
* Notes:
* - add leapyear boolean eventually
* - switch back to indesign object model
*/

var monthsList = ["August", "September", "October", "November", "December", "January", "March", "February", "April", "May", "June", "July"];

var days = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = {};

var Month = function(document) {

  function Month (name, startDay, dayCount) {
    this.name = name;
    this.startDay = startDay;
    this.dayCount = dayCount;
    this.populate();
  }

  Month.prototype.populate = function() {
    var day = days.indexOf(this.startDay),
        date,
        weekStart;

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
  var dayStart = days.indexOf("Friday");  // August starts on Friday
  var dayCount;

  for (var i = 0; i < monthsList.length; i++) {
    month = monthsList[i];
    dayCount = findDayCount(month);

    months[monthsList[i]] = new Month(month, days[dayStart], dayCount);

    console.log(months[monthsList[i]]);

    dayStart = (dayStart + dayCount) % 7;
  }
};

window.onload = init;
