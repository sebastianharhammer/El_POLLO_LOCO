class CollidableObject extends MoveableObject {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    checkJumpCollision() {
        this.level.enemies.forEach((enemy, index) => {
          if (this.character.isJumpColliding(enemy) && !this.chickenWhichDied.includes(enemy)) {
            this.chickenDies(index, null);
            this.chickenWhichDied.push(enemy);
            enemy.isBeingKilled = true;
          }
        });
      }
}

