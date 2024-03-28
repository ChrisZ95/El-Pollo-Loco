/**
 * Represents a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    coinDepot = 0;
    bottleDepot = 0;
    lastHit = 0;

    /**
     * Applies gravity to the movable object.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                world.character.y = 192.5;
            } 
            
        }, 1000 / 25);
    }

    /**
     * Checks if the movable object is above the ground.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 192.5;
        }
    }

    /**
     * Checks if the movable object is colliding with another object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} - True if a collision is detected, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

     /**
     * Collects a coin.
     */
    collectCoin() {
        this.coinDepot += 1;
    }

    /**
     * Collects a bottle.
     */
    collectBottle() {
        this.bottleDepot += 1;
    }

    /**
     * Checks if the movable object is hurt.
     * @returns {boolean} - True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000 
        return timepassed < 1;
    }

    /**
     * Checks if the movable object is dead.
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the endboss is dead.
     * @returns {boolean} - True if the endboss is dead, false otherwise.
     */
    endbossIsDead() {
        return this.endbossEnergy == 0;
    }

    /**
     * Plays animation by changing the current image.
     * @param {Array} images - The array of images for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;  
    }

    /**
     * Moves the movable object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the movable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }
}