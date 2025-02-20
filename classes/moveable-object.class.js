class MoveableObject extends DrawableObject {
  speed = 0.15;
  chickenSpeed = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  endbossIsDead = false;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  lastHit = 0;
  world;


  getTimeStamp() {
    this.lastMovement = new Date().getTime();
  }
  isLongIdle() {
    let timePassed = new Date().getTime() - this.lastMovement; //Diff in ms
    timePassed = timePassed / 1000; //Diff in s
    return timePassed > 5;
  }

  hit() {
    setTimeout(() => {
      this.energy -= 1;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }, 250);
  }
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Diff in ms
    timePassed = timePassed / 1000; //Diff in s
    return timePassed < 1;
  }
  isDead() {
    return this.energy == 0;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 380;
    }
  }


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


  playAnimation(images) {
    let i = this.currentImage % images.length; //let i = 7 % 6; => 1 Rest 1
    //i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0 ...
    //i ist immer der Rest
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  

  
  isChickenColliding(bottle) {
    return this.isColliding(bottle);
  }

  isChickenIsDead() {
    if (this.chickenIsDead) {
      return true;
    }
  }

  moveChicken() {
    const baseSpeed = 2;
    const variation = Math.random() * 0.5;
    this.speed = baseSpeed + variation;
    if (this.isChickenIsDead()) {
      this.speed = 0;
    } else {
      if (this.otherDirection) {
        this.x += this.speed; // Moving right
        if (this.x >= 3000) {
          this.otherDirection = false;
        }
      } else {
        this.x -= this.speed; // Moving left
        if (this.x <= 300) {
          this.otherDirection = true;
        }
      }
    }
  }
  isEndbossIsDead() {
    if (this.endbossIsDead) {
      return true;
    }
  }
  moveEndboss() {
    this.speed = 2;
    if (this.isEndbossIsDead()) {
      this.speed = 0;
    } else {
      if (this.otherDirection) {
        this.x += this.speed; // Moving right
        if (this.x >= 3700) {
          this.otherDirection = false;
        }
      } else {
        this.x -= this.speed; // Moving left
        if (this.x <= 3300) {
          this.otherDirection = true;
        }
      }
    }
  }

  moveRight() {
    this.x += this.speed;
    
  }

  moveLeft() {
    this.x -= this.speed;
  }

  setCamera() {
    if (!this.otherDirection && this.world.camera_x > 200) {
      this.world.camera_x -= 10;
      console.log(this.world.camera_x);
      if (this.world.camera_x <= 200) {
        this.world.camera_x = 200;
      }
    }
    if (this.otherDirection && this.world.camera_x < 1500) {
      this.world.camera_x += 10;
      console.log(this.world.camera_x);
      if (this.world.camera_x >= 1500) {
        this.world.camera_x = 1500;
      }
    }
  }
  jump() {
    this.world.soundManager.play('jump');
    this.speedY = 30;
  }
}
