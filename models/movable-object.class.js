class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    coinDepot = 0;
    bottleDepot = 0;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 180;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }

    collectCoin() {
        this.coinDepot += 1;
    }

    collectBottle() {
        this.bottleDepot += 1;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000 //Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    endbossIsDead() {
        return this.endbossEnergy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length // let i = 7 % 6; => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 6, 0, 1, ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;  
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}