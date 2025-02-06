let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindMobileControls();
    hideMobileControls();
}

function hideMobileControls() {
    if (world.startScreen instanceof StartScreen && window.innerWidth <= 1280) {
        document.getElementById('mobileOverlayContainerTop').classList.add('d-none');
        document.getElementById('mobileOverlayContainerBottom').classList.add('d-none');
    }
}

function bindMobileControls() {
    document.getElementById('mobileLeftButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobileLeftButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('mobileRightButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobileRightButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('mobileJumpButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('mobileJumpButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('mobileThrowButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('mobileThrowButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


document.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68){
        keyboard.D = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68){
        keyboard.D = false;
    }
});