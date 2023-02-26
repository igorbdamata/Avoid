class GameplayScene extends Scene {

  init() {
    gameStartSFX.play();
    let playerPosition = createVector(width / 2, height / 2);
    this.player = new Player(playerPosition);

    this.timeOnLastSpawn = currentSeconds();
    this.gameplayStartTime = currentSeconds();
    this.intervalToSpawnEnemy = random(settings.general.minEnemySpawnCooldown, settings.general.maxEnemySpawnCooldown)
    currentScore = 0;

    this.enemies = [];
    this.spawnEnemy();
  }

  addScore() {
    currentScore += int(random(1, 11));
  }

  onGameOver() {
    console.log("gameOver");
    loadScene('GameOver');
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("highScore", highScore);
    }
  }

  getDifficultFactorFromScore() {
    if (currentSceneKey != "Gameplay") return 0;
    let timeWithMaxDifficult = (settings.general.maxEnemiesLength + 1) * settings.general.maxEnemySpawnCooldown;
    let t = (currentSeconds() - currentScene.gameplayStartTime) / timeWithMaxDifficult;
    let curve = settings.difficultCurve;
    let difficult = bezierPoint(curve.point1.y, curve.point2.y, curve.point3.y, curve.point4.y, t);

    return difficult;
  }

  update() {
    console.log("update");
    background(settings.general.gameplayBackgroundColor);
    this.#updateEnemies();
    this.#updatePlayer();

    if (this.#stillHaveEnemiesToSpawn && this.#isTimeToSpawnANewEnemy) {
      this.spawnEnemy();
    }

    let size = 30;
    displayText('Score: ' + currentScore, createVector(20, size + 20), size)
  }

  #updateEnemies() {
    this.enemies.forEach(element => {
      element.update();
    });
  }

  #updatePlayer() {
    this.player.update();
  }

  get #stillHaveEnemiesToSpawn() {
    return this.enemies.length < settings.general.maxEnemiesLength;
  }
  get #isTimeToSpawnANewEnemy() {
    return this.currentTimeInterval >= this.intervalToSpawnEnemy;
  }
  get currentTimeInterval() {
    return currentSeconds() - this.timeOnLastSpawn;
  }

  spawnEnemy() {
    this.timeOnLastSpawn = currentSeconds();
    this.intervalToSpawnEnemy = random(settings.general.minEnemySpawnCooldown, settings.general.maxEnemySpawnCooldown);
    let enemy = new Enemy(this.#getPositionForNewEnemy(), settings.enemy.diameter, settings.enemy.minSpeed, settings.enemy.maxSpeed, this.player, settings.enemy.color);
    this.enemies.push(enemy);
  }
  #getPositionForNewEnemy() {
    let diameter = settings.enemy.diameter;
    let posX = this.player.position.x < width / 2 ? width - diameter : diameter;
    let posY = this.player.position.y < height / 2 ? diameter : height - diameter;
    return createVector(posX, posY);
  }

  onKeyPressed() {
    this.player.onPress(keyCode);
  }

  onKeyReleased() {
    this.player.onRelease(keyCode);
  }
}