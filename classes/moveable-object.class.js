class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  lastHit = 0;

  hit() {
    this.energy -= 2;
    console.log("Energie: ", this.energy);
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
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
      return this.y < 180;
    }
  }

  /*   if (character.x + character.width > chicken.x 
  && character.y + character.height > chicken.y 
  && character.x < chicken.x 
  && character.y < chicken.y + chicken.height) */

  //v2
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  //besser aus vid.
  /* isColliding (obj) {
    return  (
    (this.X + this.width) >= obj.X                  && 
    this.X <= (obj.X + obj.width)                   &&
    (this.Y + this.offsetY + this.height) >= obj.Y  &&
    (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
    ); 
  } */

  playAnimation(images) {
    let i = this.currentImage % images.length; //let i = 7 % 6; => 1 Rest 1
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
