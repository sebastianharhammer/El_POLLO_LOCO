/**
 * Represents a health points status bar that can be displayed in the game.
 * @extends MoveableObject
 */
class StatusBarHP extends MoveableObject {
  percentage = 200;

  /** @type {string[]} Array of image paths for different health states */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates a new StatusBarHP instance and initializes its properties.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 0;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(200);
    this.handleDefeatSound();
  }

  /**
   * Updates the status bar's percentage and corresponding image.
   * @param {number} percentage - The new health percentage value (0-200).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines which image index to use based on the current percentage.
   * @returns {number} Index of the image to display (0-5).
   */
  resolveImageIndex() {
    if (this.percentage == 200) {
      return 5;
    } else if (this.percentage < 199 && this.percentage >= 150) {
      return 4;
    } else if (this.percentage < 149 && this.percentage >= 100) {
      return 3;
    } else if (this.percentage < 99 && this.percentage >= 50) {
      return 2;
    } else if (this.percentage < 49 && this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    } 
  }
  /**
   * Handles the defeat sound for the status bar.
   */
  handleDefeatSound() {
    if (this.world && this.world.soundManager && this.percentage < 1) {
      this.world.soundManager.play("defeat");
    }
  }
}
