class ThrowableObject extends MoveableObject {
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
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
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

  throw() {
    if (this.statusBarBottles.percentage <= 0) {
        return;
    }
    
    this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 10);
    

    this.speedY = 30;
    this.applyGravity();
    
    const throwingLeft = this.world.character.otherDirection;
    const THROW_SPEED = 20;
    
    let bottleInterval = setInterval(() => {
        this.x += throwingLeft ? -THROW_SPEED : THROW_SPEED;
        this.animateThrow();
        if (this.y >= 600) {
            this.handleBottleImpact();
            clearInterval(bottleInterval);
        }
    }, 50);
  }

  handleBottleImpact() {
    this.y = 600;
    this.speedY = 0;
    this.animateSplash();
    this.world.soundManager.play('bottleHit');
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
      }, 50);
  }

  animateThrow() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }, 50);
  }
  animateSplash() {
    if (this.splashInterval) clearInterval(this.splashInterval);
    let i = 0;
    this.splashInterval = setInterval(() => {
      if (i < this.IMAGES_BOTTLE_SPLASH.length) {
        this.img = this.imageCache[this.IMAGES_BOTTLE_SPLASH[i]];
        i++;
      } else {
        clearInterval(this.splashInterval);
      }
    }, 50);
  }
}
