/**
 * Represents a cloud object that moves across the screen.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
    y = 20;
    width = 250;
    height = 250;
    speed = 0.15;
    /** @type {string[]} Array of cloud image paths */
    IMAGES_CLOUD = [
        "img/5_background/layers/4_clouds/1.png",
        "img/5_background/layers/4_clouds/2.png"
    ];

    /**
     * Creates a new Cloud instance.
     * Initializes position, loads image, and starts animation.
     */
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        setInterval(() => {
            this.displayNextCloud();
        }, 500);
        this.x = 0 + Math.random() * 3000;
        this.animate();
    }

    /**
     * Starts the cloud's movement animation.
     * Updates position every frame (60 FPS).
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Handles cloud recycling when it moves off screen.
     * Loads a random cloud image and resets position.
     */
    displayNextCloud() {
        if (this.x < -this.width) {
            let randomCloud = Math.floor(Math.random() * this.IMAGES_CLOUD.length);
            this.loadImage(this.IMAGES_CLOUD[randomCloud]);
            this.x = 2500 + Math.random() * 500; // Spawn new cloud on the right
            this.y = 20 + Math.random() * 50; // Slight random height variation
        }
    }
}