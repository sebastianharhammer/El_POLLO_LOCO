class ThrowableObject extends MoveableObject {
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
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
    this.speedY = 30;
    this.applyGravity();
    let bottleInterval = setInterval(() => {
      this.x += 7;
      this.animateThrow();
      if (this.y < 405) {
        this.y = 405;
        this.speedY = 0;
        this.x = this.x;
        this.animateSplash();
        clearInterval(bottleInterval);
      }
    }, 25);
  }

  animate() {
    console.log(this.IMAGES_BOTTLE);
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 250);
  }
  animateThrow() {
    console.log(this.IMAGES_BOTTLE_THROW);
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }, 250);
  }
  animateSplash() {
    // Clear previous animation intervals if they exist
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
