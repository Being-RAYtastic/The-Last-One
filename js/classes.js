// Class
class Sprite {
    constructor({position, ImageSrc, scale = 1, framesMax = 1}) {
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
    }
    

    draw() {
        c.drawImage(
            this.image,                     // Image File
            this.framesCurrent * (this.image.width / this.framesMax),  // From where the Cropping Starts x-axis
            0,                              // From where the Cropping Starts y-axis
            this.image.width / this.framesMax,  // The end position of the cropping x-axis
            this.image.height,                  // The end position of the cropping x-axis

            this.position.x,    // Image's start location x-axis
            this.position.y,    // Image's start location y-axis
            (this.image.width / this.framesMax) * this.scale ,      // Image's end x-axis
            this.image.height * this.scale       // Image's end y-axis
            );
    }

    update() {
        this.draw();

        // animating shop
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

}


class Fighter {
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