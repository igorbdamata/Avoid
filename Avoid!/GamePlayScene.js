class GameplayScene extends Scene {

  init() {
    this.startGameTime = performance.now();
    let playerPosition = createVector(canvasSize.x / 2, canvasSize.y / 2);
    this.player = new Player(playerPosition, settings.player.diameter, settings.player.speed, canvasSize, settings.player.color);
    this.scoreOnLastSpawn = 0;
    this.currentScore = 0;
    this.enemies = [];
    this.CreateEnemy();
  }

  update() {
    background(settings.general.gameplayBackgroundColor);
    this.enemies.forEach(element => {
      element.update();
      element.show();
    });

    this.player.update();
    this.player.show();
    this.currentScore = round((performance.now() - this.startGameTime) / 100);
    if (this.#canSpawnEnemies() && this.scoreInterval >= settings.general.scoreIntervalToSpawnEnemies) {
      this.CreateEnemy();
    }

    let size = 30;
    displayText('#E6E9FE', size, 'Score: ' + this.currentScore, createVector(20, size + 20))
  }

  #canSpawnEnemies() {
    return this.enemies.length < settings.general.maxEnemiesLength;
  }

  get scoreInterval()
  {
    return this.currentScore - this.scoreOnLastSpawn;
  }

  CreateEnemy() {
    this.scoreOnLastSpawn = this.currentScore;

    let posX = random(0, canvasSize.x);
    let posY = random(0, 11) > 5 ? 0 : canvasSize.y;
    let enemy = new Enemy(createVector(posX, posY), settings.enemy.diameter, settings.enemy.speed, canvasSize, this.player, settings.enemy.color);
    this.enemies.push(enemy);
  }

  onKeyPressed()
  {
    if (keyCode === UP_ARROW) {
      this.player.direction.y = -1;
    }
    else if (keyCode === LEFT_ARROW) {
      this.player.direction.x = -1;
    }
    else if (keyCode === DOWN_ARROW) {
      this.player.direction.y = +1;
    }
    else if (keyCode === RIGHT_ARROW) {
      this.player.direction.x = +1;
    }
  }

  onKeyReleased()
  {
    if (keyCode === UP_ARROW && this.player.direction.y < 0) {
      this.player.direction.y = 0;
    }
    else if (keyCode === LEFT_ARROW && this.player.direction.x < 0) {
      this.player.direction.x = 0;
    }
    else if (keyCode === DOWN_ARROW && this.player.direction.y > 0) {
      this.player.direction.y = 0;
    }
    else if (keyCode === RIGHT_ARROW && this.player.direction.x > 0) {
      this.player.direction.x = 0
    }
  }
}