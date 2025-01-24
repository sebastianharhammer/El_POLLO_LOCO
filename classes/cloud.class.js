class Cloud extends MoveableObject {
    y = 20;
    width = 250;
    height = 250;
    speed = 0.15;
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = 200 + Math.random() * 300;
        this.animate();
    }
    animate() {
        this.moveLeft();
    }

    
    
}