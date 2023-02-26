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

  getDifficultFactorFromScore() {
    if (currentSceneKey != "Gameplay") return 0;
    let timeWithMaxDifficult = (settings.general.maxEnemiesLength + 1) * settings.general.maxEnemySpawnCooldown;
    let t = (currentSeconds() - currentScene.gameplayStartTime) / timeWithMaxDifficult;
    let curve = settings.difficultCurve;
    let difficult = bezierPoint(curve.point1.y, curve.point2.y, curve.point3.y, curve.point4.y, t);

    return difficult;
  }

  onGameOver() {
    console.log("gameOver");
    loadScene('GameOver');
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("highScore", highScore);
    }
  }

  update() {
    console.log("update");
    background(settings.general.backgroundColor);
    this.#updateEnemies();
    this.player.update();

    this.#checkEnemySpawn();

    displayText('Score: ' + currentScore, createVector(20, settings.UI.subtitleSize + 20), settings.UI.subtitleSize);
  }

  #updateEnemies() {
    this.enemies.forEach(element => {
      element.update();
    });
  }

  #checkEnemySpawn() {
    if (this.#stillHaveEnemiesToSpawn && this.#isTimeToSpawnANewEnemy) {
      this.spawnEnemy();
    }
  }

  get #stillHaveEnemiesToSpawn() {
    return this.enemies.length < settings.general.maxEnemiesLength;
  }
  get #isTimeToSpawnANewEnemy() {
    let currentSpawnInterval = currentSeconds() - this.timeOnLastSpawn;
    return this.currentSpawnInterval >= this.intervalToSpawnEnemy;
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