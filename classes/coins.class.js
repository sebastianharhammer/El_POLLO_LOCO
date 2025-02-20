/**
 * Represents a collectible coin in the game that extends MoveableObject.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
    /**
     * Collision offset values for the coin object.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 30,
        left: 30,
        right: 30,
        bottom: 30,
    };

    /**
     * Height of the coin sprite in pixels.
     * @type {number}
     */
    height = 100;

    /**
     * Width of the coin sprite in pixels.
     * @type {number}
     */
    width = 100;

    /**
     * Initial vertical position of the coin.
     * @type {number}
     */
    y = 1000;

    /**
     * Initial horizontal position of the coin.
     * @type {number}
     */
    x = 300;

    /**
     * Array of image paths for coin animation frames.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new Coin instance.
     * @param {number} x - The horizontal position of the coin.
     * @param {number} y - The vertical position of the coin.
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Initiates the coin animation sequence.
     * Plays the animation every 250ms using the IMAGES_COIN frames.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 250);
    }
}