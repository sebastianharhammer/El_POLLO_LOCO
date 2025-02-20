/**
 * Represents a game level containing various game objects and elements
 */
class Level {
  /** @type {Array} Array of enemy objects in the level */
  enemies;
  /** @type {Object} The end boss object of the level */
  endboss;
  /** @type {Array} Array of cloud objects for background scenery */
  clouds;
  /** @type {Array} Array of background object elements */
  backgroundObjects;
  /** @type {Array} Array of collectible coin objects */
  coins;
  /** @type {Array} Array of collectible bottle objects */
  bottles;
  /** @type {number} X-coordinate marking the end of the level */
  level_end_x = 1280*3-100;

  /**
   * Creates a new Level instance
   * @param {Array} enemies - Array of enemy objects to populate the level
   * @param {Object} endboss - The end boss object for the level
   * @param {Array} clouds - Array of cloud objects for the background
   * @param {Array} backgroundObjects - Array of background visual elements
   * @param {Array} coins - Array of collectible coin objects
   * @param {Array} bottles - Array of collectible bottle objects
   */
  constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
