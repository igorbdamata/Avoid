let settings;
let gameStartSFX;
let ballHitSFX;
let gameOverSFX;
let shatellSansFont;

let currentScore;
let highScore = 0;

let canvasCorners = {};

function displayText(textToDiplay, position, size, aligment = LEFT, font = shatellSansFont, color = "#E6E9FE") {
  textSize(size);
  textAlign(aligment);
  textFont(font);
  fill(color);
  text(textToDiplay, position.x, position.y);
}

function currentSeconds() {
  return millis() / 1000;
}

function preload() {
  settings = loadJSON("Assets/General/Settings.json");

  gameStartSFX = loadSound("Assets/Sounds/gameStart.mp3")
  ballHitSFX = loadSound("Assets/Sounds/ballHit.mp3")
  gameOverSFX = loadSound("Assets/Sounds/gameOver.mp3")

  shatellSansFont = loadFont("Assets/General/ShantellSans-Regular.ttf")

  highScore = localStorage.getItem("highScore");
}

function setup() {
  userStartAudio();

  createCanvas(settings.canvas.width, settings.canvas.height);

  addScene("TitleScreen", new TitleScreenScene());
  addScene("Gameplay", new GameplayScene());
  addScene("GameOver", new GameOverScene());
  loadScene("TitleScreen");

  canvasCorners["LeftUp"] = createVector(0, 0);
  canvasCorners["LeftDown"] = createVector(0, height);;
  canvasCorners["RightUp"] = createVector(width, 0);;
  canvasCorners["RightDown"] = createVector(width, height);;
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
