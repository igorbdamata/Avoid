class GameplayScene extends Scene {

  init() {
    gameStartSFX.play();
    let playerPosition = createVector(width / 2, height / 2);
    this.player = new Player(playerPosition);

    this.timeOnLastSpawn = currentSeconds();
    this.gameplayStartTime = currentSeconds();
    this.#setEnemySpawnInterval();
    currentScore = 0;

    this.enemies = [];
    this.spawnEnemy();

    this.gameIsOver = false;
  }

  addScore() {
    currentScore += int(random(1, 11));
  }

  getDifficultFactorFromScore() {
    let timeWithMaxDifficult = (settings.enemySpawn.maxSpawnLength + 1) * settings.enemySpawn.maxCooldown;
    let t = (currentSeconds() - currentScene.gameplayStartTime) / timeWithMaxDifficult;
    let curve = settings.difficultCurve;
    let difficult = bezierPoint(curve.points[0].y, curve.points[1].y, curve.points[2].y, curve.points[3].y, t);

    return difficult;
  }

  onGameOver() {
    this.#checkHighScore();
    loadScene("GameOver");
    this.gameIsOver = true;
  }
  #checkHighScore() {
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("highScore", highScore);
    }
  }

  update() {
    background(settings.general.backgroundColor);
    this.#updateEnemies();
    this.player.update();

    this.#checkEnemySpawn();

    displayText("Score: " + currentScore, createVector(20, settings.UI.subtitleSize + 20), settings.UI.subtitleSize);
  }

  #updateEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
      if (this.gameIsOver) {
        break;
      }
    }
  }

  #checkEnemySpawn() {
    if (this.#stillHaveEnemiesToSpawn && this.#isTimeToSpawnANewEnemy) {
      this.spawnEnemy();
    }
  }

  get #stillHaveEnemiesToSpawn() {
    return this.enemies.length < settings.enemySpawn.maxSpawnLength;
  }
  get #isTimeToSpawnANewEnemy() {
    let currentSpawnInterval = currentSeconds() - this.timeOnLastSpawn;
    return currentSpawnInterval >= this.intervalToSpawnEnemy;
  }

  spawnEnemy() {
    this.timeOnLastSpawn = currentSeconds();
    this.#setEnemySpawnInterval();
    let enemy = new Enemy(this.#getPositionForNewEnemy(), this.player);
    this.enemies.push(enemy);
  }
  #getPositionForNewEnemy() {
    let diameter = settings.enemy.diameter;
    let posX = this.player.position.x < width / 2 ? width - diameter : diameter;
    let posY = this.player.position.y < height / 2 ? diameter : height - diameter;
    return createVector(posX, posY);
  }

  #setEnemySpawnInterval() {
    this.intervalToSpawnEnemy = random(settings.enemySpawn.minCooldown, settings.enemySpawn.maxCooldown);
  }

  onKeyPressed() {
    this.player.onPress(keyCode);
  }

  onKeyReleased() {
    this.player.onRelease(keyCode);
  }
}