class GameplayScene extends Scene {
  
  init() {
    gameStartSFX.play();
    let playerPosition = createVector(canvasSize.x / 2, canvasSize.y / 2);
    this.player = new Player(playerPosition, settings.player.diameter, settings.player.speed, canvasSize, settings.player.color);

    this.timeOnLastSpawn = currentSeconds();
    this.gameplayStartTime = currentSeconds();
    currentScore = 0;

    this.enemies = [];
    this.SpawnEnemy();
  }

  addScore() {
    currentScore += int(random(1, 11));
  }

  update() {
    background(settings.general.gameplayBackgroundColor);
    this.#updateEnemies();
    this.#updatePlayer();

    if (this.#stillHaveEnemiesToSpawn && this.#isTimeToSpawnANewEnemy) {
      this.SpawnEnemy();
    }

    let size = 30;
    displayText('#E6E9FE', size, 'Score: ' + currentScore, createVector(20, size + 20))
  }

  #updateEnemies() {
    this.enemies.forEach(element => {
      element.update();
      element.show();
    });
  }

  #updatePlayer() {
    this.player.update();
    this.player.show();
  }

  get #stillHaveEnemiesToSpawn() {
    return this.enemies.length < settings.general.maxEnemiesLength;
  }
  get #isTimeToSpawnANewEnemy() {
    return this.currentTimeInterval >= settings.general.secondsIntervalToSpawnEnemies;
  }
  get currentTimeInterval() {
    return currentSeconds()- this.timeOnLastSpawn;
  }

  SpawnEnemy() {
    this.timeOnLastSpawn =currentSeconds();
    let enemy = new Enemy(this.#getPositionForNewEnemy(), settings.enemy.diameter, settings.enemy.minSpeed, settings.enemy.maxSpeed, canvasSize, this.player, settings.enemy.color);
    this.enemies.push(enemy);
  }
  #getPositionForNewEnemy() {
    let diameter = settings.enemy.diameter;
    let posX = this.player.position.x < canvasSize.x / 2 ? canvasSize.x - diameter : diameter;
    let posY = this.player.position.y < canvasSize.y / 2 ? diameter : canvasSize.y - diameter;
    return createVector(posX, posY);
  }

  onKeyPressed() {
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

  onKeyReleased() {
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