$(function() {
  console.log('hello world :o');
  var time = {
    unix: null,
    natural: null
  };

  function setNull() {
    time.natural = null;
    time.unix = null;
  }

  function
  checkType(input) {
    if (input) { 
      if (isNaN(input)) { // input is a string (natural)
        if (!isNaN(printUnix(input))) { // unix function returns a number
          console.log(typeof(printUnix(input)));
          time.natural = input;
          time.unix = printUnix(input);
        } else {
          setNull();
        }
      } else if (typeof(input) === 'string') { // input s a string (unix)
        if (printNatural(input) !== null) {
          time.unix = parseInt(input);
          time.natural = printNatural(input);
        } else {
          setNull();
        }
      } else {
        setNull();
      }
    } else {
      setNull();
    }
  }

  function printNatural(unix) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var myDate = new Date(unix * 1000);
    console.log(myDate.getMonth());
    if (!isNaN(myDate.getMonth())) {
      return months[(myDate.getMonth())] + " " + myDate.getDate() + ", " + myDate.getFullYear();
    }
    console.log("unde")
    return null;
  }

  function printUnix(natural) {
    var myDate = new Date(natural);
    return myDate.getTime() / 1000;
  }

  function printBoth(obj) {
    if (obj.natural !== null && obj.unix !== null) {
      return "<dl><dt>Natural:</dt><dd>" + obj.natural + "</dd><dt>" + "Unix: </dt><dd>" + obj.unix + "</dd></dl>";
    } else {
      return "<p>Invalid input</p>"
    }
  }
  $('form').submit(function(event) {
    event.preventDefault();
    var timestamp = $('input').val();
    timestamp = checkType(timestamp);
    $.post('/timestamp?' + $.param({
      timestamp: time
    }), function() {
      console.log(time);
      $('#timestamp').html(printBoth(time));
      $('input').val('');
      $('input').focus();
    });
  });
});