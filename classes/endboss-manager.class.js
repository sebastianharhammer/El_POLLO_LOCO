class EndbossManager {
  constructor(world) {
    this.world = world;
    this.attackInterval = null;
  }

  checkEndbossAlert() {
    let endboss = this.world.level.endboss[0];
    if (endboss) {
      if (endboss.x - this.world.character.x < 400 && !endboss.endbossAttack) {
        this.stopEndboss();
        endboss.endbossAttack = true;
      }
    }
  }

  stopEndboss() {
    this.world.level.endboss[0].speed = 0;
    setTimeout(() => {
      this.startEndbossAttack();
    }, 1000);
  }

  startEndbossAttack() {
    this.world.soundManager.play("chickenAngry");
    this.attackInterval = setInterval(() => {
      const endboss = this.world.level.endboss[0];
      if (this.world.character.x - this.world.character.width / 2 < endboss.x) {
        endboss.otherDirection = false;
        this.world.level.endboss[0].x -= 7.5;
      }
      if (this.world.character.x - this.world.character.width / 2 > endboss.x) {
        endboss.otherDirection = true;
        this.world.level.endboss[0].x += 7.5;
      }
      if (this.world.level.endboss[0].endbossIsDead) {
        clearInterval(this.attackInterval);
      }
    }, 50);
  }

  endbossHit(bottleIndex) {
    let endboss = this.world.level.endboss[0];
    endboss.hit();
    this.world.statusBarEndbossHP.setPercentage(endboss.energy);
    if (endboss.energy <= 0) {
      endboss.endbossIsDead = true;
    }
    if (endboss.endbossIsDead) {
      setTimeout(() => {
        this.world.level.endboss.splice(0, 1);
      }, 1500);
    }
    this.world.throwableObjects.splice(bottleIndex, 1);
    this.world.soundManager.play("endbossHurt");
  }

  cleanup() {
    clearInterval(this.attackInterval);
  }
} 