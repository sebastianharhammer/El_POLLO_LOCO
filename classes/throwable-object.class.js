/**
 * Represents a throwable object (bottle) in the game that can be thrown and collide with other objects.
 * @extends CollidableObject
 */
class ThrowableObject extends CollidableObject {
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  };
  /**
   * Creates a new ThrowableObject instance.
   * @param {number} x - The initial x-coordinate position
   * @param {number} y - The initial y-coordinate position
   * @param {Object} statusBarBottles - Reference to the bottles status bar
   * @param {Object} world - Reference to the game world
   */
  constructor(x, y, statusBarBottles, world) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.statusBarBottles = statusBarBottles;
    this.world = world;
    this.throw();
  }
  IMAGES_BOTTLE = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_BOTTLE_THROW = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png"
  ];
  IMAGES_BOTTLE_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Initiates the throwing action of the bottle.
   * Decreases the bottle count and applies physics for the throw.
   */
  throw() {
    if (this.statusBarBottles.percentage <= 0) {
        return;
    }
    this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 10);
    this.world.soundManager.play('throw');
    this.speedY = 30;
    this.applyGravity();
    const throwingLeft = this.world.character.otherDirection;
    this.startBottleMovement(throwingLeft);
  }

  /**
   * Starts the bottle's movement animation and trajectory.
   * @param {boolean} throwingLeft - Direction of the throw (true for left, false for right)
   */
  startBottleMovement(throwingLeft) {
    const THROW_SPEED = 20;
    if (this.bottleInterval) clearInterval(this.bottleInterval);
    this.bottleInterval = setInterval(() => {
        this.x += throwingLeft ? -THROW_SPEED : THROW_SPEED;
        this.animateThrow();
        if (this.y >= 600) {
            this.handleBottleImpact();
            clearInterval(this.bottleInterval);
        }
    }, 50);
  }

  /**
   * Handles the bottle's impact when hitting the ground.
   * Stops movement, removes gravity effect, and triggers splash animation.
   */
  handleBottleImpact() {
    this.y = 600;
    this.speedY = 0;
    this.world.soundManager.play('bottleHit');
    this.removeGravity();
    setTimeout(() => {
      this.applyGravity();
    }, 250);
    if (this.bottleInterval) clearInterval(this.bottleInterval);
    if (this.throwInterval) clearInterval(this.throwInterval);
    this.animateSplash();
  }

  /**
   * Animates the bottle's rotation while in flight.
   */
  animateThrow() {
    if (this.throwInterval) clearInterval(this.throwInterval);
    this.throwInterval = setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }, 35);
  }

  /**
   * Animates the bottle's splash effect upon impact.
   */
  animateSplash() {
    if (this.splashInterval) clearInterval(this.splashInterval);
    let i = 0;
    this.splashInterval = setInterval(() => {
        if (i < this.IMAGES_BOTTLE_SPLASH.length) {
            this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[i]];
            i++;
        } else {
            clearInterval(this.splashInterval);
            this.splashInterval = null;
        }
    }, 100);
  }
}
