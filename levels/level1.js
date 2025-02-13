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
            new Coin(350, 500),
            new Coin(400, 450),
            new Coin(450, 400),
            new Coin(500, 450),
            new Coin(550, 500),
            new Coin(600, 550),
            new Coin(1500, 500),
            new Coin(2000, 550),
            new Coin(2500, 500),
        ],
        [
            new Bottle(200, 565),
            new Bottle(201, 565),
            new Bottle(202, 565),
            new Bottle(203, 565),
            new Bottle(204, 565),
            new Bottle(205, 565),
            new Bottle(206, 565),
            new Bottle(207, 565),
            new Bottle(208, 565),
            new Bottle(209, 565),
            new Bottle(3600, 565),
            new Bottle(3700, 565),
            new Bottle(3800, 565)
        ]
    );
}

const level1 = createLevel1();


