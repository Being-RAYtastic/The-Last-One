// Class


class Sprite {
    constructor({
        position, 
        ImageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = { x:0, y:0}
    }) {
        this.position = position;
        this.height = 150;
        this.width = 50;

        this.image = new Image();
        this.image.src = ImageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0     // means static
        this.framesElapsed = 0;
        this.framesHold = 5;    // The lower the value, the faster the animation
        this.offset = offset;
    }
    

    draw() {
        c.drawImage(
            this.image,                     // Image File
            this.framesCurrent * (this.image.width / this.framesMax),  // From where the Cropping Starts x-axis
            0,                              // From where the Cropping Starts y-axis
            this.image.width / this.framesMax,  // The end position of the cropping x-axis
            this.image.height,                  // The end position of the cropping x-axis

            this.position.x - this.offset.x,    // Image's start location x-axis
            this.position.y - this.offset.y,    // Image's start location y-axis
            (this.image.width / this.framesMax) * this.scale ,      // Image's end x-axis
            this.image.height * this.scale       // Image's end y-axis
        );
    }


    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {       // means remainder 0
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            }
            else {
                this.framesCurrent = 0;
            }
        }    
    }

    update() {
        this.draw();
        this.animateFrames();
    }

}


class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color, 
        ImageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = { x:0, y:0 },
        sprites
    }) {
        
        super({position, ImageSrc, scale, framesMax, offset})

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
            offset:{
                x:0,
                y:0
            },
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0     // means static
        this.framesElapsed = 0;
        this.framesHold = 5;    // The lower the value, the faster the animation
        this.offset = offset;
        this.sprites = sprites


        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].ImageSrc;
        }
    }


    update() {
        this.draw();
        this.animateFrames();
        // AttackBox position updates
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        // Defining how a player would move
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;       // means "this.position.y += 10  ===  this.position.y = this.position.y + 10;"   // This causes the object to fall down below canvas 
    
        // to stop sprites falling down below the canvas
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
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







