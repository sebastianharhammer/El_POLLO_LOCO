/**
 * Represents a bottle object in the game that can be collected.
 * @extends CollidableObject
 */
class Bottle extends CollidableObject {
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };
    height = 80;
    width = 80;
    y = 1000;
    x = 300;
    /** Array of image paths for bottle sprites */
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a new Bottle instance.
     * @param {number} x - The horizontal position of the bottle.
     * @param {number} y - The vertical position of the bottle.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLES[0]);
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Randomly switches between two bottle sprites for animation.
     */
    animate() {
        if (Math.random() > 0.5) {
            this.loadImage(this.IMAGES_BOTTLES[0]); 
        } else {
            this.loadImage(this.IMAGES_BOTTLES[1]);
        }
    }
}