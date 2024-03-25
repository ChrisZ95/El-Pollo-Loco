let canvas;
let world;
let keyboard = new Keyboard();
let game_sound = new Audio('audio/game.mp3');

function init(){
    canvas = document.getElementById('canvas');
    game_sound = new Audio('audio/game.mp3');
    game_sound.loop = true;
    playButton();
}

function playButton() {
    const button = document.createElement('button');
    button.textContent = 'Start';
    button.style.position = 'absolute';
    button.style.top = '30%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.style.backgroundColor = 'rgba(255, 223, 0, 1)';
    button.style.color = 'black';
    button.style.fontFamily = "'zabars', Arial, Helvetica, sans-serif";
    button.style.fontSize = '64px';
    button.style.borderRadius = '10px';
    button.style.cursor = 'pointer';
    button.style.paddingLeft = '20px';
    button.style.paddingRight = '20px';
    button.addEventListener('click', start);
    document.body.appendChild(button);
}

function muteSound() {
    game_sound.pause();
}

function playSound() {
    game_sound.play();
}

function start() {
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