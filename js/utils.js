// Other Supporting Functionss
function rectangularCollisions({rectangle1, rectangle2}){
    return(
       rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x    // means left side of the Enemy
       &&
       rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width               // means right side of the enemy
       &&
       rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y  && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height       // means Top side collision
    )
}


function determineWinner({player, enemy, timerID}) {
   const gameOverText = document.querySelector('#gameStatus');
   gameOverText.style.display = 'flex';
   clearTimeout(timerID);

   if (player.health == enemy.health) {
       gameOverText.innerHTML = 'Tie';
   }

   else if (player.health > enemy.health) {
       gameOverText.innerHTML = 'Player Wins'
   }

   else if (enemy.health >  player.health) {
       gameOverText.innerHTML = 'Enemy Wins';
   }
}

let timer = 60;
let timerID;
function decreaseTimer() {
   if (timer > 0) {                    //  Timer Functions
       timerID = setTimeout(decreaseTimer, 1000);
       timer--;        // -- means decreased by 1
       document.querySelector('#timer').innerHTML = timer;
   }

   
   if (timer === 0) {
       determineWinner({player, enemy, timerID})
   }
}