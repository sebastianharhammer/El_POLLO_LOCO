/**
 * Represents a moveable object in the game that can be affected by physics and interactions.
 * @extends DrawableObject
 */
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
  energy = 100;

  /**
   * Records the current timestamp for movement tracking.
   */
  getTimeStamp() {
    this.lastMovement = new Date().getTime();
  }

  /**
   * Checks if the object has been idle for more than 5 seconds.
   * @returns {boolean} True if object has been idle for more than 5 seconds.
   */
  isLongIdle() {
    let timePassed = new Date().getTime() - this.lastMovement; //Diff in ms
    timePassed = timePassed / 1000; //Diff in s
    return timePassed > 5;
  }

  /**
   * Handles damage taken by the object, reducing energy after a short delay.
   */
  hit() {
    setTimeout(() => {
      this.energy -= 1;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }, 1000/60);
  }

  /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if the object was hit within the last 0.5 seconds.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Diff in ms
    timePassed = timePassed / 1000; //Diff in s
    return timePassed < 0.5;
  }

  /**
   * Applies gravity effect to the object, affecting vertical movement.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Removes the gravity effect from the object.
   */
  removeGravity() {
    clearInterval(this.gravityInterval);
  }

  /**
   * Checks if the object is above ground level.
   * @returns {boolean} True if object is above ground or is a ThrowableObject.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 380;
    }
  }

  /**
   * Checks if this object is colliding with another moveable object.
   * @param {MoveableObject} mo - The other moveable object to check collision with.
   * @returns {boolean} True if objects are colliding.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if this object is colliding with another object while jumping.
   * @param {MoveableObject} mo - The other moveable object to check collision with.
   * @returns {boolean} True if objects are colliding during jump.
   */
  isJumpColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.height - this.offset.bottom < mo.y + mo.height / 2 &&
      this.speedY < 0
    );
  }

  /**
   * Plays an animation using the provided image array.
   * @param {string[]} images - Array of image paths for animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; 
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if a chicken is colliding with a bottle.
   * @param {MoveableObject} bottle - The bottle object to check collision with.
   * @returns {boolean} True if chicken and bottle are colliding.
   */
  isChickenColliding(bottle) {
    return this.isColliding(bottle);
  }

  /**
   * Checks if the chicken is dead.
   * @returns {boolean} True if chicken is dead.
   */
  isChickenIsDead() {
    if (this.chickenIsDead) {
      return true;
    }
  }

  /**
   * Updates the chicken's movement speed.
   */
  updateChickenSpeed() {
    const baseSpeed = 2;
    const variation = Math.random() * 0.5;
    this.speed = this.isChickenIsDead() ? 0 : baseSpeed + variation;
  }

  /**
   * Handles chicken movement logic.
   */
  moveChicken() {
    this.updateChickenSpeed();
    if (!this.isChickenIsDead()) {
      if (this.otherDirection) {
        this.x += this.speed; 
        if (this.x >= 3000) {
          this.otherDirection = false;
        }
      } else {
        this.x -= this.speed;
        if (this.x <= 300) {
          this.otherDirection = true;
        }
      }
    }
  }

  /**
   * Checks if the endboss is dead.
   * @returns {boolean} True if endboss is dead.
   */
  isEndbossIsDead() {
    if (this.endbossIsDead) {
      return true;
    }
  }

  /**
   * Handles endboss movement logic.
   */
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

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Updates camera position based on object movement.
   * @todo Work in progress
   */
  setCamera() {
    if (!this.otherDirection && this.world.camera_x > 200) {
      this.world.camera_x -= 10;
      if (this.world.camera_x <= 200) {
        this.world.camera_x = 200;
      }
    }
    if (this.otherDirection && this.world.camera_x < 1500) {
      this.world.camera_x += 10;
      if (this.world.camera_x >= 1500) {
        this.world.camera_x = 1500;
      }
    }
  }

  /**
   * Makes the object jump and plays jump sound.
   */
  jump() {
    this.world.soundManager.play("jump");
    this.speedY = 30;
  }
}
