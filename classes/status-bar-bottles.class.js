/**
 * Represents a status bar that displays bottle collection progress
 * @extends MoveableObject
 */
class StatusBarBottles extends MoveableObject {
    percentage = 0;
  
    IMAGES = [
        
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
    ];
  

    /**
     * Creates a new StatusBarBottles instance
     * Initializes the status bar position, dimensions and starting percentage
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 0;
      this.y = 100;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    /**
     * Updates the percentage and corresponding image of the status bar
     * @param {number} percentage - The new percentage value (0-100)
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines which image index to use based on the current percentage
     * @returns {number} Index of the image to display (0-5)
     */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage > 80) {
        return 4;
      } else if (this.percentage > 59) {
        return 3;
      } else if (this.percentage > 29) {
        return 2;
      } else if (this.percentage > 9) {
        return 1;
      } else {
        return 0;
      }
    }
    
  }
  