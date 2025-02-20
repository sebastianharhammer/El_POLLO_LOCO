/**
 * Represents a playable character in the game that can move, jump, and animate.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
  energy = 200;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png"
  ];
  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png"
  ];
  world;
  speed = 5;
  walkingSound = false;
  offset = {
    top: 100,
    left: 20,  
    right: 30,
    bottom: 10,
  };
  lastWalkingSoundTime = 0;
  lastHitSoundTime = 0;

  /**
   * Creates a new Character instance and initializes its properties and animations.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.y = 300;
    this.applyGravity();
    this.animate();
  }
  
  /**
   * Initializes both movement and animation intervals for the character.
   */
  animate() {
    this.initializeMovementInterval();
    this.initializeAnimationInterval();
  }

  /**
   * Sets up the interval for handling character movement and camera updates.
   * @private
   */
  initializeMovementInterval() {
    this.movementInterval = setInterval(() => {
      this.handleMovement();
      this.updateCamera();
    }, 1000 / 60);
  }

  /**
   * Handles character movement based on keyboard input.
   * @private
   */
  handleMovement() {
    if (this.canMoveRight()) {
      this.moveRight();
      this.setCamera();
      this.otherDirection = false;
      this.getTimeStamp();
    }
    if (this.canMoveLeft()) {
      this.moveLeft();
      this.otherDirection = true;
      this.getTimeStamp();
    }
    if (this.canJump()) {
      this.jump();
      this.getTimeStamp();
    }
  }

  /**
   * Checks if the character can move right.
   * @returns {boolean} True if the character can move right, false otherwise.
   * @private
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDead();
  }

  /**
   * Checks if the character can move left.
   * @returns {boolean} True if the character can move left, false otherwise.
   * @private
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0 && !this.isDead();
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} True if the character can jump, false otherwise.
   * @private
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDead();
  }

  /**
   * Updates the camera position relative to the character.
   * @private
   */
  updateCamera() {
    this.world.camera_x = -this.x + 200;
  }

  /**
   * Sets up the interval for handling character animations.
   * @private
   */
  initializeAnimationInterval() {
    this.animationInterval = setInterval(() => {
      this.updateCharacterAnimation();
    }, 100);
  }

  /**
   * Updates the character's animation based on its current state.
   * @private
   */
  updateCharacterAnimation() {
    if (this.isHurt() && !this.isDead()) {
      this.playAnimation(this.IMAGES_HURT);
      this.handleHitSound();
      this.getTimeStamp();
    } else if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.handleWalkingSound();
    } else {
      this.handleIdleAnimation();
    }
  }

  /**
   * Handles the character's idle animation states.
   * @private
   */
  handleIdleAnimation() {
    if (this.isLongIdle()) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Handles the walking sound for the character.
   * @private
   */
  handleWalkingSound() {
    if (this.world && this.world.soundManager) {
      const currentTime = Date.now();
      if ((this.canMoveRight() || this.canMoveLeft()) && !this.isAboveGround() && 
          currentTime - this.lastWalkingSoundTime >= 300) {
          this.world.soundManager.play("walking");
          this.lastWalkingSoundTime = currentTime;
      }
    }
  }

  /**
   * Handles the hit sound for the character.
   * @private
   */
  handleHitSound() {
    if (this.world && this.world.soundManager) {
      const currentTime = Date.now();
      if (this.isHurt() && !this.isDead() && 
          currentTime - this.lastHitSoundTime >= 300) {
          this.world.soundManager.play("hurt");
          this.lastHitSoundTime = currentTime;
      }
    }
  }

  /**
   * Checks if the character is dead (energy is 0).
   * @returns {boolean} True if the character is dead, false otherwise.
   */
  isDead() {
    return this.energy <= 0;
  }
}
