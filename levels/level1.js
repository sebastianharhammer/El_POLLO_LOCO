function createLevel1() {
    return new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],
        [new Endboss()],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],
        [
            new BackgroundObject("img/5_background/layers/air.png", -1279),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", -1279),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", -1279),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", -1279),
            new BackgroundObject("img/5_background/layers/air.png", -1279),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -1279),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -1279),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -1279),

            new BackgroundObject("img/5_background/layers/air.png", 0),
            new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
            new BackgroundObject("img/5_background/layers/air.png", 1279),
            new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1279),
            new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 1279),
            new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1279),

            new BackgroundObject("img/5_background/layers/air.png", 1279 * 2),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/1.png",
                1279 * 2
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/1.png",
                1279 * 2
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/1.png",
                1279 * 2
            ),
            new BackgroundObject("img/5_background/layers/air.png", 1279 * 3),
            new BackgroundObject(
                "img/5_background/layers/3_third_layer/2.png",
                1279 * 3
            ),
            new BackgroundObject(
                "img/5_background/layers/2_second_layer/2.png",
                1279 * 3
            ),
            new BackgroundObject(
                "img/5_background/layers/1_first_layer/2.png",
                1279 * 3
            ),
        ],
        [ 
            new Coin(300, 550),
            new Coin(500, 500),
            new Coin(700, 450),
            new Coin(900, 400),
            new Coin(1100, 450),
            new Coin(1300, 500),
            new Coin(1500, 550),
            new Coin(1700, 500),
            new Coin(2000, 550),
            new Coin(2500, 500),
        ],
        [
            new Bottle(250, 565),
            new Bottle(350, 565),
            new Bottle(750, 565),
            new Bottle(950, 565),
            new Bottle(1150, 565),
            new Bottle(1350, 565),
            new Bottle(1550, 565),
            new Bottle(1750, 565),
            new Bottle(1950, 565),
            new Bottle(2150, 565),
            new Bottle(2350, 565),
            new Bottle(2550, 565),
            new Bottle(2750, 565)
        ]
    );
}

const level1 = createLevel1();


