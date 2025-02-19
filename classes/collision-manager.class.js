class CollisionManager {
  constructor(world) {
    this.world = world;
  }

  checkCollisions() {
    this.world.level.enemies.forEach((enemy) => {
      if (!enemy.isBeingKilled && 
          !this.world.chickenWhichDied.includes(enemy) && 
          this.world.character.isColliding(enemy)) {
        this.world.character.hit();
        this.world.statusBarHP.setPercentage(this.world.character.energy);
      }
    });
  }

  checkEndbossCollision() {
    let endboss = this.world.level.endboss[0];
    if (endboss && this.world.character.isColliding(endboss)) {
      this.world.character.hit();
      this.world.statusBarHP.setPercentage(this.world.character.energy);
    }
  }

  checkCoinCollisions() {
    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  checkBottleCollisions() {
    this.world.level.bottles.forEach((bottle, index) => {
      if (this.world.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  checkBottleHit() {
    this.world.throwableObjects.forEach((bottle, bottleIndex) => {
      this.world.level.enemies.forEach((enemy, enemyIndex) => {
        if (bottle.isColliding(enemy)) {
          this.chickenDies(enemyIndex, bottleIndex);
        }
      });
      if (this.world.level.endboss[0] &&
          bottle.isColliding(this.world.level.endboss[0]) &&
          !this.world.level.endboss[0].endbossIsDead) {
        this.world.endbossManager.endbossHit(bottleIndex);
      }
    });
  }

  checkJumpCollision() {
    this.world.level.enemies.forEach((enemy, index) => {
      if (this.world.character.isJumpColliding(enemy) && 
          !this.world.chickenWhichDied.includes(enemy)) {
        this.chickenDies(index, null);
        this.world.chickenWhichDied.push(enemy);
        enemy.isBeingKilled = true;
      }
    });
  }

  chickenDies(enemyIndex, bottleIndex) {
    this.world.soundManager.play("chicken");
    this.world.level.enemies[enemyIndex].speed = 0;
    this.world.level.enemies[enemyIndex].chickenIsDead = true;
    this.world.throwableObjects.splice(bottleIndex, 1);
    this.world.chickenWhichDied.push(this.world.level.enemies[enemyIndex]);
    setTimeout(() => {
      this.world.level.enemies.splice(enemyIndex, 1);
    }, 1000);
  }

  collectCoin(index) {
    this.world.soundManager.play("coin");
    this.world.level.coins.splice(index, 1);
    this.world.statusBarCoin.setPercentage(this.world.statusBarCoin.percentage + 10);
  }

  collectBottle(index) {
    this.world.soundManager.play("bottle");
    this.world.level.bottles.splice(index, 1);
    this.world.statusBarBottles.setPercentage(this.world.statusBarBottles.percentage + 10);
  }
} 