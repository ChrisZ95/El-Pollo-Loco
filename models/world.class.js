/**
 * Represents the game world.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthBar = new endbossHealthBar();
    ThrowableObjects = [];

    /**
     * Constructs a new World.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard object for handling input.
     */
    constructor(canvas, keyboard) {
       this.ctx = canvas.getContext('2d');
       this.canvas = canvas;
       this.keyboard = keyboard;
       this.draw(); 
       this.setWorld();
       this.run();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the game loop.
     */
    run() {
        setInterval(() => {
            this.checkCollisionWithChicken();
            this.checkCollisionWithSmallChicken();
            this.checkCollisionWithCoins();
            this.checkCollisionWithBottles();
            this.checkCollisionWithEndboss();
            this.checkCollisionChickenWithBottle();
            this.checkCollisionSmallChickenWithBottle();
            this.checkCollisionEndbossWithBottle();
            this.checkThrowObjects();
        }, 50);
    }

    /**
     * Checks for throw objects from the character.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottleDepot > 0 && !this.character.isThrowingBottle) { 
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObjects.push(bottle);
            this.character.bottleDepot--; 
            this.bottleBar.setBottleAmount(this.character.bottleDepot);
            this.character.isThrowingBottle = true; 
            setTimeout(() => {
                this.character.isThrowingBottle = false; 
            }, 1000); 
        }
    }

    /**
     * Checks collision between the character and chickens.
     */
    checkCollisionWithChicken() {
        console.log(this.character.y)
        for (let i = 0; i < this.level.chickens.length; i++) {
            let chicken = this.level.chickens[i];
            if(this.character.isColliding(chicken) && this.character.speedY < 0 && this.character.isAboveGround()) {
                chicken.chickenIsDead();
                this.character.jumpOnChicken();
            } if(this.character.isColliding(chicken) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
        };
    }

    /**
    * Checks collision with the end boss.
    */
    checkCollisionWithEndboss() {
        for (let i = 0; i < this.level.endboss.length; i++) {
            let endboss = this.level.endboss[0];
            if(this.character.isColliding(endboss)) {
                this.character.endbossHit();
                this.healthBar.setPercentage(this.character.energy);
            }
        };
    }

    /**
     * Checks collision with small chickens.
     */
    checkCollisionWithSmallChicken() {
        for (let i = 0; i < this.level.smallchickens.length; i++) {
            let smallchicken = this.level.smallchickens[i];
            if(this.character.isColliding(smallchicken) && this.character.isAboveGround() && this.character.speedY < 0) {
                smallchicken.chickenIsDead();
                this.character.jumpOnChicken();
            } if(this.character.isColliding(smallchicken) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
        };
    }

    /**
     * Checks collision with coins.
     */
    checkCollisionWithCoins() {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                i--;
                this.character.collectCoin();
                this.coinBar.setCoinAmount(this.character.coinDepot);
            }
        }
    }

    /**
     * Checks collision with bottles.
     */
    checkCollisionWithBottles() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottle = this.level.bottles[i];
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                i--;
                this.character.collectBottle();
                this.bottleBar.setBottleAmount(this.character.bottleDepot);
            }
        }
    }

    /**
     * Checks collision between chickens and thrown bottles.
     */
    checkCollisionChickenWithBottle() {
        for (let i = 0; i < this.level.chickens.length; i++) {
            for (let j = 0; j < this.ThrowableObjects.length; j++) {
                let chicken = this.level.chickens[i];
                let bottle = this.ThrowableObjects[j];
                if (chicken.isColliding(bottle)) {
                    chicken.chickenIsDead();
                }
            }
        }
    }

    /**
     * Checks collision between small chickens and thrown bottles.
     */
    checkCollisionSmallChickenWithBottle() {
        for (let i = 0; i < this.level.smallchickens.length; i++) {
            for (let j = 0; j < this.ThrowableObjects.length; j++) {
                let smallchicken = this.level.smallchickens[i];
                let bottle = this.ThrowableObjects[j];
                if (smallchicken.isColliding(bottle)) {
                    smallchicken.chickenIsDead();
                }
            }
        }
    }

    /**
    * Checks collision between end boss and thrown bottles.
    */
    checkCollisionEndbossWithBottle() {
        for (let i = 0; i < this.ThrowableObjects.length; i++) {
            let bottle = this.ThrowableObjects[i];
            if (this.level.endboss.length > 0 && this.level.endboss[0].isColliding(bottle)) {
                this.level.endboss[0].endbossHit();
                this.ThrowableObjects.splice(i, 1);
                i--; 
                this.endbossHealthBar.setEndbossHealth(this.level.endboss[0].endbossEnergy);
            }
        }
    }

    /**
    * Draws the game elements on the canvas.
    */
    draw() {
        this.clearCanvas();
        this.translateCamera();
        this.drawBackgroundObjects();
        this.translateCameraBack();
        this.drawHUD();
        this.translateCamera();
        this.drawCharacterAndObjects();
        this.translateCameraBack();
        this.requestNextAnimationFrame();
    }
    
    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    /**
     * Translates the camera.
     */
    translateCamera() {
        this.ctx.translate(this.camera_x, 0);
    }
    
    /**
    * Translates the camera back.
    */
    translateCameraBack() {
        this.ctx.translate(-this.camera_x, 0);
    }
    
    /**
    * Draws background objects.
    */
    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }
    
    /**
     * Draws the game bars.
     */
    drawHUD() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossHealthBar);
    }
    
    /**
     * Draws the character and other game objects.
     */
    drawCharacterAndObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.chickens);
        this.addObjectsToMap(this.level.smallchickens);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.ThrowableObjects);
    }
    
    /**
    * Requests the next animation frame.
    */
    requestNextAnimationFrame() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds objects to the map for rendering.
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the map for rendering.
     * @param {DrawableObject} mo - The drawable object to add to the map.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the image horizontally.
    * @param {DrawableObject} mo - The drawable object to flip.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); 
        this.ctx.scale(-1, 1); 
        mo.x = mo.x * -1;
    }

    /**
    * Flips the image back to its original orientation.
    * @param {DrawableObject} mo - The drawable object to flip back.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}