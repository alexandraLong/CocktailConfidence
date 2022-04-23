let interval;

function countdown() {
  clearInterval(interval);
  interval = setInterval( function() {
      var timer = $('.js-timeout').html();
      timer = timer.split(':');
      var minutes = timer[0];
      var seconds = timer[1];
      seconds -= 1;
      if (minutes < 0) return;
      else if (seconds < 0 && minutes != 0) {
          minutes -= 1;
          seconds = 59;
      }
      else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

      $('.js-timeout').html(minutes + ':' + seconds);

      if (minutes == 0 && seconds == 0) clearInterval(interval);
  }, 1000);
}

$(document).ready(function() {
    $('.js-timeout').text("2:00");
    countdown();
    $('.orange').draggable({revert: "valid"});
    $('.grenadine').draggable({revert: "valid"});
    $('.limejuice').draggable({revert: "valid"});
    $('.tonic').draggable({revert: "valid"});
    $('.simple').draggable({revert: "valid"});
    $('.tequila').draggable({revert: "valid"});
    $('.gin').draggable({revert: "valid"});
    $('.lime').draggable({revert: "valid"});
    $('.triplesec').draggable({revert: "valid"});
    $('.cherry').draggable({revert: "valid"});

    $('.beaker').droppable({
        drop: function(event,ui) {
            dialog.dialog("open");
        }
    });
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 150,
        width: 350,
        buttons: {
            "Yes": function(e) {
                console.log("Pressed Yes!");
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
})

