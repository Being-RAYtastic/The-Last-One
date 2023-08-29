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

    e:{
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


// Player Movements
window.addEventListener('keydown', (event)=>{
    console.log(event.key);

    if (!player.dead) {
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
                if (player.position.y > 100){
                    player.velocity.y = -15;
                    player.lastKey = 'w';
                }
                break

            case ' ':   // spacebar
                player.attack();
                break
            case 's':   // spacebar
                player.attack();
                break

            case 'e':
                player.superAttack();
                break
        }
    }

    if (!enemy.dead) {
        switch  (event.key) {
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
                if (enemy.position.y > 100) {
                    enemy.velocity.y = -15;
                    enemy.lastKey = 'ArrowUp';
                }
                break

            case 'ArrowDown':
                enemy.attack();
                break

            case 'Enter':
                enemy.superAttack();
                break
        }
    }

})

window.addEventListener('keyup', (event)=>{
    // console.log(event.key);

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