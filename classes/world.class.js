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
  endbossIsDead;
  endbossAttack = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkEndbossCollision();
      this.checkTrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkBottleHit();
      this.checkEndbossAlert();
    }, 250);
  }


  checkTrowObjects() {
    if (this.keyboard.D && this.statusBarBottles.percentage > 9) {
      let throwableObject = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
        this.statusBarBottles
      );
      this.throwableObjects.push(throwableObject);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHP.setPercentage(this.character.energy);
      }
    });
  }
  checkEndbossCollision() {
    if (this.character.isColliding(this.level.endboss[0])) {
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
      if (this.level.endboss[0] && bottle.isColliding(this.level.endboss[0])) {
        
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
    
    if (endboss.isDead()) {
        endboss.endbossIsDead = true;
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
    if (!this.level.endboss[0].endbossAttack) {
    if (this.level.endboss[0].x - this.character.x < 400) {
      this.level.endboss[0].endbossAttack = true;  
      this.level.endboss[0].alert = true;
      this.stopEndboss();
      setTimeout(() => {
        this.startEndbossAttack();
      }, 1000);
    }}
  }
  stopEndboss() {
    console.log("endboss stopped speed before:", this.level.endboss[0].speed);
    this.level.endboss[0].speed = 0;
    console.log("endboss stopped speed after:", this.level.endboss[0].speed);
  }
  startEndbossAttack() {
    setInterval(() => {
    const endboss = this.level.endboss[0];
    if (this.character.x - (this.character.width)/2 < endboss.x) {
      endboss.otherDirection = false;
      this.level.endboss[0].x  -= 7.5;
      
    } if (this.character.x - (this.character.width)/2 > endboss.x) {
      endboss.otherDirection = true;
      this.level.endboss[0].x += 7.5;
      }
    }, 50);
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

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0); //
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
