class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
       this.ctx = canvas.getContext('2d');
       this.canvas = canvas;
       this.keyboard = keyboard;
       this.draw(); 
       this.setWorld();
       this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach( (enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.energy -= 5;
                    console.log('Collision whith Character, energy', this.character.energy);
                };
            });
        }, 200);
    }

    // Draw wird immer wieder aufgerufen, so viel es die Grafikkarte hergibt.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects); //Objekte werden hinzugefügt
        this.addToMap(this.character); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.level.enemies); //Objekte werden hinzugefügt
        this.addObjectsToMap(this.level.clouds); //Objekte werden hinzugefügt

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