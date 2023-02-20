class GameplayScene extends Scene {

  init() {
    gameStartSFX.play();
    let playerPosition = createVector(canvasSize.x / 2, canvasSize.y / 2);
    this.player = new Player(playerPosition, settings.player.diameter, settings.player.speed, canvasSize, settings.player.color);

    this.startGameTime = performance.now();
    this.scoreOnLastSpawn = 0;
    currentScore=0;

    this.enemies = [];
    this.SpawnEnemy();
  }

  

  update() {
    background(settings.general.gameplayBackgroundColor);
    this.#updateEnemies();
    this.#updatePlayer();

    currentScore = round((performance.now() - this.startGameTime) / 100);

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
    return this.scoreInterval >= settings.general.scoreIntervalToSpawnEnemies
  }
  get scoreInterval() {
    return currentScore - this.scoreOnLastSpawn;
  }

  SpawnEnemy() {
    this.scoreOnLastSpawn = currentScore;

    let posX = random(0, canvasSize.x);
    let posY = random(0, 11) > 5 ? 0 : canvasSize.y;
    let enemy = new Enemy(createVector(posX, posY), settings.enemy.diameter, settings.enemy.speed, canvasSize, this.player, settings.enemy.color);
    this.enemies.push(enemy);
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