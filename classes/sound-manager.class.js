class SoundManager {
    constructor() {
        this.sounds = {
            defeat: new Audio('audio/defeat.mp3'),
            jump: new Audio('audio/jump.mp3'),
            coin: new Audio('audio/coin.mp3'),
            dead: new Audio('audio/dead.mp3'),
            bottle: new Audio('audio/bottle.mp3'),
            bottleHit: new Audio('audio/bottle-hit.mp3'),
            throw: new Audio('audio/throw.mp3'),
            chicken: new Audio('audio/chicken.mp3'),
            chickenAngry: new Audio('audio/chicken-angry.mp3'),
            hurt: new Audio('audio/hurt.mp3'),
            endbossHurt: new Audio('audio/endboss-hurt2.wav'),
            victory: new Audio('audio/won.mp3'),
            walk: new Audio('audio/walk.mp3'),
            background: new Audio('audio/background.mp3'),
        };

        Object.values(this.sounds).forEach(audio => {
            audio.load();
            audio.volume = 0.2;
        });
        this.sounds.walk.volume = 0.5;
        this.sounds.dead.volume = 0.5;
        this.initialized = false;
        this.pendingSounds = [];
        this.isMuted = localStorage.getItem('isMuted') === 'true';
        this.backgroundMusicPlaying = false;

        document.addEventListener('click', () => this.initialize(), { once: true });
        document.addEventListener('keydown', () => this.initialize(), { once: true });
    }

    /**
     * Plays a sound if it exists
     * @param {string} name - Name of the sound to play
     */
    async play(name) {
        if (!this.initialized || this.isMuted) return;
        const sound = this.sounds[name];
        if (!sound) return;
        try {
            if (name === 'background') {
                if (!this.backgroundMusicPlaying) {
                    this.backgroundMusicPlaying = true;
                    sound.loop = true;
                    await sound.play().catch(() => {});
                }
            } else if (name === 'defeat' || name === 'victory') {
                sound.currentTime = 0;
                this.stopAll();
                await sound.play().catch(() => {});
            } else {
                sound.currentTime = 0;
                await sound.play().catch(() => {});
            }
        } catch (error) {
            console.log('Sound play error:', error);
        }
    }

    /**
     * Pauses a specific sound
     * @param {string} name - Name of the sound to pause
     */
    pause(name) {
        const sound = this.sounds[name];
        if (sound && !sound.paused) {
            sound.pause();
            if (name === 'background') {
                this.backgroundMusicPlaying = false;
            }
            sound.currentTime = 0;
        }
    }

    /**
     * Stops all sounds
     */
    stopAll() {
        Object.values(this.sounds).forEach(audio => {
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        this.backgroundMusicPlaying = false;
    }

    /**
     * Mutes all sounds
     */
    muteAll() {
        this.isMuted = true;
        this.stopAll();
        Object.values(this.sounds).forEach(audio => {
            audio.volume = 0;
        });
    }

    /**
     * Unmutes all sounds
     */
    unmuteAll() {
        this.isMuted = false;
        Object.values(this.sounds).forEach(audio => {
            if (audio === this.sounds.walk) {
                audio.volume = 0.8;
            } else if (audio === this.sounds.hurt || audio === this.sounds.endbossHurt) {
                audio.volume = 0.6;
            } else {
                audio.volume = 0.2;
            }
        });
    }

    /**
     * Initializes the sound manager
     */
    initialize() {
        if (this.initialized) return;
        this.initialized = true;
        
        while (this.pendingSounds.length > 0) {
            const sound = this.pendingSounds.shift();
            this.play(sound);
        }
    }
} 