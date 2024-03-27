/**
 * Represents the health bar for the end boss.
 */
class endbossHealthBar extends DrawableObject {
    /**
     * Array containing paths to images representing different health levels.
     * @type {string[]}
     */
    IMAGES = [
     'img/7_statusbars/2_statusbar_endboss/green/green0.png', 
     'img/7_statusbars/2_statusbar_endboss/green/green20.png',
     'img/7_statusbars/2_statusbar_endboss/green/green40.png',
     'img/7_statusbars/2_statusbar_endboss/green/green60.png',
     'img/7_statusbars/2_statusbar_endboss/green/green80.png',
     'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    /**
     * The current health level of the end boss.
     * @type {number}
     * @default 15
     */
    endbossHealth = 15;
 
    /**
     * Constructs a new EndbossHealthBar object.
     */
    constructor() {
     super();
     this.loadImages(this.IMAGES);
     this.x = 500;
     this.y = 420;
     this.width = 200;
     this.height = 60;
     this.setEndbossHealth(15);
    }
 
    /**
     * Sets the health level of the end boss.
     * @param {number} endbossHealth - The new health level.
     */
    setEndbossHealth(endbossHealth) {
     this.endbossHealth = endbossHealth;
     let path = this.IMAGES[this.resolveImageIndex()];
     this.img = this.imageCache[path];
    }
 
    /**
     * Resolves the index of the image based on the current health level.
     * @returns {number} - The index of the image.
     */
    resolveImageIndex() {
        if(this.endbossHealth == 15) {
            return 5;
        } else if (this.endbossHealth == 12) {
            return 4;
        } else if (this.endbossHealth == 9) {
            return 3;
        } else if (this.endbossHealth == 6) {
            return 2;
        } else if (this.endbossHealth == 3) {
            return 1;
        } else {
            return 0;
        }
    }
}