/**
 * Manages the game state, reset functionality, and end-game scenarios
 */
class GameManager {
    /**
     * Creates a new GameManager instance
     * @param {World} world - The game world instance
     */
    constructor(world) {
        this.world = world;
        this.isResetting = false;
    }

    /**
     * Resets the entire game state and all entities
     * @returns {void}
     */
    resetGame() {
        if (this.isResetting) return;
        this.isResetting = true;

        this.cleanupEventListeners();
        this.cleanupIntervals();
        this.resetWorldEntities();
        this.resetGameState();

        setTimeout(() => {
            this.isResetting = false;
            this.world.checkGameStart();
        }, 1500);
    }

    /**
     * Removes all touch event listeners from DOM elements
     * @returns {void}
     */
    cleanupEventListeners() {
        const existingTouchListeners = document.getElementsByTagName("*");
        for (let element of existingTouchListeners) {
            element.removeEventListener("touchstart", () => {});
        }
    }

    /**
     * Clears all game-related intervals and stops sound
     * @returns {void}
     */
    cleanupIntervals() {
        this.world.soundManager.stopAll();
        clearInterval(this.world.character.animationInterval);
        clearInterval(this.world.character.movementInterval);
        clearInterval(this.world.endbossAttackInterval);
        clearInterval(this.world.gameInterval);
    }

    /**
     * Reinitializes all world entities (character, status bars, level, etc.)
     * @returns {void}
     */
    resetWorldEntities() {
        this.world.character = new Character();
        this.world.character.world = this.world;
        this.world.level = createLevel1();
        
        this.world.statusBarHP = new StatusBarHP();
        this.world.statusBarCoin = new StatusBarCoin();
        this.world.statusBarBottles = new StatusBarBottles();
        this.world.statusBarEndbossHP = new StatusBarEndbossHP();
        
        this.world.endboss = this.world.level.endboss[0];
    }

    /**
     * Resets all game state variables to their default values
     * @returns {void}
     */
    resetGameState() {
        this.world.camera_x = 200;
        this.world.throwableObjects = [];
        this.world.endbossAttack = false;
        this.world.throwCooldown = false;
        this.world.gameOver = false;
        this.world.gameStarted = false;
        this.world.gameStartTime = new Date().getTime();
        this.world.endScreen = null;
        
        if (this.world.startScreen) {
            this.world.startScreen.cleanup();
        }
    }

    /**
     * Handles the game over sequence
     * @param {boolean} isVictory - Whether the game ended in victory
     * @returns {void}
     */
    handleGameOver(isVictory) {
        this.updateGameSounds(isVictory);
        setTimeout(() => this.showEndScreen(isVictory), 2000);
    }

    /**
     * Updates game sounds based on victory/defeat condition
     * @param {boolean} isVictory - Whether the game ended in victory
     * @returns {void}
     */
    updateGameSounds(isVictory) {
        const soundType = isVictory ? "victory" : "defeat";
        this.world.soundManager.pause("background");
        !isVictory && this.world.soundManager.pause("chickenAngry");
        this.world.soundManager.play(soundType);
    }

    /**
     * Displays the end screen with game statistics
     * @param {boolean} isVictory - Whether the game ended in victory
     * @returns {void}
     */
    showEndScreen(isVictory) {
        this.world.gameOver = true;
        const gameTime = isVictory ? (new Date().getTime() - this.world.gameStartTime) / 1000 : 0;
        this.createEndScreen(isVictory, gameTime);
        this.updateMobileOverlayForEndScreen();
    }

    /**
     * Creates a new end screen with final game statistics
     * @param {boolean} isVictory - Whether the game ended in victory
     * @param {number} gameTime - Total game time in seconds
     * @returns {void}
     */
    createEndScreen(isVictory, gameTime) {
        this.world.endScreen = new EndScreen(
            this.world.statusBarCoin.percentage / 10,
            isVictory ? this.world.statusBarHP.percentage / 20 : 0,
            this.world.statusBarBottles.percentage / 10,
            gameTime,
            isVictory
        );
    }

    /**
     * Updates mobile overlay visibility for the end screen
     * @returns {void}
     */
    updateMobileOverlayForEndScreen() {
        if (window.innerWidth <= 1280 && this.world.startScreen.isTouchEnabled()) {
            const topOverlay = document.getElementById("mobileOverlayContainerTop");
            const bottomOverlay = document.getElementById("mobileOverlayContainerBottom");
            topOverlay.classList.remove("d-none");
            bottomOverlay.classList.add("d-none");
        }
    }
} 