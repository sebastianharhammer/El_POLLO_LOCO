/**
 * Represents the end boss enemy in the game, extending CollidableObject.
 * The end boss is a large chicken with various states including walking, alert, attacking, hurt, and dead.
 */
class Endboss extends MoveableObject {
  height = 400;
  width = 300;
  y = 250;
  x = 3500;
  offset = {
    top: 100,
    left: 50,
    right: 50,
    bottom: 0,
  };
  percentage = 5;
  energy = 4;
  speed = 0.5;
  alert = false;
  endbossAttack = false;
  endbossIsDead = false;
  endbossIsHurt = false;
  soundManager = new SoundManager();
  keyboard = new Keyboard();
  world;
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new Endboss instance.
   * Initializes the boss with walking animation and positions it at x=3500.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Handles the animation logic for the end boss.
   * Updates movement and animation states based on the boss's current condition.
   * Animations include walking, alert, attack, hurt, and death sequences.
   */
  animate() {
    setInterval(() => {
      if (!this.endbossAttack) {
        this.moveEndboss();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.endbossIsDead) {
        this.soundManager.pause("chickenAngry");
        this.soundManager.play("endbossHurt");
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.alert && !this.endbossAttack) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.endbossAttack) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
    if (this.endbossAttack) {
      
    }
  }

  /**
   * Stops the endboss and starts the endboss attack
   */
  stopEndboss() {
    this.speed = 0;
    setTimeout(() => {
      this.startEndbossAttack();
    }, 1000);
  }

  /**
   * Starts the endboss attack
   */
  startEndbossAttack() {
    if (!this.world) return;
    this.soundManager.play("chickenAngry");
    this.endbossAttackInterval = setInterval(() => {
        if (!this.world || !this.world.character) return;
        if (this.world.character.x - this.world.character.width / 2 < this.x) {
            this.otherDirection = false;
            this.x -= 7.5;
        }
        if (this.world.character.x - this.world.character.width / 2 > this.x) {
            this.otherDirection = true;
            this.x += 7.5;
        }
        if (this.endbossIsDead) {
            clearInterval(this.endbossAttackInterval);
        }
    }, 50);
  }
  
}
