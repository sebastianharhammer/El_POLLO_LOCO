class StatusBarEndbossHP extends MoveableObject {
  
    IMAGES = [
      "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
      "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
      "img/7_statusbars/2_statusbar_endboss/green/green40.png",
      "img/7_statusbars/2_statusbar_endboss/green/green60.png",
      "img/7_statusbars/2_statusbar_endboss/green/green80.png",
      "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 850;
      this.y = 20;
      this.width = 400;
      this.height = 120;
      this.setPercentage(5);
    }
  
    setPercentage(percentage) {
      console.log(percentage);
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
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
  