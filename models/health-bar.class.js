/**
 * Represents the health bar object in the game.
 */
class HealthBar extends DrawableObject {
    /**
     * Array containing paths to images representing the health bar at different percentages.
     * @type {Array<string>}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', 
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' 
    ];

    /**
    * Current percentage of the health bar.
    * @type {number}
    * @default 100
    */
    percentage = 100;

    /**
    * Creates an instance of HealthBar.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
    * Sets the percentage of the health bar and updates the displayed image accordingly.
    * @param {number} percentage - The new percentage value for the health bar.
    */
    setPercentage(percentage) {
        this.percentage = percentage
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Determines the index of the image to be displayed based on the current percentage value.
    * @returns {number} The index of the image in the IMAGES array.
    */
    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}