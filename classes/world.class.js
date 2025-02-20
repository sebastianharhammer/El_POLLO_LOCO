class World extends Var {
  

  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkGameStart();
    this.gameStartTime = new Date().getTime();
  }

  setWorld() {
    this.character.world = this;
  }

  checkGameStart() {
    const startGame = () => {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.run();
        if (window.innerWidth <= 1280) {
          document
            .getElementById("mobileOverlayContainerTop")
            .classList.add("d-none");
          document
            .getElementById("mobileOverlayContainerBottom")
            .classList.remove("d-none");
        }
      }
    };

    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && window.innerWidth > 1280) {
        startGame();
      }
    });

    if (this.isMobile()) {
      document.addEventListener("touchstart", startGame);
    }
  }

  isMobile() {
    if (window.innerWidth <= 1280) {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    return false;
  }

  run() {
    if (this.gameStarted) {
    this.soundManager.play("background");
    }
    this.gameInterval = setInterval(() => {
      setTimeout(() => {
        this.checkCollisions();
      }, 500);
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
    }, 1000/60);
  }


  checkJumpCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isJumpColliding(enemy) && !this.chickenWhichDied.includes(enemy)) {
        this.chickenDies(index, null);
        this.chickenWhichDied.push(enemy);
        enemy.isBeingKilled = true;
      }
    });
  }

  checkTrowObjects() {
    if (this.keyboard.D) {
      if (this.statusBarBottles.percentage > 9 && !this.throwCooldown) {
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
      } else if (this.statusBarBottles.percentage <= 9) {
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isBeingKilled && !this.chickenWhichDied.includes(enemy) && this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHP.setPercentage(this.character.energy);
      }
    });
  }

  checkEndbossCollision() {
    let endboss = this.level.endboss[0];
    if (endboss && this.character.isColliding(endboss)) {
      this.character.hit();
      this.statusBarHP.setPercentage(this.character.energy);
    }
  }

  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  checkBottleHit() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          this.chickenDies(enemyIndex, bottleIndex);
        }
      });
      if (
        this.level.endboss[0] &&
        bottle.isColliding(this.level.endboss[0]) &&
        !this.level.endboss[0].endbossIsDead
      ) {
        this.endbossHit(bottleIndex);
      }
    });
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Diff in ms
    timePassed = timePassed / 1000; //Diff in s
    return timePassed < 1;
  }

  endbossHit(bottleIndex) {
    let endboss = this.level.endboss[0];
    endboss.hit();
    this.statusBarEndbossHP.setPercentage(endboss.energy);
    if (endboss.energy <= 0) {
      endboss.endbossIsDead = true;
    }
    if (endboss.endbossIsDead) {
      setTimeout(() => {
        this.level.endboss.splice(0, 1);
      }, 1500);
    }
    this.throwableObjects.splice(bottleIndex, 1);
    this.soundManager.play("endbossHurt");
  }

  chickenDies(enemyIndex, bottleIndex) {
    this.soundManager.play("chicken");
    this.level.enemies[enemyIndex].speed = 0;
    this.level.enemies[enemyIndex].chickenIsDead = true;
    this.throwableObjects.splice(bottleIndex, 1);
    this.chickenWhichDied.push(this.level.enemies[enemyIndex]);
    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }, 1000);
  }

  checkEndbossAlert() {
    let endboss = this.level.endboss[0];
    if (endboss) {
      if (endboss.x - this.character.x < 400 && !endboss.endbossAttack) {
        this.stopEndboss();
        endboss.endbossAttack = true;
      }
    }
  }

  stopEndboss() {
    this.level.endboss[0].speed = 0;
    setTimeout(() => {
      this.startEndbossAttack();
    }, 1000);
  }

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

  collectCoin(index) {
    this.soundManager.play("coin");
    this.level.coins.splice(index, 1);
    this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 10);
  }

  collectBottle(index) {
    this.soundManager.play("bottle");
    this.level.bottles.splice(index, 1);
    this.statusBarBottles.setPercentage(this.statusBarBottles.percentage + 10);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.gameStarted) {
      this.startScreen.draw(this.ctx);
    } else if (this.gameOver) {
      this.endScreen.draw(this.ctx);
    } else {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);

      this.ctx.translate(-this.camera_x, 0);
      this.addToMap(this.statusBarHP);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarBottles);
      this.addToMap(this.statusBarEndbossHP);
      this.ctx.translate(this.camera_x, 0);

      this.addToMap(this.character);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.endboss);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.throwableObjects);
      this.ctx.translate(-this.camera_x, 0);
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkGameOver() {
    // Don't check for game over while resetting
    if (this.isResetting) return;

    if (this.level.endboss[0]?.endbossIsDead && !this.gameOver) {
      this.soundManager.pause("background");
      this.soundManager.pause("chickenAngry");
      this.soundManager.play("victory");
      setTimeout(() => {
        this.gameOver = true;
        const gameTimeInSeconds = (new Date().getTime() - this.gameStartTime) / 1000;
        this.endScreen = new EndScreen(
          this.statusBarCoin.percentage / 10,
          this.statusBarHP.percentage / 20,
          this.statusBarBottles.percentage / 10,
          gameTimeInSeconds,
          true // isVictory = true
        );
        
        if (window.innerWidth <= 1280) {
          document.getElementById("mobileOverlayContainerTop").classList.remove("d-none");
          document.getElementById("mobileOverlayContainerBottom").classList.add("d-none");
        }
      }, 2000);
    }

    if (this.character.energy <= 0 && !this.gameOver) {
      this.soundManager.pause("background");
      this.soundManager.play("defeat");
      setTimeout(() => {
        this.gameOver = true;
        this.endScreen = new EndScreen(
          this.statusBarCoin.percentage / 10,
          0,
          this.statusBarBottles.percentage / 10,
          0,
          false // isVictory = false
        );
        if (window.innerWidth <= 1280) {
          document.getElementById("mobileOverlayContainerTop").classList.remove("d-none");
          document.getElementById("mobileOverlayContainerBottom").classList.add("d-none");
        }
      }, 2000);
    }
  }

  resetGame() {
    // Ensure we're not already in the process of resetting
    if (this.isResetting) return;
    this.isResetting = true;

    // Remove existing touch event listeners before resetting
    const existingTouchListeners = document.getElementsByTagName("*");
    for (let element of existingTouchListeners) {
        element.removeEventListener("touchstart", () => {});
    }

    // Stop all sounds and intervals first
    this.soundManager.stopAll();
    clearInterval(this.character.animationInterval);
    clearInterval(this.character.movementInterval);
    clearInterval(this.endbossAttackInterval);
    clearInterval(this.gameInterval);

    // Reset character
    this.character = new Character();
    this.character.world = this;

    // Create a fresh level instance
    this.level = createLevel1();

    // Reset status bars
    this.statusBarHP = new StatusBarHP();
    this.statusBarCoin = new StatusBarCoin();
    this.statusBarBottles = new StatusBarBottles();
    this.statusBarEndbossHP = new StatusBarEndbossHP();

    // Reset world properties
    this.camera_x = 200;
    this.throwableObjects = [];
    this.endbossAttack = false;
    this.throwCooldown = false;
    this.gameOver = false;
    this.gameStarted = false;
    this.gameStartTime = new Date().getTime();
    this.endScreen = null;
    this.endboss = this.level.endboss[0];

    // Add a small delay before starting game systems
    setTimeout(() => {
      this.isResetting = false;
      // Re-initialize game start detection
      this.checkGameStart();
    }, 1500);
  }

  showStartScreen() {
    this.gameStarted = false;
    this.startScreen = new StartScreen();
  }
}
