/**
 * Represents the end boss character in the game.
 */
class Endboss extends MovableObject {
    /**
     * Energy level of the end boss.
     * @type {number}
     * @default 15
     */
    endbossEnergy = 15;

    /**
     * Height of the end boss.
     * @type {number}
     */
    height = 400;

    /**
     * Width of the end boss.
     * @type {number}
     */
    width = 250;

    /**
     * Y-coordinate of the end boss.
     * @type {number}
     * @default 60
     */
    y = 60;

    /**
     * Sound played when the end boss is hit.
     * @type {HTMLAudioElement}
     */
    hit_sound = new Audio('audio/boss-hit.mp3');

    /**
     * Sound played when the end boss is attacking.
     * @type {HTMLAudioElement}
     */
    gackling_sound = new Audio('audio/gackern.mp3');

    /**
     * Timestamp of the last hit received by the end boss.
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * Array containing paths to images representing the end boss while walking.
     * @type {Array<string>}
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Array containing paths to images representing the end boss in an alert state.
     * @type {Array<string>}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /**
     * Array containing paths to images representing the end boss while being hurt.
     * @type {Array<string>}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Array containing paths to images representing the end boss while attacking.
     * @type {Array<string>}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Array containing paths to images representing the end boss while being dead.
     * @type {Array<string>}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates an instance of Endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2200;
        this.animate();
    }

    /**
     * Animates the movement and actions of the end boss.
     */
    animate() {
        setInterval( () => {
            if(this.endbossIsDead()) {
                this.playAnimation(this.IMAGES_DEAD); 
                setTimeout ( () => {
                    document.getElementById('endscreen').classList.remove('d-none')
                }, 2000)
            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if(this.x - world.character.x < 400) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.speed = 5;
                this.moveLeft(); 
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            }
        }, 200);
    }
    
    /**
     * Updates the end boss's energy level when hit.
     */
    endbossHit() {
        this.endbossEnergy -= 3;
        if (this.endbossEnergy < 0) {
            this.endbossEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        if(backgroundMusic == true) {
            this.gackling_sound.play();
        }
    }
}