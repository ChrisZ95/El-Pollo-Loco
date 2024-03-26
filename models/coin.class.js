class Coin extends MovableObject {
    height = 120;
    width = 120; 

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1800;
        this.y = 100 + Math.random() * 250;
        this.animate();
    }

    animate() {
        this.playAnimation(this.IMAGES_COIN);

        setInterval( () => {
            this.playAnimation(this.IMAGES_COIN); 
        }, 500);
    }
}