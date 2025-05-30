/**
 * Represents the game world that manages all game objects, collisions, and rendering
 * @extends Var
 */
class World extends Var {
  /**
   * Creates a new World instance
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering
   * @param {Keyboard} keyboard - The keyboard input handler
   * @param {SoundManager} soundManager - The sound manager for playing sounds
   */
  constructor(canvas, keyboard, soundManager) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager;
    this.gameManager = new GameManager(this);
    this.draw();
    this.setWorld();
    this.checkGameStart();
    this.gameStartTime = new Date().getTime();
   /*  this.endboss = new Endboss();
    this.endboss.setWorld(this); */
  }
  
  /**
   * Sets the world reference in the character object
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  /**
   * Checks for game start conditions and adds event listeners
   */
  checkGameStart() {
    const startGame = () => {
      if (!this.gameStarted) {
        this.gameStarted = true;
        if (this.startScreen) {
          this.startScreen.cleanup();
        }
        this.soundManager.play("background");
        this.run();
        this.updateMobileOverlay();
      }
    };

    document.addEventListener(
      "keydown",
      (e) => e.code === "Enter" && !this.startScreen.isTouchEnabled() && startGame()
    );

    if (this.isMobile()) {
      document.addEventListener("touchstart", (e) => {
        if (e.target.tagName !== 'BUTTON') {
          startGame();
        }
      });
    }
  }

  /**
   * Updates the mobile overlay based on screen width
   */

  updateMobileOverlay() {
    if (window.innerWidth <= 1280) {
      const topOverlay = document.getElementById("mobileOverlayContainerTop");
      const bottomOverlay = document.getElementById(
        "mobileOverlayContainerBottom"
      );
      topOverlay.classList.add("d-none");
      bottomOverlay.classList.remove("d-none");
    }
  }

  /**
   * Checks if the device is mobile based on screen width and touch capabilities
   * @returns {boolean} True if device is mobile, false otherwise
   */
  isMobile() {
    if (window.innerWidth <= 1280 || this.startScreen.isTouchEnabled()) {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    return false;
  }

  /**
   * Starts the main game loop and collision checks
   */
  run() {
    if (this.gameStarted) {
      this.soundManager.play("background");
    }
    this.gameInterval = setInterval(() => {
      this.checkCollisions();
      this.checkEndbossCollision();
      this.checkTrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkJumpCollision();
      this.checkBottleHit();
      this.checkEndbossAlert();
      this.checkGameOver();
      this.checkSound();
    }, 1000 / 60);
  }

  /**
   * Checks the sound state and updates the sound manager accordingly
   */
  checkSound() {
    const isMuted = localStorage.getItem('isMuted') === 'true';
    if (isMuted) {
        this.soundManager.muteAll();
    } else {
        this.soundManager.unmuteAll();
    }
  }

  /**
   * Checks for jump collisions with enemies and handles their removal
   */
  checkJumpCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isJumpColliding(enemy)) {
        enemy.handleChickenCollision(this, index, null);
        if (enemy.chickenIsDead && !enemy.scheduledForRemoval) {
          enemy.scheduledForRemoval = true;
          this.scheduleEnemyRemoval(enemy);
        }
      }
    });
  }

  /**
   * Checks if a bottle can be thrown based on available bottles and cooldown
   * @returns {boolean} True if bottle can be thrown, false otherwise
   */
  checkTrowObjects() {
    if (this.keyboard.D && this.canThrowBottle()) {
      this.throwBottle();
    }
  }

  /**
   * Checks if a bottle can be thrown based on available bottles and cooldown
   * @returns {boolean} True if bottle can be thrown, false otherwise
   */
  canThrowBottle() {
    return this.statusBarBottles.percentage > 9 && !this.throwCooldown;
  }

  /**
   * Creates and throws a new bottle object
   * @private
   */
  throwBottle() {
    const throwPositionX = this.character.otherDirection
      ? this.character.x
      : this.character.x + 100;
    let throwableObject = new ThrowableObject(
      throwPositionX,
      this.character.y + 100,
      this.statusBarBottles,
      this
    );
    this.throwableObjects.push(throwableObject);
    this.soundManager.play("throw");
    this.throwCooldown = true;
    setTimeout(() => {
      this.throwCooldown = false;
    }, 250);
  }

  /**
   * Checks for collisions with enemies and updates the character's health
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isBeingKilled &&
        !enemy.chickenIsDead &&
        !this.chickenWhichDied.includes(enemy) &&
        this.character.isColliding(enemy) &&
        !this.character.isJumpColliding(enemy)
      ) {
        this.character.hit();
        this.statusBarHP.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks for collisions with the endboss and updates the character's health
   */
  checkEndbossCollision() {
    let endboss = this.level.endboss[0];
    if (endboss && this.character.isColliding(endboss)) {
      this.character.hit();
      this.statusBarHP.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks for collisions with coins and updates the coin count
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
   * Checks for collisions with bottles and updates the bottle count
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  /**
   * Checks for collisions with bottles and updates the bottle count
   */
  checkBottleHit() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        bottle.handleChickenCollision(this, enemyIndex, bottleIndex);
        if (enemy.chickenIsDead && !enemy.scheduledForRemoval) {
          enemy.scheduledForRemoval = true;
          this.scheduleEnemyRemoval(enemy);
        }
      });
      if (this.level.endboss[0]) {
        bottle.handleEndbossCollision(this, bottleIndex);
      }
    });
  }

  /**
   * Handles the removal of dead enemies
   */
  handleDeadEnemy(enemy) {
    if (enemy.chickenIsDead && !enemy.scheduledForRemoval) {
      enemy.scheduledForRemoval = true;
      this.scheduleEnemyRemoval(enemy);
    }
  }

  /**
   * Schedules the removal of an enemy after a delay
   */
  scheduleEnemyRemoval(enemy) {
    setTimeout(() => {
      const currentIndex = this.level.enemies.indexOf(enemy);
      if (currentIndex !== -1) {
        this.level.enemies.splice(currentIndex, 1);
      }
    }, 1000);
  }

  /**
   * Checks for the endboss alert and stops the endboss attack
   */
  checkEndbossAlert() {
    let endboss = this.level.endboss[0];
    if (endboss) {
      if (endboss.x - this.character.x < 400 && !endboss.endbossAttack) {
        this.level.endboss[0].stopEndboss();
        endboss.endbossAttack = true;
      }
    }
  }

  /**
   * Checks if the character is dead
   * @returns {boolean} True if the character is dead, false otherwise
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Collects a coin and updates the coin count
   * @param {number} index - The index of the coin to collect
   */
  collectCoin(index) {
    this.soundManager.play("coin");
    this.level.coins.splice(index, 1);
    this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 10);
  }

  /**
   * Collects a bottle and updates the bottle count
   * @param {number} index - The index of the bottle to collect
   */
  collectBottle(index) {
    this.soundManager.play("bottle");
    this.level.bottles.splice(index, 1);
    this.statusBarBottles.setPercentage(this.statusBarBottles.percentage + 10);
  }

  /**
   * Renders a frame of the game
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.gameStarted) {
      this.startScreen.draw(this.ctx);
    } else if (this.gameOver) {
      this.endScreen.draw(this.ctx);
    } else {
      this.drawGameWorld();
    }
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws the game world
   */
  drawGameWorld() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    [this.statusBarHP, this.statusBarCoin, this.statusBarBottles, this.statusBarEndbossHP]
      .forEach(bar => this.addToMap(bar));
    this.ctx.translate(this.camera_x, 0);
    [
      [this.character],
      this.level.enemies,
      this.level.endboss,
      this.level.bottles,
      this.level.coins,
      this.throwableObjects
    ].forEach(objects => this.addObjectsToMap(objects));
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds objects to the map
   * @param {Array} objects - The objects to add
   * @private
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a movable object to the game world with proper direction handling
   * @param {MovableObject} mo - The movable object to add
   * @private
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    /* mo.drawFrame(this.ctx); */
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally for opposite direction rendering
   * @param {MovableObject} mo - The movable object to flip
   * @private
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips an image back to its original direction
   * @param {MovableObject} mo - The movable object to flip back
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Checks if the game is over
   */
  checkGameOver() {
    if (this.gameManager.isResetting) return;

    if (this.level.endboss[0]?.endbossIsDead && !this.gameOver) {
      this.gameManager.handleGameOver(true);
    } else if (this.character.energy <= 0 && !this.gameOver) {
      this.gameManager.handleGameOver(false);
    }
  }

  /**
   * Shows the Start Screen
   */
  showStartScreen() {
    this.gameStarted = false;
    this.startScreen = new StartScreen();
  }
}