/**
 * Represents the game world that manages all game objects, collisions, and rendering
 * @extends Var
 */
class World extends Var {
  /**
   * Creates a new World instance
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering
   * @param {Keyboard} keyboard - The keyboard input handler
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameManager = new GameManager(this);
    this.draw();
    this.setWorld();
    this.checkGameStart();
    this.gameStartTime = new Date().getTime();
  }
  /**
   * Sets the world reference in the character object
   */
  setWorld() {
    this.character.world = this;
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
        this.run();
        this.updateMobileOverlay();
      }
    };

    document.addEventListener(
      "keydown",
      (e) => e.code === "Enter" && window.innerWidth > 1280 && startGame()
    );

    // Modified touch handler to ignore button clicks
    if (this.isMobile()) {
      document.addEventListener("touchstart", (e) => {
        // Don't start game if touch is on a button
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
    if (window.innerWidth <= 1280) {
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
      setTimeout(() => {
        this.checkCollisions();
      }, 1000);
      setTimeout(() => {
        this.checkEndbossCollision();
      }, 1000);
      this.checkTrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkJumpCollision();
      this.checkBottleHit();
      this.checkEndbossAlert();
      this.checkGameOver();
    }, 1000 / 60);
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
          setTimeout(() => {
            const currentIndex = this.level.enemies.indexOf(enemy);
            if (currentIndex !== -1) {
              this.level.enemies.splice(currentIndex, 1);
            }}, 1000);}}
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
      if (
        !enemy.isBeingKilled &&
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
      this.checkBottleEnemyCollisions(bottle, bottleIndex);
      this.checkBottleEndbossCollision(bottle, bottleIndex);
    });
  }
  /**
   * Checks for collisions with enemies and updates the bottle count
   */
  checkBottleEnemyCollisions(bottle, bottleIndex) {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      bottle.handleChickenCollision(this, enemyIndex, bottleIndex);
      this.handleDeadEnemy(enemy);
    });
  }
  /**
   * Checks for collisions with the endboss and updates the bottle count
   */
  checkBottleEndbossCollision(bottle, bottleIndex) {
    if (this.level.endboss[0]) {
      bottle.handleEndbossCollision(this, bottleIndex);
    }
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
        this.stopEndboss();
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
   * Stops the endboss and starts the endboss attack
   */
  stopEndboss() {
    this.level.endboss[0].speed = 0;
    setTimeout(() => {
      this.startEndbossAttack();
    }, 1000);
  }
  /**
   * Starts the endboss attack
   */
  startEndbossAttack() {
    this.soundManager.play("chickenAngry");
    this.endbossAttackInterval = setInterval(() => {
      const endboss = this.level.endboss[0];
      if (this.character.x - this.character.width / 2 < endboss.x) {
        endboss.otherDirection = false;
        this.level.endboss[0].x -= 7.5;
      }
      if (this.character.x - this.character.width / 2 > endboss.x) {
        endboss.otherDirection = true;
        this.level.endboss[0].x += 7.5;
      }
      if (this.level.endboss[0].endbossIsDead) {
        clearInterval(this.endbossAttackInterval);
      }
    }, 50);
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
    this.drawBackgroundLayer();
    this.drawUILayer();
    this.drawGameObjects();
  }
  /**
   * Draws the background layer
   */
  drawBackgroundLayer() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
  }
  /**
   * Draws the UI layer
   */
  drawUILayer() {
    this.addToMap(this.statusBarHP);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndbossHP);
  }
  /**
   * Draws the game objects
   */
  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);
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
