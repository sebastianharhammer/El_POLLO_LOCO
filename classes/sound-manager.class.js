/**
 * Manages audio playback for the game, handling sound loading, playing, and control.
 * Initializes sounds on first user interaction to comply with browser autoplay policies.
 */
class SoundManager {
    constructor() {
        this.sounds = {};
        this.initialized = false;
        this.pendingSounds = [];
        this.soundPaths = {
            jump: 'audio/jump.mp3',
            coin: 'audio/coin.mp3',
            bottle: 'audio/bottle.mp3',
            bottleHit: 'audio/bottle-hit.mp3',
            throw: 'audio/throw.mp3',
            chicken: 'audio/chicken.mp3',
            chickenAngry: 'audio/chicken-angry.mp3',
            hurt: 'audio/hurt.mp3',
            endbossHurt: 'audio/endboss-hurt2.wav',
            victory: 'audio/won.mp3',
            defeat: 'audio/defeat.mp3',
            background: 'audio/background.mp3',
            walking: 'audio/walk.mp3',
            dead: 'audio/dead.mp3'
        };
        document.addEventListener('click', () => this.initialize(), { once: true });
        document.addEventListener('keydown', () => this.initialize(), { once: true });
    }

    /**
     * Initializes the sound manager if not already initialized.
     * Loads sounds and plays any sounds that were queued before initialization.
     */
    initialize() {
        if (this.initialized) return;
        Object.entries(this.soundPaths).forEach(([name, path]) => {
            try {
                const audio = new Audio();
                audio.preload = 'none';
                audio.volume = 0.2;
                Object.defineProperty(this.sounds, name, {
                    get: () => {
                        if (!audio.src) {
                            audio.src = path;
                        }
                        return audio;
                    }
                });
                if (name === 'walking') audio.volume = 0.8;
                if (name === 'hurt' || name === 'dead') audio.volume = 0.6;
            } catch (error) {
                console.warn(`Failed to initialize sound: ${name}`, error);
            }
        });

        this.initialized = true;
        this.pendingSounds.forEach(soundName => this.play(soundName));
        this.pendingSounds = [];
    }

    /**
     * Plays a sound by its name.
     * If the sound manager isn't initialized, the sound is queued for later playback.
     * @param {string} soundName - The name of the sound to play
     */
    play(soundName) {
        if (!this.initialized) {
            this.pendingSounds.push(soundName);
            return;
        }
        if (this.sounds[soundName]) {
            try {
                const sound = this.sounds[soundName];
                sound.currentTime = 0;
                const playPromise = sound.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.warn(`Error playing sound ${soundName}:`, error);
                    });
                }
            } catch (error) {
                console.warn(`Error playing sound ${soundName}:`, error);
            }
        }
    }

    /**
     * Stops all currently playing sounds and resets their playback position.
     */
    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 0.0;
            } catch (error) {
                console.warn('Error stopping sound:', error);
            }
        });
        
        if (this.sounds.victory) this.sounds.victory.volume = 0.2;
        if (this.sounds.defeat) this.sounds.defeat.volume = 0.2;
        if (this.sounds.background) this.sounds.background.volume = 0.0;
    }

    /**
     * Pauses playback of a specific sound.
     * @param {string} soundName - The name of the sound to pause
     */
    pause(soundName) {
        if (this.sounds[soundName]) {
            try {
                this.sounds[soundName].pause();
            } catch (error) {
                console.warn(`Error pausing sound ${soundName}:`, error);
            }
        }
    }
} 