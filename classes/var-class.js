class Var {
  constructor() {
    this.character = new Character();
    this.level = level1;
    this.canvas;
    this.ctx;
    this.keyboard;
    this.camera_x = 200;
    this.statusBarHP = new StatusBarHP();
    this.statusBarCoin = new StatusBarCoin();
    this.statusBarBottles = new StatusBarBottles();
    this.statusBarEndbossHP = new StatusBarEndbossHP();
    this.throwableObjects = [];
    /* this.ThrowAbleObjects = new ThrowableObject(); */
    this.bottles = level1.bottles;
    this.coins = level1.coins;
    this.chickenIsDead;
    this.endboss = this.level.endboss[0];
    this.endbossAttack = false;
    this.throwCooldown = false;
    this.gameStarted = false;
    this.c;
    this.startScreen = new StartScreen();
    this.gameOver = false;
    this.gameStartTime;
    this.endScreen;
    this.soundManager = new SoundManager();
    this.endbossAttackInterval;
    this.isResetting = false;
    this.gameInterval;
    this.charIsntDead = true;
    this.chickenWhichDied = [];
  }
}
