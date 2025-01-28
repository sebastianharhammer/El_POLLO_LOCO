class Coins extends MoveableObject {
    x = 0;
    y = 0;
    height = 200;
    width = 200;
    IMAGES = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png"
    ];

    constructor() {

        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 50);
    }

}