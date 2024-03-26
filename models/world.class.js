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
            this.checkCollisionWithChickenTest();
            this.checkCollisionWithCoins();
            this.checkCollisionWithBottles();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.character.bottleDepot > 0) { // Überprüfung des BottleAmount
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObjects.push(bottle);
            this.character.bottleDepot--; // Reduzieren des BottleAmount nach dem Werfen
            this.bottleBar.setBottleAmount(this.character.bottleDepot); // Aktualisieren der Anzeige
        }
    }

    checkCollisionWithChicken() {
        this.level.enemies.forEach( (enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            };
        });
    }

    checkCollisionWithChickenTest() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let chicken = this.level.enemies[i];
            if(this.character.isColliding(chicken) && this.character.isAboveGround()) {
                this.character.chickenIsDead();
                this.level.enemies.splice(i, 1);
                i--;
            } if(this.character.isColliding(chicken) && !this.character.isAboveGround()) {
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

    // Draw wird immer wieder aufgerufen, so viel es die Grafikkarte hergibt.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects); //Objekte werden hinzugefügt

        this.ctx.translate(-this.camera_x, 0);
        // ------- Space for fixed objects ---------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.level.clouds); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.level.enemies); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.level.coins); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.level.bottles); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.ThrowableObjects); //Objekte werden hinzugefügt

        this.ctx.translate(-this.camera_x, 0);
        
        let self = this; //Innerhalb der request Funktion wird die Welt nicht mehr erkannt, daher müssen wir das Wort mit einer Variablen umgehen.
        requestAnimationFrame(function() { //Funktion wird ausgeführt, wenn alles darüber fertig gezeichnet wurde.
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
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // Verursacht das Verschieben
        this.ctx.scale(-1, 1); // Verursacht die Spiegelung des Charakters
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}