/**
 * Base class for all drawable objects in the game.
 * Provides basic functionality for loading and drawing images.
 */
class DrawableObject {
  x = 120;
  y = 250;
  height = 250;
  width = 125;
  img;
  imageCache = {};
  currentImage = 0;
  

  /**
   * Loads a single image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the imageCache.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  
  /**
   * Draws a debug frame around specific game objects for collision detection visualization.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) { 
    if (this instanceof Character || this instanceof ThrowableObject || this instanceof Endboss || this instanceof Chicken || this instanceof Bottle || this instanceof Coin || this instanceof SmallChicken) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Draws the object's current image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log('Error drawing image', e);
      console.log('Image path:', this.img.src);
    }
  }
  
}

