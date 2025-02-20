/**
 * Represents a status bar displaying the end boss's health points.
 * @extends MoveableObject
 */
class StatusBarEndbossHP extends MoveableObject {
  
    IMAGES = [
      "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
      "img/7_statusbars/2_statusbar_endboss/green/green40.png",
      "img/7_statusbars/2_statusbar_endboss/green/green60.png",
      "img/7_statusbars/2_statusbar_endboss/green/green80.png",
      "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];
  
    /**
     * Creates a new StatusBarEndbossHP instance.
     * Initializes position, dimensions and initial health percentage.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 850;
      this.y = 20;
      this.width = 400;
      this.height = 120;
      this.setPercentage(5);
    }
  
    /**
     * Updates the status bar's appearance based on the current health percentage.
     * @param {number} percentage - The current health percentage (0-5).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines which image to display based on the current health percentage.
     * @returns {number} The index of the image to display in the IMAGES array.
     */
    resolveImageIndex() {
      if (this.percentage == 5) {
        return 5;
      } else if (this.percentage == 4) {
        return 4;
      } else if (this.percentage == 3) {
        return 3;
      } else if (this.percentage == 2) {
        return 2;
      } else if (this.percentage == 1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  