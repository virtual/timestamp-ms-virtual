$(function() {
console.log('hello world :o');

var time = {};

function 
checkType(input) {
  console.log(typeof(input));
  if (isNaN(input)) {
    time.natural = input;
    time.unix = printUnix(input);
  } else if (typeof(input) === 'string') {
    time.unix = parseInt(input);
    time.natural = printNatural(input);
  } else {
    time.unix = null;
    time.natural = null; 
  }
}

function printNatural(unix) {
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var myDate = new Date(unix * 1000); 
  return months[(myDate.getMonth() )] + " " + myDate.getDay() + ", " + myDate.getFullYear();
}

function printUnix(natural) {
  var myDate = new Date(natural); 
  return myDate.getTime() / 1000;
}

function printBoth(obj) {
  return "<dl><dt>Natural:</dt><dd>" + obj.natural + "</dd><dt>" + "Unix: </dt><dd>" + obj.unix + "</dd></dl>";
}

$('form').submit(function(event) {
  event.preventDefault();
  var timestamp = $('input').val();
  timestamp = checkType(timestamp);
  $.post('/timestamp?' + $.param({timestamp: time}), function() {
    console.log(time);
    $('#timestamp').html(printBoth(time)); 
    $('input').val('');
    $('input').focus();
    });
  });
});
