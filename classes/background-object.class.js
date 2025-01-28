class BackgroundObject extends MoveableObject { 
    
    width = 1280;
    height = 720;
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 720 - this.height;
        
    }
}