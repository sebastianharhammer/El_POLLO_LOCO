/**
 * Represents a background object in the game that extends MoveableObject.
 * These objects are used to create the game's background scenery.
 */
class BackgroundObject extends MoveableObject { 
    /** @type {number} Width of the background object in pixels */
    width = 1280;
    
    /** @type {number} Height of the background object in pixels */
    height = 720;
    
    /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image file for the background object
     * @param {number} x - The initial x-coordinate position of the background object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 720 - this.height;
    }
}