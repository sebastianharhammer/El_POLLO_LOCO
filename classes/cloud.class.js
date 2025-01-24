class Cloud extends MoveableObject {
    y = 20;
    
    width = 250;
    height = 250;
    constructor() {
        super().loadImage("img/5_background/layers/4_clouds/1.png");
        this.x = 200 + Math.random() * 300;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000/60);
    }
}