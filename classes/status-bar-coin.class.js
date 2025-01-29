class StatusBarCoin extends MoveableObject {
    percentage = 0;
  
    IMAGES = [
        
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];
  

    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 0;
      this.y = 50;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
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
  