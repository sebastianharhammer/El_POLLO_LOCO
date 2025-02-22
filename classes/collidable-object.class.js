/**
 * Represents an object that can collide with other objects in the game.
 * @extends MoveableObject
 */
class CollidableObject extends MoveableObject {
    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
     * Checks if this object is colliding with another object.
     * @param {CollidableObject} obj - The object to check collision with
     * @returns {boolean} True if objects are colliding, false otherwise
     */
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Checks if this object is colliding with another object while jumping.
     * @param {CollidableObject} obj - The object to check jump collision with
     * @returns {boolean} True if objects are colliding during jump, false otherwise
     */
    isJumpColliding(obj) {
        return this.isColliding(obj) && this.isAboveGround() && this.speedY < 0;
    }

    /**
     * Handles collision between a throwable object and the endboss.
     * @param {World} world - The game world instance
     * @param {number} bottleIndex - Index of the thrown bottle in throwableObjects array
     * @returns {boolean} True if collision was handled, false otherwise
     */
    handleEndbossCollision(world, bottleIndex) {
        if (this.isColliding(world.level.endboss[0]) && !world.level.endboss[0].endbossIsDead) {
            let endboss = world.level.endboss[0];
            endboss.hit();
            world.statusBarEndbossHP.setPercentage(endboss.energy);
            if (endboss.energy <= 0) {
                endboss.endbossIsDead = true;
            }
            if (endboss.endbossIsDead) {
                world.soundManager.play("endbossHurt");
                setTimeout(() => {
                    world.level.endboss.splice(0, 1);
                }, 1500);
            }
            world.throwableObjects.splice(bottleIndex, 1);
            return true;
        }
        return false;
    }

    /**
     * Handles collision between a throwable object and chickens.
     * @param {World} world - The game world instance
     * @param {number} enemyIndex - Index of the enemy in the enemies array
     * @param {number|null} bottleIndex - Index of the thrown bottle in throwableObjects array, or null if not applicable
     * @returns {boolean} True if collision was handled, false otherwise
     */
    handleChickenCollision(world, enemyIndex, bottleIndex) {
        const enemy = world.level.enemies[enemyIndex];
        if (this.isColliding(enemy) && !enemy.isBeingKilled && !enemy.chickenIsDead) {
            world.soundManager.play("chicken");
            enemy.speed = 0;
            enemy.chickenIsDead = true;
            enemy.isBeingKilled = true;
            
            if (bottleIndex !== null) {
                world.throwableObjects.splice(bottleIndex, 1);
            }
            world.chickenWhichDied.push(enemy);
            setTimeout(() => {
                world.level.enemies.splice(enemyIndex, 1);
            }, 1000);
            return true;
        }
        return false;
    }
}

