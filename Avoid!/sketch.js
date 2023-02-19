let width = 720;
let height = 480;

let player;
let enemies = [];
let maxEnemiesLength = 5;
let currentScore = 0;
let scoreOnLastSpawn = 0;
let startGameTime;

function displayText(color, size, textToDiplay, position) {
  fill(color);
  textSize(size);
  text(textToDiplay, position.x, position.y);
}

function CreateEnemy() {
  let posX = random(0, width);
  let posY = random(0, 11) > 5 ? 0 : height;
  let enemy = new Enemy(createVector(posX, posY), 60, 6, createVector(width, height), player, '#FF7657');
  enemies.push(enemy);
}
function initGame() {
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

function setup() {
  createCanvas(width, height);
  initGame();
}

function AnyEnemyHaveHitPlayer() {
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].haveHitPlayer) {
      return true;
    }
  }
  return false;
}

function draw() {
  if (!AnyEnemyHaveHitPlayer()) {
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
    displayText('#E6E9FE', size, 'Score: ' + currentScore, createVector(20, size+20))
  }
  else {
    OnGameOver();
  }
}

function OnGameOver() {
  background('#992F0F');

  let size = 64;
  let textToDisplay = 'Game Over!';
  let textPosition = createVector((width - textToDisplay.length / 2 * size) / 2, height / 2);
  displayText('#E6E9FE', size, textToDisplay, textPosition)

  size = 32;
  textToDisplay = 'Press any key!';
  textPosition = createVector( (width - textToDisplay.length / 2 * size) / 2, height / 2 + 100);
  displayText('#E6E9FE', size, textToDisplay, textPosition)
}
function RestartGame() {
  initGame();
}
function keyPressed() {
  if (AnyEnemyHaveHitPlayer()) {
    RestartGame();
  }

  if (keyCode === UP_ARROW) {
    player.direction.y = -1;
  }
  else if (keyCode === LEFT_ARROW) {
    player.direction.x = -1;
  }
  else if (keyCode === DOWN_ARROW) {
    player.direction.y = +1;
  }
  else if (keyCode === RIGHT_ARROW) {
    player.direction.x = +1;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW && player.direction.y < 0) {
    player.direction.y = 0;
  }
  else if (keyCode === LEFT_ARROW && player.direction.x < 0) {
    player.direction.x = 0;
  }
  else if (keyCode === DOWN_ARROW && player.direction.y > 0) {
    player.direction.y = 0;
  }
  else if (keyCode === RIGHT_ARROW && player.direction.x > 0) {
    player.direction.x = 0
  }
}