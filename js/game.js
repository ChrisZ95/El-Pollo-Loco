let canvas;
let world;
let keyboard = new Keyboard();
let allAudioElements = [];
let game_sound = new Audio('audio/game.mp3');
let backgroundMusic = true;

/**
 * Initializes the game and loads the audio elements.
 */
function init(){
    const audioElements = document.querySelectorAll('audio');
    allAudioElements = Array.from(audioElements);
    game_sound = new Audio('audio/game.mp3');
    game_sound.loop = true;
}

/**
 * Toggles the background music on or off.
 * If background music is currently on, it will be turned off, and vice versa.
 * This function also updates the sound button icon accordingly.
 */
function toggleSounds() {
    backgroundMusic ? (backgroundMusic = false) : (backgroundMusic = true);
    toggleSoundButton();
}

/**
 * Toggles the sound button icon and plays or pauses the game sound accordingly.
 * If background music is on, the sound button icon will show as off and the game sound will be paused.
 * If background music is off, the sound button icon will show as on and the game sound will be played.
 */
function toggleSoundButton() {
    if (backgroundMusic) {
        document.getElementById("soundOffIcon").classList.add("d-none");
        game_sound.play();
    } else {
        document.getElementById("soundOffIcon").classList.remove("d-none");
        game_sound.pause();
    }
}

/**
 * Starts the game sound playback and enables background music.
 */
function start() {
    initLevel();
    canvas = document.getElementById('canvas');
    document.getElementById('startscreen').classList.add('d-none');
    world = new World(canvas, keyboard);
    const button = document.querySelector('button');
    if (button) {
        button.style.display = 'none';
    }
    game_sound.play();
}

/**
 * Opens the legal notice.
 */
function openLegalNotice() {
    document.getElementById('legalNotice').classList.remove('d-none');
}

/**
 * Opens the privacy policy.
 */
function openPrivacyPolicy() {
    document.getElementById('privacyPolicy').classList.remove('d-none');
}

/**
 * Closes the legal notice.
 */
function closeLegalNotice() {
    document.getElementById('legalNotice').classList.add('d-none');
}

/**
 * Closes the privacy policy.
 */
function closePrivacyPolicy() {
    document.getElementById('privacyPolicy').classList.add('d-none');
}

/**
 * Event handler for keydown events on the keyboard.
 * @param {KeyboardEvent} e - The KeyboardEvent object.
 */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Event handler for keyup events on the keyboard.
 * @param {KeyboardEvent} e - The KeyboardEvent object.
 */
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Event handler for clicking and releasing the left control button.
 */
document.addEventListener('DOMContentLoaded', function() {
    const leftButton = document.querySelector('.left-button');
    leftButton.addEventListener('mousedown', function() {
        keyboard.LEFT = true;
    });
    leftButton.addEventListener('mouseup', function() {
        keyboard.LEFT = false;
    });
    leftButton.addEventListener('touchstart', function() {
        keyboard.LEFT = true;
    });
    leftButton.addEventListener('touchend', function() {
        keyboard.LEFT = false;
    });
});

/**
 * Event handler for clicking and releasing the right control button.
 */
document.addEventListener('DOMContentLoaded', function() {
    const rightButton = document.querySelector('.right-button');
    rightButton.addEventListener('mousedown', function() {
        keyboard.RIGHT = true;
    });
    rightButton.addEventListener('mouseup', function() {
        keyboard.RIGHT = false;
    });
    rightButton.addEventListener('touchstart', function() {
        keyboard.RIGHT = true;
    });
    rightButton.addEventListener('touchend', function() {
        keyboard.RIGHT = false;
    });
});

/**
 * Event handler for clicking and releasing the jump button.
 */
document.addEventListener('DOMContentLoaded', function() {
    const jumpButton = document.querySelector('.jump-button');
    jumpButton.addEventListener('mousedown', function() {
        keyboard.SPACE = true;
    });
    jumpButton.addEventListener('mouseup', function() {
        keyboard.SPACE = false;
    });
    jumpButton.addEventListener('touchstart', function() {
        keyboard.SPACE = true;
    });
    jumpButton.addEventListener('touchend', function() {
        keyboard.SPACE = false;
    });
});

/**
 * Event handler for clicking and releasing the throw button.
 */
document.addEventListener('DOMContentLoaded', function() {
    const throwButton = document.querySelector('.throw-button');
    throwButton.addEventListener('mousedown', function() {
        keyboard.D = true;
    });
    throwButton.addEventListener('mouseup', function() {
        keyboard.D = false;
    });
    throwButton.addEventListener('touchstart', function() {
        keyboard.D = true;
    });
    throwButton.addEventListener('touchend', function() {
        keyboard.D = false;
    });
});