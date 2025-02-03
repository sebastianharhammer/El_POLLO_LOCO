class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHP = new StatusBarHP();
  statusBarCoin = new StatusBarCoin();
  statusBarBottles = new StatusBarBottles();
  statusBarEndbossHP = new StatusBarEndbossHP();
  throwableObjects = [];
  bottles = level1.bottles;
  coins = level1.coins;
  chickenIsDead;
  endboss = this.level.endboss[0];
  endbossAttack = false;
  throwCooldown = false;
  gameStarted = false;
  startScreen = new StartScreen();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkGameStart();
  }

  setWorld() {
    this.character.world = this;
  }

  checkGameStart() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Enter' && !this.gameStarted) {
        this.gameStarted = true;
        this.run();
      }
    });
  }

  run() {
    setInterval(() => {
      setTimeout(() => {
        this.checkCollisions();
      }, 100);
      setTimeout(() => {
        this.checkEndbossCollision();
      }, 100);
      this.checkTrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkJumpCollision();
      this.checkBottleHit();
      this.checkEndbossAlert();
    }, 50);
  }

  checkJumpCollision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isJumpColliding(enemy)) {
        console.log("jump collision");
        this.chickenDies(index, null);
      }
    });
  }

  checkTrowObjects() {
    if (this.keyboard.D) {
      if (this.statusBarBottles.percentage > 9 && !this.throwCooldown) {
        const throwPositionX = this.character.otherDirection 
          ? this.character.x  // If facing left, throw from character's position
          : this.character.x + 100;  // If facing right, throw from ahead of character
        
        let throwableObject = new ThrowableObject(
          throwPositionX,
          this.character.y + 100,
          this.statusBarBottles,
          this
        );
        this.throwableObjects.push(throwableObject);
        
        this.throwCooldown = true;
        setTimeout(() => {
          this.throwCooldown = false;
        }, 250);
      } else if (this.statusBarBottles.percentage <= 9) {
        console.log('Not enough bottles!');
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.chickenIsDead) {
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
          console.log("chicken colliding with bottle");
          this.chickenDies(enemyIndex, bottleIndex);
        }
      });
      if (this.level.endboss[0] && bottle.isColliding(this.level.endboss[0]) && !this.level.endboss[0].endbossIsDead) {
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
  }

  chickenDies(enemyIndex, bottleIndex) {
    this.level.enemies[enemyIndex].speed = 0;
    this.level.enemies[enemyIndex].chickenIsDead = true;
    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
      this.throwableObjects.splice(bottleIndex, 1);
    }, 1500);
  }

  checkEndbossAlert() {
    let endboss = this.level.endboss[0];
    if (endboss) {
        if (endboss.x - this.character.x < 300 && !endboss.endbossAttack) {
          this.stopEndboss();
          endboss.endbossAttack = true;
        }
    }
  }

  stopEndboss() {
    console.log("endboss stopped speed before:", this.level.endboss[0].speed);
    this.level.endboss[0].speed = 0;
    console.log("endboss stopped speed after:", this.level.endboss[0].speed);
    setTimeout(() => {
      this.startEndbossAttack();
    }, 1000);
  }

  startEndbossAttack() {
    
    const EndbossAttacking = setInterval(() => {
    const endboss = this.level.endboss[0];
    if (this.character.x - (this.character.width)/2 < endboss.x) {
      endboss.otherDirection = false;
      this.level.endboss[0].x  -= 7.5;
    } if (this.character.x - (this.character.width)/2 > endboss.x) {
      endboss.otherDirection = true;
      this.level.endboss[0].x += 7.5;
    } if (this.level.endboss[0].endbossIsDead) {
      console.log("Interval cleared");
      clearInterval(EndbossAttacking);
    }}, 50);
}

  collectCoin(index) {
    this.level.coins.splice(index, 1);
    this.statusBarCoin.setPercentage(this.statusBarCoin.percentage + 10);
  }

  collectBottle(index) {
    this.level.bottles.splice(index, 1);
    this.statusBarBottles.setPercentage(this.statusBarBottles.percentage + 10);
    console.log("Bottle collected");
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.gameStarted) {
      this.startScreen.draw(this.ctx);
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
}
