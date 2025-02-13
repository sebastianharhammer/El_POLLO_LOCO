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

function toggleFullscreen() {
    if (canvas.fullscreenElement) {
        canvas.exitFullscreen();
    } else {
        canvas.requestFullscreen();
    }
}
function toggleSound() {
    let soundManager = world.soundManager;
    let isMuted = soundManager.sounds.background.volume === 0;
    let SoundOn = document.getElementById('desktopSoundButtonOn');
    let SoundOff = document.getElementById('desktopSoundButtonOff');
    SoundOn.classList.toggle('d-none');
    SoundOff.classList.toggle('d-none');
    
    Object.values(soundManager.sounds).forEach(audio => {
        audio.volume = isMuted ? 0.2 : 0.0;
    });
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
function resetGame() {
    delete this.character;
    this.character = new Character();
    this.level = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],
        [new Endboss()],
        level1.clouds,
        level1.backgroundObjects,
        level1.coins,
        level1.bottles
    );
    this.camera_x = 200;
    this.throwableObjects = [];
    this.endbossAttack = false;
    this.throwCooldown = false;
    this.gameOver = false;
    this.gameStarted = false;
    this.gameStartTime = new Date().getTime();
    this.endScreen = null;
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset status bars
    this.statusBarHP = new StatusBarHP();
    this.statusBarCoin = new StatusBarCoin();
    this.statusBarBottles = new StatusBarBottles();
    this.statusBarEndbossHP = new StatusBarEndbossHP();

    // Reset character world reference
    this.setWorld();

    // Reset sound
    this.soundManager.stopAll();
  }