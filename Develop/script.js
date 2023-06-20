// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  var currentDate = dayjs().format('MMM D, YYYY');
  $('#currentDay').text(currentDate);
  

  $('#hour-9, #hour-10, #hour-11').remove();

  var startHour = 9;
  var endHour = 17;
  var currenthour = dayjs().hour() // everytime we want to get new hours or date or sec, we have to create a new day() function otherwise they dont know where to start the day from

  for (var i = startHour; i <= endHour; i++) {

    var block =$('<div>').addClass('row time-block').attr('id', 'hour-' + i); //setting up the row and timeblock inside div element, and each row will show the time frame by using for each
    var timeRow = $('<div>').addClass('col-2 col-md-1 hour text-center py-3'); //adding bootstrap's grid system on class and ante meridiem, 
    var textInside = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3); //styling the textarea, especially when using the Bootstrap framework, AND row 3 here is the height or how tall for the lines 
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save'); // save button
    var iconButton = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true').appendTo(saveButton); 


    if (i < currenthour) { 
      block.addClass('past');
    } else if (i === currenthour) {
      block.addClass('present');
    } else if (i > currenthour) {
      block.addClass('future');
    }

    if (i < 12) {
      timeRow.text(i + 'am');
    } else if (i === 12) {
      timeRow.text(i + 'pm');
    } else if (i > 12) {
      timeRow.text((i - 12) + 'pm'); 
    }

    block.append(timeRow, textInside, saveButton);
    $('.container-fluid').append(block);
  
    textInside.val(localStorage.getItem('hour-' + i));
    console.log(localStorage.getItem('hour-' + i));
    
    $('.saveBtn').on('click', function() {
      var text = $(this).siblings(textInside).val()
      var id = $(this).parents.attr('id')
      localStorage.getItems(text, id);

    })

  }
      
});

// TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
