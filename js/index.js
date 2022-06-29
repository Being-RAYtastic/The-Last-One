const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas Settings
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = 0.7;    // Gravity

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    ImageSrc: '../assets/background.png'
});

const shop = new Sprite({
    position:{
        x:600,
        y:128
    },
    ImageSrc: '../assets/shop.png',
    scale: 2.75,
    framesMax: 6,
    framesCurrent:1
});

// Player Object
const player = new Fighter({
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
const enemy = new Fighter({
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


decreaseTimer();    // Make sure to call functions


// Main BG Function of the Game 
function animate() {
    window.requestAnimationFrame(animate);         // means FRAME OR FPS
    // console.log('Animating');    // Debugging Purpose
    
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);   // doing so so that sprites look individual

    
    // Rendering  Sprites and  Fighters
    background.update();    // Make sure to call updates so that they appear
    shop.update();
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