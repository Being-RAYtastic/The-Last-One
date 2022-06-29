const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas Settings
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;    // Gravity
// Class
class Sprite {
    constructor({position, velocity, color, offset}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            } ,
            offset: offset,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
    }


    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // AttackBox
        if (this.isAttacking == true) {
            c.fillStyle = 'green';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update() {
        this.draw();

        // AttackBox position updates
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        // Defining how a player would move
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;       // means "this.position.y += 10  ===  this.position.y = this.position.y + 10;"   // This causes the object to fall down below canvas 
    
        // to stop sprites falling down below the canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(()=>{
            this.isAttacking = false;
        },100)
    }
}


// Player Object
const player = new Sprite({
    position:{
        x:0,
        y:0
    },

    velocity:{
        x:0,
        y:0
    },

    color: 'red',

    offset:{
        x:0,
        y:0
    }
})

// Enemy Object
const enemy = new Sprite({
    position:{
        x: 400,
        y: 100
    },

    velocity:{
        x:0,
        y:0
    },

    color: 'blue',

    offset:{
        x:-50,
        y:0
    }
})



player.draw();
enemy.draw();


// Keys
const keys = {
    a:{
        pressed: false
    },

    d:{
        pressed: false
    },

    w:{
        pressed: false
    },

    ArrowRight:{
        pressed:false
    },

    ArrowLeft:{
        pressed:false
    },

    ArrowUp:{
        pressed:false
    }
}

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
decreaseTimer();    // Make sure to call functions


// Main BG Function of the Game 
function animate() {
    window.requestAnimationFrame(animate);         // means FRAME OR FPS
    // console.log('Animating');    // Debugging Purpose
    
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);   // doing so so that sprites look individual

    player.update();
    enemy.update();


    // Default Value
    player.velocity.x = 0;  
    enemy.velocity.x = 0;    

    // Player
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }

    // Enemey
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }


    // Detect for Collisions

     // Player Collision
    if (
        rectangularCollisions({
            rectangle1: player,
            rectangle2: enemy
        })
        && player.isAttacking
    )   {
        player.isAttacking = false;
        // console.log('Collision');
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

     // Enemy Collision
     if (
        rectangularCollisions({
            rectangle1: enemy,
            rectangle2: player
        })
        && enemy.isAttacking
    )   {
        enemy.isAttacking = false;
        // console.log('Collision');
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }


    // Game Over according to healths or gets defeated
    if (enemy.health <= 0  ||  player.health <= 0) {
        determineWinner({player, enemy, timerID});
        window.removeEventListener('keydown', (event));
    }


}

animate()





// Character Moves

    // Player Movements
window.addEventListener('keydown', (event)=>{
    console.log(event.key);

    switch  (event.key) {

            // Player Keys
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break 
        
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break
        
        case 'w':
            player.velocity.y = -20;
            player.lastKey = 'w';
            break

        case ' ':   // spacebar
            player.attack();
            player.isAttacking =  true;
            break
    
            // Enemy Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break
        
        case 'ArrowUp':
            enemy.velocity.y = -20;
            enemy.lastKey = 'ArrowUp';
            break

        case 'ArrowDown':
            enemy.attack();
            enemy.isAttacking = true;
            break
    }
})

window.addEventListener('keyup', (event)=>{
    console.log(event.key);

    switch  (event.key) {

            // Player KeysUp
        case 'd':
            keys.d.pressed = false;
            break 
        
        case 'a':
            keys.a.pressed = false;
            break
        

            // Enemy KeysUP
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    }
})