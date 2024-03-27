/**
 * Represents a cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates an instance of Cloud.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Initiates the animation for the cloud, causing it to move leftwards.
     */
    animate() {
        this.moveLeft();
    }
}