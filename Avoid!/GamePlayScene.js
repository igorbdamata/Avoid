class GamePlayScene extends Scene {
    init() {
        startGameTime = performance.now();
        let playerDiameter = 30;
        let playerSpeed = 3;
        let playerPosition = createVector(width / 2, height / 2);
        player = new Player(playerPosition, playerDiameter, playerSpeed, createVector(width, height), '#E6E9FE');
        scoreOnLastSpawn = 0;
        currentScore = 0;
        enemies = [];
        CreateEnemy();
    }

    update() {
        background('#1E1F21');
        enemies.forEach(element => {
          element.update();
          element.show();
        });
    
        player.update();
        player.show();
        currentScore = round((performance.now() - startGameTime) / 100);
        if (enemies.length < maxEnemiesLength && currentScore - scoreOnLastSpawn >= 100) {
          scoreOnLastSpawn = currentScore;
          CreateEnemy();
        }
    
        let size = 30;
        displayText('#E6E9FE', size, 'Score: ' + currentScore, createVector(20, size + 20))
    }
}