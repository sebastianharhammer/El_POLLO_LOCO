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
            walk: new Audio('audio/walk.mp3'),
            background: new Audio('audio/background.mp3')


        };

        // Pre-load all sounds
        Object.values(this.sounds).forEach(audio => {
            audio.load();
            audio.volume = 0.2; 
        });

        this.initialized = false;
        this.pendingSounds = [];

        // Add initialization method
        document.addEventListener('click', () => this.initialize(), { once: true });
        document.addEventListener('keydown', () => this.initialize(), { once: true });
    }

    initialize() {
        if (this.initialized) return;
        this.initialized = true;
        
        // Play any sounds that were requested before initialization
        this.pendingSounds.forEach(soundName => this.play(soundName));
        this.pendingSounds = [];
    }

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

    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }
    pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
        }
    }
} 