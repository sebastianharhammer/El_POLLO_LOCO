/**
 * Represents a small chicken enemy that extends CollidableObject.
 * @extends CollidableObject
 */
class SmallChicken extends CollidableObject {
    width = 60;
    height = 60;
    offset = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
    };
    IMAGES_WALKING = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
      "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
      "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
      "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
    ];
  
  

    /**
     * Creates a new SmallChicken instance.
     * Initializes the chicken's position, loads images, and starts animation.
     */
    constructor() {
      super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 200 + Math.random() * 3500;
      this.y = 520 + this.height;
      this.animate();
    }
  

    /**
     * Handles the chicken's animation by setting up intervals for movement and sprite animation.
     * Updates the chicken's position and switches between walking and dead animations based on state.
     */
    animate() {
      setInterval(() => {
        this.moveChicken();
      }, 1000 / 30);
  
      setInterval(() => {
        if (this.isChickenIsDead()) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }, 100);
    }
  }
  