class WorldCollisions {
    character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 200;
  statusBarHP = new StatusBarHP();
  statusBarCoin = new StatusBarCoin();
  statusBarBottles = new StatusBarBottles();
  statusBarEndbossHP = new StatusBarEndbossHP();
  moveableObject = new MoveableObject();
  throwableObjects = [];
  bottles = level1.bottles;
  coins = level1.coins;
  chickenIsDead;
  endboss = this.level.endboss[0];
  endbossAttack = false;
  throwCooldown = false;
  gameStarted = false;
  c;
  startScreen = new StartScreen();
  gameOver = false;
  gameStartTime;
  endScreen;
  soundManager = new SoundManager();
  endbossAttackInterval;
  isResetting = false;
  gameInterval;
  charIsntDead = true;
  chickenWhichDied = [];

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom
    );
  }


  isJumpColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.height - this.offset.bottom < mo.y + mo.height/2 &&
      this.speedY < 0
    );
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

    checkEndbossAlert() {
        let endboss = this.level.endboss[0];
        if (endboss) {
          if (endboss.x - this.character.x < 400 && !endboss.endbossAttack) {
            this.stopEndboss();
            endboss.endbossAttack = true;
          }
        }
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

    collectBottle(index) {
        this.level.bottles.splice(index, 1);
        this.statusBarBottles.percentage += 10;
        this.soundManager.play("collect");
    }

    collectCoin(index) {
        this.level.coins.splice(index, 1);
        this.statusBarCoin.percentage += 10;
        this.soundManager.play("collect");
    }

    chickenDies(enemyIndex, bottleIndex) {
        if (!this.level.enemies[enemyIndex]) return;
        
        this.soundManager.play("chicken");
        const chicken = this.level.enemies[enemyIndex];
        chicken.speed = 0;
        chicken.chickenIsDead = true;
        
        if (bottleIndex !== null) {
            this.throwableObjects.splice(bottleIndex, 1);
        }
        
        this.chickenWhichDied.push(chicken);
        setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
        }, 1000);
    }

    endbossHit(bottleIndex) {
        let endboss = this.level.endboss[0];
        if (!endboss || endboss.endbossIsDead) return;

        endboss.hit();
        this.statusBarEndbossHP.setPercentage(endboss.energy);
        
        if (endboss.energy <= 0) {
            endboss.endbossIsDead = true;
            setTimeout(() => {
                this.level.endboss.splice(0, 1);
            }, 1500);
        }
        
        this.throwableObjects.splice(bottleIndex, 1);
        this.soundManager.play("endbossHurt");
    }

    isEndbossIsDead() {
        if (this.endbossIsDead) {
          return true;
        }
      }

        
  isChickenColliding(bottle) {
    return this.isColliding(bottle);
  }

  isChickenIsDead() {
    if (this.chickenIsDead) {
      return true;
    }
  }

  chickenDies(enemyIndex, bottleIndex, soundManager, throwableObjects, chickenWhichDied) {
    if (!level1.enemies[enemyIndex]) return;
    
    soundManager.play("chicken");
    const chicken = level1.enemies[enemyIndex];
    chicken.speed = 0;
    chicken.chickenIsDead = true;
    
    if (bottleIndex !== null) {
      throwableObjects.splice(bottleIndex, 1);
    }
    
    chickenWhichDied.push(chicken);
    setTimeout(() => {
      world.level.enemies.splice(enemyIndex, 1);
    }, 1000);
  }



  stopEndboss() {
    this.level.endboss[0].speed = 0;
    setTimeout(() => {
      this.startEndbossAttack();
    }, 1000);
  }
} 