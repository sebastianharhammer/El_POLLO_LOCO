class Coin extends MoveableObject {
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };
    height = 100;
    width = 100;
    y = 1000;
    x = 300;
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 250);
    }

}