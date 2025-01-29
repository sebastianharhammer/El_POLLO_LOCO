class World {
  character = new Character();
  level = level1;
  /* enemies = level1.enemies; */
  /* clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects; */
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarHP = new StatusBarHP();
  statusBarCoin = new StatusBarCoin();
  statusBarBottles = new StatusBarBottles();
  throwableObjects = [];
  bottles = level1.bottles;
  coins = level1.coins;





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
      this.checkTrowObjects();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
    }, 250);
  }




  checkTrowObjects() {
    if(this.keyboard.D) {
      let throwableObject = new ThrowableObject(this.character.x + 100, this.character.y + 100);
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
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
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
