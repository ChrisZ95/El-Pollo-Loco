/**
 * Represents a bottle object in the game.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /**
     * The height of the bottle.
     * @type {number}
     */
    height = 100;

    /**
     * The width of the bottle.
     * @type {number}
     */
    width = 80; 

    /**
     * Array containing paths to images representing the bottle.
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Constructs a new Bottle instance.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 300 + Math.random() * 1800;
        this.y = 340
        this.animate();
    }

    /**
     * Animates the bottle by playing its animation.
     */
    animate() {
        this.playAnimation(this.IMAGES_BOTTLE);
        setInterval( () => {
            this.playAnimation(this.IMAGES_BOTTLE); 
        }, 200);
    }
}