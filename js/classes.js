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
        this.width = 150;

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
        sprites,
        attackBox = { offset:{}, width: undefined, height: undefined }
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
                y: this.position.y,
            } ,
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0     // means static
        this.framesElapsed = 0;
        this.framesHold = 5;    // The lower the value, the faster the animation
        this.offset = offset;
        this.sprites = sprites;
        this.dead = false;
        this.superAttack_Count = 0;
        this.dashAttack_activated = true
        


        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].ImageSrc;
        }
    }


    update() {
        this.draw();
        if (!this.dead) {
            this.animateFrames();
        }

        // AttackBox position updates
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // draw Attack Boxes // For debigging
        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        // Defining how a player would move
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;       // means "this.position.y += 10  ===  this.position.y = this.position.y + 10;"   // This causes the object to fall down below canvas 
    
        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;
        }
        else {
            this.velocity.y += gravity;
        }
    }

    attack() {
        this.switchSprite('attack1');
        attack_sound.play()
        this.isAttacking = true;
    }

    dashAttack() {
        if(this.dashAttack_activated) {
            this.attack()
            this.dashAttack_activated = false

            setTimeout(() => {
                this.dashAttack_activated = true
            }, 5000);
        }
    }
    
    superAttack() {
        if (this.superAttack_Count == 0) {
            
            this.switchSprite('super_attack');
            attack_sound.play()
            this.superActivated = true; 
            this.superAttack_Count++;
        }
        else {
            this.attack();
        }   
    }

    takeHit(healthReduced) {
        this.health -= healthReduced;

        if (this.health <= 0) {
            this.switchSprite('death');
        }
        else {
            this.switchSprite('takeHit');
        }

    }

    emotionalDamage() {
        //this.health -= 100;
        this.health = 0;

        emotional_damage_meme.play()

        const deathStatus = document.querySelector('#deathBy');
        deathStatus.style.display = 'flex';
        deathStatus.innerHTML = 'Emotional Damage !'
    }

    afterFightMechanics() {         // Will disbale AttackBox and  health wont decrease on attacking after battle is over
        this.attackBox.offset.x = undefined
        this.attackBox.offset.y = undefined
        this.attackBox.height = undefined
        this.attackBox.width = undefined
    }


    switchSprite(sprite) {
        // overriding all other animations 
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true
            }
            return
        }

        if (
            this.image === this.sprites.attack1.image
            &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1
        ) return       // Return means that we dont want to call the follwing code below

        if (
            this.image === this.sprites.super_attack.image
            &&
            this.framesCurrent < this.sprites.super_attack.framesMax - 1
        ) return       // Return means that we dont want to call the follwing code below

        if (
            this.image === this.sprites.takeHit.image 
            &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        ) return

        
        
        
        // normal animations
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
            break

            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
            break

            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image =  this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
            break

            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image =  this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
            break

            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image =  this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
            break

            case 'super_attack':
                if (this.image !== this.sprites.super_attack.image) {
                    this.image =  this.sprites.super_attack.image;
                    this.framesMax = this.sprites.super_attack.framesMax;
                    this.framesCurrent = 0;
                }
            break                

            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image =  this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 0;
                }
            break

            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image =  this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 0;
                }
            break
            
        }
    }
}







