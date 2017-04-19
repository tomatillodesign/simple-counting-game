/********************************
 * Simple Counting Game
 *
 *******************************/

var pointArray = [];

//Random Number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var playHand = function() {

     var randomNumber = getRandomInt(0,100);
     pointArray.push( randomNumber );
     return randomNumber;

}


// Custom Function to get Point Totals out of array
var pointTotal = 0;
function addPoints( pointArray ) {

     pointTotal = 0;

     for(i = 0; i < pointArray.length; i++) {
          pointTotal += pointArray[i].value;
     }

     return pointTotal;
}



var playNowButton = document.getElementById("play-now-button");
playNowButton.addEventListener( 'click', playNow, false );

function playNow( event ) {
     event.preventDefault();

     var points = playHand();

     console.log('Your Points: ' + points);
     document.getElementById("game-action").innerHTML += points + '<br/>';

     

}
