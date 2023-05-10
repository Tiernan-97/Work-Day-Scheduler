var options = {
  startHour: 9,
  endHour: 24
};

function updateTimeSlots() {
  var currentHour = dayjs().hour();
  console.log(currentHour);

  $('.time-block').each(function (index, element) {

    var hour = $(element).attr('data-hour');

    if (hour < currentHour) {
      $(element).find('.description').addClass('past');
    } else if (hour === currentHour) {
      $(element).find('.description').addClass('present');
    } else {
      $(element).find('.description').addClass('future');
    }
  });
};
  

function onSave(e) {
  var hour = $(e.target).parent().parent().attr('data-hour');
  var task = $(e.target).parent().prev().children().val();

  localStorage.setItem(hour, task);
  console.log('saved successfully');
}

function generateTimeSlots() {
   for (hour = options.startHour; hour<= options.endHour; hour++) {
    var savedTask = localStorage.getItem(hour) || '';
    var html = `<div class="row" data-hour="${hour}">
                <div class="col-sm-2 hour">${hour}</div>
                <div class="col-sm-8 row past">
                  <textarea class="col-md-10 description">${savedTask}</textarea>
                </div>
                <div class="col-sm-2">
                  <button class="btn btn-primary saveBtn">Save</button>
                </div>
              `
              $('.container').append(html);
   }
}

function init() {
  generateTimeSlots();

  updateTimeSlots();

  $('.saveBtn').on('click',onSave);

  setInterval(function () {
    $('#currentDay').text(dayjs().format('dddd, MMM D, YYYY, hh:mm:ss a'));
  }, 10);

  setInterval( function () {
    updateTimeSlots();
  }, 600000)
}

init();
 




