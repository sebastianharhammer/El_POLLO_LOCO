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
            audio.volume = 0.2; // Set default volume to 20%
        });
    }

    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0; // Reset sound to start
            this.sounds[soundName].play();
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