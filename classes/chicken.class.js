class Chicken extends MoveableObject {
  width = 70;
  height = 70;
  offset = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];


  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 200 + Math.random() * 3500;
    this.y = 500 + this.height;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveChicken();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isChickenIsDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
