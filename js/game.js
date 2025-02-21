/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keyboard} */
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas, world, and mobile controls
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindMobileControls();
    hideMobileControls();
    
    const savedMuted = JSON.parse(localStorage.getItem('isMuted'));
    if (savedMuted !== null) {
        if (savedMuted) {
            toggleSound();
        }
    }
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
    if (canvas.fullscreenElement) {
        canvas.exitFullscreen();
    } else {
        canvas.requestFullscreen();
    }
}

/**
 * Toggles the game sound on/off and updates the UI accordingly
 */
function toggleSound() {
    let soundManager = world.soundManager;
    let isMuted = soundManager.sounds.background.volume === 0;
    toggleSoundButtons();
    isMuted = !isMuted;
    saveSoundState(isMuted);
    updateSoundVolumes(soundManager, isMuted);
}

/**
 * Toggles visibility of sound control buttons
 */
function toggleSoundButtons() {
    let SoundOn = document.getElementById('desktopSoundButtonOn');
    let SoundOff = document.getElementById('desktopSoundButtonOff');
    let MobileSoundOn = document.getElementById('mobileSoundButtonOn');
    let MobileSoundOff = document.getElementById('mobileSoundButtonOff');
    SoundOn.classList.toggle('d-none');
    SoundOff.classList.toggle('d-none');
    MobileSoundOn.classList.toggle('d-none');
    MobileSoundOff.classList.toggle('d-none');
}

/**
 * Saves the current sound state to localStorage
 * @param {boolean} isMuted - Whether the sound is muted
 */
function saveSoundState(isMuted) {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
}

/**
 * Updates the volume for all sound effects
 * @param {Object} soundManager - The sound manager instance
 * @param {boolean} isMuted - Whether the sound should be muted
 */
function updateSoundVolumes(soundManager, isMuted) {
    Object.values(soundManager.sounds).forEach(audio => {
        audio.volume = isMuted ? 0.0 : 0.2;
    });
    soundManager.sounds.walking.volume = isMuted ? 0.0 : 0.8;
    soundManager.sounds.hurt.volume = isMuted ? 0.0 : 0.6;
    soundManager.sounds.dead.volume = isMuted ? 0.0 : 0.6;
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
