/**
 * Represents a throwable object in the game.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    throwing_sound = new Audio('audio/throw.mp3');

    /**
     * Constructs a new ThrowableObject.
     * @param {number} x - The x-coordinate of the object.
     * @param {number} y - The y-coordinate of the object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Throws the throwable object.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25)
        if(backgroundMusic == true) {
            this.throwing_sound.play();
        }
    }
}