class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    canvas;
    ctx;

    constructor(canvas) {
       this.ctx = canvas.getContext('2d');
       this.canvas = canvas;
       this.draw(); 
    }

    // Draw wird immer wieder aufgerufen, so viel es die Grafikkarte hergibt.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        
        let self = this; //Innerhalb der request Funktion wird die Welt nicht mehr erkannt, daher müssen wir das Wort mit einer Variablen umgehen.
        requestAnimationFrame(function() { //Funktion wird ausgeführt, wenn alles darüber fertig gezeichnet wurde.
          self.draw();  
        });
    }
}