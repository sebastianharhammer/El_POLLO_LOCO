class Bottle extends MoveableObject {
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };
    height = 80;
    width = 80;
    y = 1000;
    x = 300;
    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];



    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLES[0]);
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = x;
        this.y = y;
        this.animate();

    }

    animate() {
        if (Math.random() > 0.5) {
            this.loadImage(this.IMAGES_BOTTLES[0]); 
        } else {
            this.loadImage(this.IMAGES_BOTTLES[1]);
        }
    }



}