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

    constructor(canvas, keyboard) {
       this.ctx = canvas.getContext('2d');
       this.canvas = canvas;
       this.keyboard = keyboard;
       this.draw(); 
       this.setWorld();
       this.run();
    }

    setWorld() {
        this.character.world = this;
    }

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

    checkThrowObjects() {
        if(this.keyboard.D && this.character.bottleDepot > 0) { 
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObjects.push(bottle);
            this.character.bottleDepot--; 
            this.bottleBar.setBottleAmount(this.character.bottleDepot);
        }
    }

    checkCollisionWithChicken() {
        for (let i = 0; i < this.level.chickens.length; i++) {
            let chicken = this.level.chickens[i];
            if(this.character.isColliding(chicken) && this.character.isAboveGround()) {
                chicken.chickenIsDead();
                this.character.jump();
            } if(this.character.isColliding(chicken) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
        };
    }

    checkCollisionWithEndboss() {
        for (let i = 0; i < this.level.endboss.length; i++) {
            let endboss = this.level.endboss[0];
            if(this.character.isColliding(endboss)) {
                this.character.endbossHit();
                this.healthBar.setPercentage(this.character.energy);
            }
        };
    }

    checkCollisionWithSmallChicken() {
        for (let i = 0; i < this.level.smallchickens.length; i++) {
            let smallchicken = this.level.smallchickens[i];
            if(this.character.isColliding(smallchicken) && this.character.isAboveGround()) {
                smallchicken.chickenIsDead();
                this.character.jump();
            } if(this.character.isColliding(smallchicken) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
        };
    }

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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects); 

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossHealthBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character); 
        this.addObjectsToMap(this.level.clouds); 
        this.addObjectsToMap(this.level.chickens);
        this.addObjectsToMap(this.level.smallchickens);
        this.addObjectsToMap(this.level.endboss); 
        this.addObjectsToMap(this.level.coins); 
        this.addObjectsToMap(this.level.bottles); 
        this.addObjectsToMap(this.ThrowableObjects); 

        this.ctx.translate(-this.camera_x, 0);
        
        let self = this; 
        requestAnimationFrame(function() { 
          self.draw();  
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); 
        this.ctx.scale(-1, 1); 
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}