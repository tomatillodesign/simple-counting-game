/********************************
 * Simple Counting Game
 *
 *******************************/




// Setup the Cash to Start
var cash = 500;


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
     console.log(pointArray);

     return randomNumber;

}


// Custom Function to get Point Totals out of array
var pointTotal = 0;
function addPoints( pointArray ) {

     pointTotal = 0;

     for(i = 0; i < pointArray.length; i++) {
          pointTotal += pointArray[i];
     }

     console.log(pointTotal);
     return pointTotal;
}


var gameOver = function() {
     document.getElementById("game-action").innerHTML = '';
     document.getElementById("next-round-button").style.display="none";
     document.getElementById("play-now-button").style.display="none";
     document.getElementById("cash-out-button").style.display="none";
     document.getElementById("the-bet").style.display="none";
     document.getElementById("cash").innerHTML = '<strong>You have lost everything :( GAME OVER</strong>';
}


/********************************
 * Take a Turn
 *
 *******************************/

var takeTurn = function() {

     // Hide Action Buttons Until the Bet is Placed
     document.getElementById("play-now-button").style.display="none";
     document.getElementById("cash-out-button").style.display="none";
     document.getElementById("next-round-button").style.display="none";

     document.getElementById("cash").innerHTML = 'Your Cash: $' + cash;

     // Set default bet amount, can be changed by user
     betAmountDefault = document.getElementById( 'bet-amount' );
     betAmountDefault.value = 100;

     var placeBet = document.getElementById("the-bet");
     placeBet.addEventListener( 'submit', returnBetAmount, false );

     function returnBetAmount(e) {
          event.preventDefault();
          betAmount = document.getElementById( 'bet-amount' );
          bet = betAmount.value;

          //Hide the bet amount form
          placeBet.style.display="none";
          document.getElementById("cash").innerHTML += '<br/>Your Bet: $' + bet;

          // Validate that bet is not more than cash
                    if(bet > cash) {
                       alert("You cannot bet more money than you have!");
                       return false;
                    }

          console.log('placeBet: ' + bet);

          document.getElementById("play-now-button").style.display="inline-block";
          document.getElementById("cash-out-button").style.display="inline-block";

     }




     var playNowButton = document.getElementById("play-now-button");
     playNowButton.addEventListener( 'click', playNow, false );

     function playNow(e) {
          event.preventDefault();

          var points = playHand();

          console.log('Your Points: ' + points);
          document.getElementById("game-action").innerHTML += points + '<br/>';



     }



     var cashOutButton = document.getElementById("cash-out-button");
     cashOutButton.addEventListener( 'click', cashOut, false );

     function cashOut( event ) {
          event.preventDefault();
          document.getElementById("play-now-button").style.display="none";
          document.getElementById("cash-out-button").style.display="none";
          document.getElementById("next-round-button").style.display="inline-block";

          var total = addPoints( pointArray );

          console.log('TOTAL: ' + total);
          document.getElementById("game-action").innerHTML += '<strong>TOTAL: ' + total + '</strong>';


          // Check for a winner
          if(total > 100) {

               var winnings = bet * 2;
               cash += winnings;
               document.getElementById("game-action").innerHTML += '<br/><strong>You won $' + winnings + '!</strong>';
               document.getElementById("cash").innerHTML = 'Your Cash: $' + cash;

          } else {

               var losses = bet;
               cash -= losses;
               document.getElementById("game-action").innerHTML += '<br/><strong>You lost $' + losses + '.</strong>';
               document.getElementById("cash").innerHTML = 'Your Cash: $' + cash;

               if( cash < 10 ) {
                    console.log('GAME OVER');
                    gameOver();

                    window.location.reload(true);

               }

          }

     }


     var nextRoundButton = document.getElementById("next-round-button");
     nextRoundButton.addEventListener( 'click', nextRound, false );

     function nextRound( event ) {
          event.preventDefault();

          // Reset Everything
          document.getElementById("game-action").innerHTML = '';
          document.getElementById("next-round-button").style.display="none";
          placeBet.style.display="block";
          pointArray = [];
          total = 0;

     }


}

if( cash > 0 ) {
     takeTurn();
     console.log('TAKE TURN');
}
//  else {
//      console.log('GAME OVER');
//      gameOver();
// }
