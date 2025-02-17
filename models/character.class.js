/**
 * Represents a character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * The height of the character.
     * @type {number}
     */
    height = 250;

    /**
     * The y-coordinate of the character.
     * @type {number}
     */
    y = 80;

    /**
     * The speed of the character.
     * @type {number}
     */
    speed = 10;

    /**
     * The energy of the character.
     * @type {number}
     */
    energy = 100;

    /**
     * Array containing paths to images representing the walking animation of the character.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Array containing paths to images representing the jumping animation of the character.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Array containing paths to images representing the dead animation of the character.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Array containing paths to images representing the hurt animation of the character.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array containing paths to images representing the idle animation of the character.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /**
     * Array containing paths to images representing the long idle animation of the character.
     * @type {string[]}
     */
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    /**
     * Reference to the game world.
     * @type {World}
     */
    world;

     /**
     * Audio element for the walking sound.
     * @type {HTMLAudioElement}
     */
    walking_sound = new Audio('audio/walk.mp3');

    /**
     * Audio element for the jumping sound.
     * @type {HTMLAudioElement}
     */
    jumping_sound = new Audio('audio/jump.mp3');

    /**
     * Audio element for the snoring sound.
     * @type {HTMLAudioElement}
     */
    snoring_sound = new Audio('audio/snoring.mp3');

    /**
     * Timer for idle animation.
     * @type {number}
     */
    idleTimer = 0;

    /**
     * Constructs a new Character instance.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates character animation.
     */
    animate() {
        this.characterMovement();
        this.characterAnimations();
    }  

    /**
     * Sets up character movement intervals.
     */
    characterMovement() {
        setInterval(() => {
            this.pauseWalkingSound();
            if (this.shouldMoveRight()) {
                this.moveRightAndSetDirection();
                this.characterSoundWalking();
            }
            if (this.shouldMoveLeft()) {
                this.moveLeftAndSetDirection();
                this.characterSoundWalking();
            }
            if (this.shouldJump()) {
                this.jumpAndPlaySound();
            }
            this.updateCameraPosition();
        }, 1000 / 60);  
    }
    
    /**
     * Pauses the walking sound.
     */
    pauseWalkingSound() {
        this.walking_sound.pause();
    }
    
    /**
     * Checks if the character should move right.
     * @returns {boolean} - Indicates if the character should move right.
     */
    shouldMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }
    
    /**
     * Checks if the character should move left.
     * @returns {boolean} - Indicates if the character should move left.
     */
    shouldMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }
    
    /**
     * Checks if the character should jump.
     * @returns {boolean} - Indicates if the character should jump.
     */
    shouldJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }
    
    /**
     * Moves the character to the right and sets its direction.
     */
    moveRightAndSetDirection() {
        this.moveRight();
        this.otherDirection = false;
    }
    
    /**
     * Moves the character to the left and sets its direction.
     */
    moveLeftAndSetDirection() {
        this.moveLeft();
        this.otherDirection = true;
    }
    
     /**
     * Initiates a jump action and plays the jumping sound.
     */
    jumpAndPlaySound() {
        this.jump();
        this.characterSoundJumping();
    }
    
    /**
     * Updates the camera position based on the character's position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }
    
    /**
     * Plays the walking sound if background music is enabled.
     */
    characterSoundWalking() {
        if (backgroundMusic) {
            this.walking_sound.play(); 
        }
    }
    
    /**
     * Plays the jumping sound if background music is enabled.
     */
    characterSoundJumping() {
        if (backgroundMusic) {
            this.jumping_sound.play();
        }
    }

     /**
     * Initiates character animation intervals.
     */
    characterAnimations() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation();
            } else if (this.isHurt()) {
                this.playHurtAnimation();
            } else if (this.isAboveGround()) {
                this.playJumpingAnimation();
            } else {
                this.playIdleAnimations();
            }
        }, 50);
    }
    
    /**
     * Plays the dead animation.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            document.getElementById('lostScreen').classList.remove('d-none');
        }, 2000);
    }
    
    /**
     * Plays the hurt animation.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }
    
    /**
     * Plays the jumping animation.
     */
    playJumpingAnimation() {
        this.idleTimer = 0;
        this.playAnimation(this.IMAGES_JUMPING);
        this.snoring_sound.pause();
    }
    
    /**
     * Plays the appropriate idle animation based on character state.
     */
    playIdleAnimations() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.idleTimer = 0;
            this.playWalkingAnimation();
            this.snoring_sound.pause();
        } else {
            if (this.idleTimer > 7000) {
                this.playLongIdleAnimation();
                this.characterSoundSnoring();
            } else {
                this.playIdleAnimation();
                this.idleTimer += 50;
            }
        }
    }
    
    /**
     * Plays the walking animation.
     */
    playWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }
    
     /**
     * Plays the long idle animation.
     */
    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONGIDLE);
    }
    
    /**
     * Plays the idle animation.
     */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }
    
    /**
     * Plays the snoring sound if background music is enabled.
     */
    characterSoundSnoring() {
        if (backgroundMusic) {
            this.snoring_sound.play();
        }
    }

    /**
     * Initiates a jump action.
     */
    jump() {
        this.speedY = 30;
    }
        

    jumpOnChicken() {
        this.speedY = 25;
    }

    /**
     * Decreases the character's energy when hit by an enemy.
     */
    hit() {
        this.energy -= 1;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Decreases the character's energy when hit by the end boss.
     */
    endbossHit() {
        this.energy -= 100;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}