let player;
let enemies = [];
let currentScore = 0;
let scoreOnLastSpawn = 0;
let startGameTime;
let settings;
let canvasSize;

function preload()
{
  settings = loadJSON("Settings.json");
}
function displayText(color, size, textToDiplay, position) {
  fill(color);
  textSize(size);
  text(textToDiplay, position.x, position.y);
}

function setup() 
{
  canvasSize = createVector(settings.general.canvasWidth, settings.general.canvasHeight);
  createCanvas(canvasSize.x, canvasSize.y);
  addScene('GameOver', new GameOverScene());
  addScene('Gameplay', new GameplayScene());
  LoadScene('Gameplay');
}

function draw() {
  scenes[currentScene].update();
}


function keyPressed() {
  if (currentScene == 'GameOver') {
    LoadScene('Gameplay');
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