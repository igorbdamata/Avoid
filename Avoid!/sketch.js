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

function setup() {
  createCanvas(width, height);
  addScene('GameOver', new GameOverScene());
  addScene('GamePlay', new GamePlayScene());
  LoadScene('GamePlay');
}

function draw() {
  scenes[currentScene].update();
}


function keyPressed() {
  if (currentScene == 'GameOver') {
    LoadScene('GamePlay');
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