/**
 * Represents a bottle bar that displays the amount of bottles available.
 * @extends DrawableObject
 */
class BottleBar extends DrawableObject {
    /**
     * An array containing paths to images representing the different states of the bottle bar.
     * @type {string[]}
     */
    IMAGES = [
     'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
     'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
     'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
     'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
     'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
     'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * The current amount of bottles.
     * @type {number}
     */
    bottleAmount = 0;
    
    /**
     * Constructs a new BottleBar object.
     */
    constructor() {
     super();
     this.loadImages(this.IMAGES);
     this.x = 40;
     this.y = 80;
     this.width = 200;
     this.height = 60;
     this.setBottleAmount(0);
    }
 
    /**
     * Sets the current amount of bottles and updates the image accordingly.
     * @param {number} bottleAmount - The new amount of bottles.
     */
    setBottleAmount(bottleAmount) {
     this.bottleAmount = bottleAmount
     let path = this.IMAGES[this.resolveImageIndex()];
     this.img = this.imageCache[path];
    }
 
    /**
     * Resolves the index of the image to be displayed based on the current amount of bottles.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if(this.bottleAmount == 8) {
            return 5;
        } else if (this.bottleAmount >= 6) {
            return 4;
        } else if (this.bottleAmount >= 4) {
            return 3;
        } else if (this.bottleAmount >= 2) {
            return 2;
        } else if (this.bottleAmount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}