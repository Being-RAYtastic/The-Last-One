
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
    ImageSrc: 'assets/background.png'
});

const shop = new Sprite({
    position:{
        x:600,
        y:128
    },
    ImageSrc: 'assets/shop.png',
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
    },

    offset:{
        x:200,
        y:157
    },

    ImageSrc: 'assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale:2.5,

    sprites:{
        idle:{
            ImageSrc: 'assets/samuraiMack/Idle.png',
            framesMax:8
        },
        run:{
            ImageSrc: 'assets/samuraiMack/Run.png',
            framesMax:8,
        },
        jump:{
            ImageSrc: 'assets/samuraiMack/Jump.png',
            framesMax:2,
        },
        fall:{
            ImageSrc: 'assets/samuraiMack/Fall.png',
            framesMax:2,
        },
        attack1:{
            ImageSrc: 'assets/samuraiMack/Attack1.png',
            framesMax:6,
        }
    },

    attackBox:{
        offset:{
            x:100,
            y:50
        },
        width:155,
        height:50
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
        x:200,
        y:167
    },

    ImageSrc: 'assets/kenji/Idle.png',
    framesMax: 4,
    scale:2.5,

    sprites:{
        idle:{
            ImageSrc: 'assets/kenji/Idle.png',
            framesMax:4
        },
        run:{
            ImageSrc: 'assets/kenji/Run.png',
            framesMax:8,
        },
        jump:{
            ImageSrc: 'assets/kenji/Jump.png',
            framesMax:2,
        },
        fall:{
            ImageSrc: 'assets/kenji/Fall.png',
            framesMax:2,
        },
        attack1:{
            ImageSrc: 'assets/kenji/Attack1.png',
            framesMax:4,
        },
        takeHit:{
            ImageSrc: 'assests/kenji/Take Hit.png',
            framesMax:3,
        }
    },

    attackBox:{
        offset:{
            x:-155,
            y:50
        },
        width:155,
        height:50
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
        player.switchSprite('run');
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else {
        player.switchSprite('idle');
    }

    // Jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }



    // Enemey
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else {
        enemy.switchSprite('idle');
    }

        // Jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }


    // Detect for Collisions

     // Player Collision
    if (
        rectangularCollisions({
            rectangle1: player,
            rectangle2: enemy
        })
        && player.isAttacking && player.framesCurrent == 4
    )   {
        player.isAttacking = false;
        // console.log('Collision');
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

        // if player misses
    if (player.isAttacking && player.framesCurrent == 4) {
        player.isAttacking = false;
    }

     // Enemy Collision
     if (
        rectangularCollisions({
            rectangle1: enemy,
            rectangle2: player
        })
        && enemy.isAttacking && enemy.framesCurrent == 2
    )   {
        enemy.isAttacking = false;
        // console.log('Collision');
        player.health -= 20
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }

        // if player misses
    if (enemy.isAttacking && enemy.framesCurrent == 2) {
        enemy.isAttacking = false;
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