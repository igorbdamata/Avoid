class GameplayScene extends Scene {
    init() {
        startGameTime = performance.now();
        let playerPosition = createVector(canvasSize.x / 2, canvasSize.y / 2);
        player = new Player(playerPosition, settings.player.diameter, settings.player.speed, canvasSize, settings.player.color);
        scoreOnLastSpawn = 0;
        currentScore = 0;
        enemies = [];
        this.CreateEnemy();
    }

    update() {
        background(settings.general.gameplayBackgroundColor);
        enemies.forEach(element => {
          element.update();
          element.show();
        });
    
        player.update();
        player.show();
        currentScore = round((performance.now() - startGameTime) / 100);
        if (enemies.length < settings.general.maxEnemiesLength && currentScore - scoreOnLastSpawn >= settings.general.scoreIntervalToSpawnEnemies) {
          scoreOnLastSpawn = currentScore;
          this.CreateEnemy();
        }
    
        let size = 30;
        displayText('#E6E9FE', size, 'Score: ' + currentScore, createVector(20, size + 20))
    }

    CreateEnemy() {
      let posX = random(0, width);
      let posY = random(0, 11) > 5 ? 0 : height;
      let enemy = new Enemy(createVector(posX, posY), 60, 6, canvasSize, player, '#FF7657');
      enemies.push(enemy);
    }
}