class ThrowableObject extends MoveableObject {
  constructor(x, y, statusBarBottles) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.statusBarBottles = statusBarBottles;
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
    if (this.statusBarBottles.percentage > 0) {
      this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 10);
      this.speedY = 10;
      this.applyGravity();
      let bottleInterval = setInterval(() => {
        this.x += 30;
        this.animateThrow();
        if (this.y > 600) {
          this.y = 600;
          this.x = this.x;
          this.speedY = 0;
          clearInterval(bottleInterval);
          this.animateSplash();
        }
      }, 50);
    } else {
      return  ;
    }
  }



  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 250);
  }
  animateThrow() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_THROW);
    }, 550);
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
