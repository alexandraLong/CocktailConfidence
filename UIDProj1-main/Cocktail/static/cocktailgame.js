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
let images = [
    "https://www.nicepng.com/png/full/85-859751_orange-juice-bottle-clipart.png",
    "https://www.nicepng.com/png/full/174-1746111_clip-art-royalty-free-stock-collection-of-free.png",
    "https://www.nicepng.com/png/full/100-1000748_roses-sweetened-lime-juice.png",
    "https://www.nicepng.com/png/full/293-2939694_tonic-and-licorice-ledgers-tonic-water.png",
    "https://www.nicepng.com/png/full/67-678248_750-ml-agave-organic-nectar-monin-vanilla-syrup.png",
    "https://www.nicepng.com/png/full/849-8497547_camarena-silver-tequila-camarena-tequila.png",
    "https://www.nicepng.com/png/full/638-6385672_bombay-sapphire-london-dry-gin-bombay-sapphire-gin.png",
    "https://www.nicepng.com/png/full/21-219751_limes-wedges-cuts-chopped-wedge-of-lime.png",
    "https://www.nicepng.com/png/full/703-7037179_gabriel-boudier-bartender-curacao-triple-sec-liqueur.png",
    "https://www.nicepng.com/png/full/8-80183_cherry-free-download-png-red-cherries-fridge-magnet.png"
]
let items = [
    "orange",
    "grenadine",
    "limejuice",
    "tonic",
    "simple",
    "tequila",
    "gin",
    "lime",
    "triplesec",
    "cherry"
]

function makeDrag(items) {
    $(".leftside").empty()
    $(".rightside").empty()
    $(".leftT").empty()
    $(".leftM").empty()
    $(".leftB").empty()
    $(".rightT").empty()
    $(".rightM").empty()
    $(".rightB").empty()
    $(".leftside").append("<div class='row leftT'></div>")
    $(".leftside").append("<div class='row leftM'></div>")
    $(".leftside").append("<div class='row leftB'></div>")
    $(".rightside").append("<div class='row rightT'></div>")
    $(".rightside").append("<div class='row rightM'></div>")
    $(".rightside").append("<div class='row rightB'></div>")
    $(".leftT").append("<div class='leftside labelpad'>Orange Juice &nbsp;&nbsp;&nbsp; Grenadine</div>")
    $(".leftM").append("<div class='leftside labelpad'>Lime Juice</div>")
    $(".leftB").append("<div class='leftside labelpad'>Tonic Water &nbsp;&nbsp;&nbsp; Simple Syrup</div>")
    $(".rightT").append("<div class='rightside labelpad'>Tequila &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Gin</div>")
    $(".rightM").append("<div class='rightside labelpad limelabel'>Lime</div>")
    $(".rightB").append("<div class=' labelpad'>Triple Sec &nbsp;&nbsp;&nbsp;&nbsp; Cherry</div>")
   

    $.each(items, function(key, value) {
        $("." + value).hover(function() {
            $(this).draggable({revert: "valid"})
        })
        console.log(key)
        if (key < 2) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".leftT").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key == 2) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".leftM").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key > 2 && key < 5) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".leftB").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key > 4 && key < 7) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".rightT").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key == 7) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".rightM").append(elem)
            elem.draggable({revert: "invalid"})
        } else if (key > 7 && key < 10) {
            let elem = $("<img class="+value+" id="+value+" src='"+images[key]+"' alt='"+value+"'>")
            $(".rightB").append(elem)
            elem.draggable({revert: "invalid"})
        }
    })
}
let tequilasunrise = {
    "orange": 4,
    "tequila": 1,
    "grenadine": 3,
    "cherry": 5
}
let answer;
let dragged;
$(document).ready(function() {
    let drink = 0;
    $('.js-timeout').text("2:00");
    countdown();
    makeDrag(items);
    $('.beaker').droppable({
        drop: function(event,ui) {
            dialog.dialog("open");
            dragged = $(ui.draggable).attr("id")
        }
    });
    if (top.location.pathname === '/cocktailgame/tequilasunrise') {
        drink = 0;
    }
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 150,
        width: 350,
        buttons: {
            "Yes": function(e) {
                console.log("Pressed Yes!");
                answer = $("#permit option:selected").val();  
                if (drink == 0) {
                    if (tequilasunrise[dragged] == answer) {
                        console.log("yay")
                        alert("Correct!")
                    }
                    else if (dragged in tequilasunrise) {
                        alert(dragged+" is in the drink, but that's not the right amount!")
                    }
                    else {
                        alert("Sorry, that ingredient is not in the drink!")
                    }
                }            
                console.log(answer)
                $(this).dialog("close");
                makeDrag(items);
            },
            Cancel: function() {
                $(this).dialog("close");
                makeDrag(items);
            }
        }
    });
})

