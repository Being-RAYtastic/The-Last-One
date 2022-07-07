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
        player.afterFightMechanics();
        enemy.afterFightMechanics();
        gameOverText.innerHTML = 'Tie';
        
        background_music.pause();

        tie_sound.play();
        setTimeout(() => {
            game_over.play();
        }, 2800);
    }


   else if (player.health > enemy.health) {
        enemy.switchSprite('death');
        player.afterFightMechanics();
        enemy.afterFightMechanics();

        gameOverText.innerHTML = 'Player 1 Wins'

        background_music.pause();


        setTimeout(() => {
            game_over.play();
        }, 500);
    }

   else if (enemy.health > player.health) {
        player.switchSprite('death');
        enemy.afterFightMechanics();
        player.afterFightMechanics();

        gameOverText.innerHTML = 'Player 2 Wins';
        
        background_music.pause();
        
        setTimeout(() => {
            game_over.play();
        }, 500);
    }

    
}

let timer = 180;
let timerID;
function decreaseTimer() {
   if (timer > 0) {                    //  Timer Functions
       timerID = setTimeout(decreaseTimer, 1000);
       timer--;        // -- means decreased by 1
       document.querySelector('#timer').innerHTML = timer;
   }

   
   if (timer === 0) {
       determineWinner({player, enemy, timerID})

       const deathStatus = document.querySelector('#deathBy');
       deathStatus.style.display = 'flex';
       deathStatus.innerHTML = 'Time Out'
   }
}
