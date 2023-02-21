let settings;
let canvasSize;
let currentScore;
let highScore = 0;
let gameStartSFX;
let ballHitSFX;
let gameOverSFX;

function displayText(color, size, textToDiplay, position) {
  fill(color);
  textSize(size);
  text(textToDiplay, position.x, position.y);
}
function GetCentralizedAxisXOf(textToDisplay, textSize) {
  return (canvasSize.x - textToDisplay.length / 2 * textSize) / 2;
}

function preload() {
  settings = loadJSON("Settings.json");
  gameStartSFX = loadSound("Assets/gameStart.mp3")
  ballHitSFX = loadSound("Assets/ballHit.mp3")
  gameOverSFX = loadSound("Assets/gameOver.mp3")
  highScore = localStorage.getItem("highScore");
}

function setup() {
  canvasSize = createVector(settings.general.canvasWidth, settings.general.canvasHeight);
  createCanvas(canvasSize.x, canvasSize.y);
  addScene('TitleScreen', new TitleScreenScene());
  addScene('Gameplay', new GameplayScene());
  addScene('GameOver', new GameOverScene());
  LoadScene('TitleScreen');
}

function draw() {
  currentScene.update();
}

function keyPressed() {
  currentScene.onKeyPressed();
}

function keyReleased() {
  currentScene.onKeyReleased();
}

function onGameOver() {
  LoadScene('GameOver');
  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem("highScore", highScore);
  }
}