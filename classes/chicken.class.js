class Chicken extends MoveableObject {
  width = 70;
  height = 70;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];
  speed = 0.15 + Math.random() + 0.25;
  offset = {
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
};

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png"); 
    this.x = 200 + Math.random() * 3000;
    this.y = 500 + this.height;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
