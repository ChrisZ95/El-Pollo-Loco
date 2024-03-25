class ThrowableObject extends MovableObject {
    throwing_sound = new Audio('audio/throw.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25)
        this.throwing_sound.play();
    }
}