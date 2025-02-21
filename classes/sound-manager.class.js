/**
 * Manages audio playback for the game, handling sound loading, playing, and control.
 * Initializes sounds on first user interaction to comply with browser autoplay policies.
 */
class SoundManager {
    constructor() {
        this.sounds = {
            jump: new Audio('audio/jump.mp3'),
            coin: new Audio('audio/coin.mp3'),
            bottle: new Audio('audio/bottle.mp3'),
            bottleHit: new Audio('audio/bottle-hit.mp3'),
            throw: new Audio('audio/throw.mp3'),
            chicken: new Audio('audio/chicken.mp3'),
            chickenAngry: new Audio('audio/chicken-angry.mp3'),
            hurt: new Audio('audio/hurt.mp3'),
            endbossHurt: new Audio('audio/endboss-hurt2.wav'),
            victory: new Audio('audio/won.mp3'),
            defeat: new Audio('audio/defeat.mp3'),
            background: new Audio('audio/background.mp3'),
            walking: new Audio('audio/walk.mp3'),
            dead: new Audio('audio/dead.mp3')

        };

        Object.values(this.sounds).forEach(audio => {
            audio.load();
            audio.volume = 0.2; 
        });
        this.sounds.walking.volume = 0.8;
        this.sounds.hurt.volume = 0.6;
        this.sounds.dead.volume = 0.6;

        this.initialized = false;
        this.pendingSounds = [];

        document.addEventListener('click', () => this.initialize(), { once: true });
        document.addEventListener('keydown', () => this.initialize(), { once: true });
    }

    /**
     * Initializes the sound manager if not already initialized.
     * Plays any sounds that were queued before initialization.
     */
    initialize() {
        if (this.initialized) return;
        this.initialized = true;
        this.pendingSounds.forEach(soundName => this.play(soundName));
        this.pendingSounds = [];
    }

    /**
     * Plays a sound by its name.
     * If the sound manager isn't initialized, the sound is queued for later playback.
     * @param {string} soundName - The name of the sound to play (e.g., 'jump', 'coin', 'bottle')
     */
    play(soundName) {
        if (!this.initialized) {
            this.pendingSounds.push(soundName);
            return;
        }
        if (this.sounds[soundName]) {
            try {
                this.sounds[soundName].currentTime = 0;
                this.sounds[soundName].play();
            } catch (error) {
                console.error('Error playing sound:', error);
                console.error('Sound name:', soundName);
            }
        }
    }

    /**
     * Stops all currently playing sounds and resets their playback position.
     */
    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            audio.load();
            audio.volume = 0.0; 
        });
        this.sounds.victory.volume = 0.2;
        this.sounds.defeat.volume = 0.2;
        this.sounds.background.volume = 0.0;
    }

    /**
     * Pauses playback of a specific sound.
     * @param {string} soundName - The name of the sound to pause
     */
    pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
        }
    }

} 