let canvas;
let world;
let keyboard = new Keyboard();
let allAudioElements = [];
let game_sound = new Audio('audio/game.mp3');

function init(){
    const audioElements = document.querySelectorAll('audio');
    allAudioElements = Array.from(audioElements);
    game_sound = new Audio('audio/game.mp3');
    game_sound.loop = true;
}

function muteSound() {
    game_sound.pause();
}

function playSound() {
    game_sound.play();
}

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

function openLegalNotice() {
    document.getElementById('legalNotice').classList.remove('d-none');
}

function openPrivacyPolicy() {
    document.getElementById('privacyPolicy').classList.remove('d-none');
}

function closeLegalNotice() {
    document.getElementById('legalNotice').classList.add('d-none');
}

function closePrivacyPolicy() {
    document.getElementById('privacyPolicy').classList.add('d-none');
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
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

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
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