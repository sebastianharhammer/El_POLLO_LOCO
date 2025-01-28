const level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss(),
  ],
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
      1280 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      1280 * 3
    ),
  ],
  [ 
    new Coin(200, 565),
    new Coin(400, 565),
    new Coin(600, 565),
    new Coin(800, 565),
    new Coin(1000, 565  ),
    new Coin(1200, 565),
    new Coin(1400, 565),
    new Coin(1600, 565),
    new Coin(1800, 565),
  ],
  [
    new ThrowableObject(100, 565),
    new ThrowableObject(300, 565),
    new ThrowableObject(500, 565),
    new ThrowableObject(700, 565),
  ]
);


