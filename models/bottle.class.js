class Bottle extends MovableObject {
    height = 100;
    width = 80; 

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 300 + Math.random() * 1800;
        this.y = 100 + Math.random() * 250;
        this.animate();
    }

    animate() {
        this.playAnimation(this.IMAGES_BOTTLE);

        setInterval( () => {
            this.playAnimation(this.IMAGES_BOTTLE); 
        }, 200);
    }
}