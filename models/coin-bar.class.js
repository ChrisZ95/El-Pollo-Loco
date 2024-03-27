/**
 * Represents a coin bar object in the game.
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    IMAGES = [
     'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
     'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];
    coinAmount = 0;
 
    /**
     * Creates an instance of CoinBar.
     */
    constructor() {
     super();
     this.loadImages(this.IMAGES);
     this.x = 40;
     this.y = 40;
     this.width = 200;
     this.height = 60;
     this.setCoinAmount(0);
    }
 
    /**
     * Sets the amount of coins in the coin bar.
     * @param {number} coinAmount - The amount of coins to set.
     */
    setCoinAmount(coinAmount) {
     this.coinAmount = coinAmount
     let path = this.IMAGES[this.resolveImageIndex()];
     this.img = this.imageCache[path];
    }
 
    /**
     * Resolves the index of the coin image based on the coin amount.
     * @returns {number} The index of the coin image.
     */
    resolveImageIndex() {
        if(this.coinAmount == 5) {
            return 5;
        } else if (this.coinAmount >= 4) {
            return 4;
        } else if (this.coinAmount >= 3) {
            return 3;
        } else if (this.coinAmount >= 2) {
            return 2;
        } else if (this.coinAmount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}