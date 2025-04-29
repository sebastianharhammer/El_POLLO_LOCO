/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keyboard} */
let keyboard = new Keyboard();
/** @type {SoundManager} */
let soundManager = new SoundManager();

/**
 * Initializes the game by setting up the canvas, world, and mobile controls
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, soundManager);
    bindMobileControls();
    hideMobileControls();
    
    
    initSound();

    const isMuted = localStorage.getItem('isMuted') === 'true';
    const soundOn = document.getElementById('desktopSoundButtonOn');
    const soundOff = document.getElementById('desktopSoundButtonOff');
    const mobileSoundOn = document.getElementById('mobileSoundButtonOn');
    const mobileSoundOff = document.getElementById('mobileSoundButtonOff');
    soundOff.classList.toggle('d-none', !isMuted);
    soundOn.classList.toggle('d-none', isMuted);
    mobileSoundOn.classList.toggle('d-none', isMuted);
    mobileSoundOff.classList.toggle('d-none', !isMuted);
    if (isMuted) {
        world.soundManager.muteAll();

    }
}

/**
 * Initializes the sound manager and sound effects
 */
function initSound() {
    soundManager.initialize();
}

/**
 * Hides mobile controls when on the start screen and viewport width is <= 1280px
 */
function hideMobileControls() {
    if (world.startScreen instanceof StartScreen && window.innerWidth <= 1280) {
        document.getElementById('mobileOverlayContainerTop').classList.add('d-none');
        document.getElementById('mobileOverlayContainerBottom').classList.add('d-none');
    }
}



/**
 * Toggles the canvas between fullscreen and normal mode
 */
function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        }
    }
}



/**
 * Toggles the game sound on/off and updates the UI accordingly
 */
function toggleSound() {
    if (!world?.soundManager) return;
    const isMuted = localStorage.getItem('isMuted') !== 'true';
    const soundOn = document.getElementById('desktopSoundButtonOn');
    const soundOff = document.getElementById('desktopSoundButtonOff');
    const mobileSoundOn = document.getElementById('mobileSoundButtonOn');
    const mobileSoundOff = document.getElementById('mobileSoundButtonOff');
    soundOff.classList.toggle('d-none', !isMuted);
    soundOn.classList.toggle('d-none', isMuted);
    mobileSoundOn.classList.toggle('d-none', isMuted);
    mobileSoundOff.classList.toggle('d-none', !isMuted);
    if (isMuted) {
        world.soundManager.muteAll();
    } else {
        world.soundManager.unmuteAll();
        if (world.gameStarted && !world.gameOver) {
            world.soundManager.play("background");
        }
    }
    
    localStorage.setItem('isMuted', isMuted);
}

/**
 * Updates the volume for all sound effects
 * @param {Object} soundManager - The sound manager instance
 * @param {boolean} isMuted - Whether the sound should be muted
 */
function updateSoundVolumes(soundManager, isMuted) {
    if (!soundManager?.sounds) {
        console.log('no sound manager');    
        return;
    }
    
    Object.entries(soundManager.sounds).forEach(([name, audio]) => {
        if (!audio) return;
        
        if (name === 'walking') {
            audio.volume = isMuted ? 0.0 : 0.8;
        } else if (name === 'hurt' || name === 'dead') {
            audio.volume = isMuted ? 0.0 : 0.6;
        } else {
            audio.volume = isMuted ? 0.0 : 0.2;
        }
    });
}

/**
 * Binds all mobile control touch events
 */
function bindMobileControls() {
    bindMobileLeftButton();
    bindMobileRightButton();
    bindMobileJumpButton();
    bindMobileThrowButton();
}

/**
 * Binds touch events for the mobile left movement button
 */
function bindMobileLeftButton() {
    document.getElementById('mobileLeftButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobileLeftButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
}

/**
 * Binds touch events for the mobile right movement button
 */
function bindMobileRightButton() {
    document.getElementById('mobileRightButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobileRightButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
}

/**
 * Binds touch events for the mobile jump button
 */
function bindMobileJumpButton() {
    document.getElementById('mobileJumpButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('mobileJumpButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

/**
 * Binds touch events for the mobile throw button
 */
function bindMobileThrowButton() {
    document.getElementById('mobileThrowButton').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('mobileThrowButton').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * Event listener for keyboard keydown events
 * @param {KeyboardEvent} e - The keyboard event object
 */
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

/**
 * Event listener for keyboard keyup events
 * @param {KeyboardEvent} e - The keyboard event object
 */
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
