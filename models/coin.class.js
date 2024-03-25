class Coin extends DrawableObject {
    height = 120;
    width = 120; 

    IMAGES_COIN = [
        'img/8_coin/coin_1.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1800;
        this.y = 100 + Math.random() * 250;
    }
}