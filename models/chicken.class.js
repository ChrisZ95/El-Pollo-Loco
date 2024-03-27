class Chicken extends MovableObject {
    y = 360;
    height = 65;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    chickendead_sound = new Audio('audio/chicken-dead.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.isDead = false;
        this.x = 300 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();
    }

    animate() {
        if (!this.isDead) {
            this.animationInterval = setInterval(() => {
                this.moveLeft(); 
            }, 1000 / 60);
            this.animationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING); 
            }, 200);
        }
    }
    
    chickenIsDead() {
        this.stopAnimation();
        this.isDead = true;
        this.speed = 0;
        if(backgroundMusic == true) {
            this.chickendead_sound.play(); 
        }
        this.playAnimation(this.IMAGES_DEAD);
        setInterval(() => {
            this.y = -200
        }, 200)
    }

    stopAnimation() {
        clearInterval(this.animationInterval);
        this.currentImage = 0; 
    }
}