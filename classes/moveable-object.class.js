class MoveableObject {
  x = 120;
  y = 250;
  height = 250;
  width = 125;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; //let i = 7 % 6; => 1 Rest 1
    //i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0 ...
    //i ist immer der Rest
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
