let settings;
let canvasSize;
let currentScore;
let highScore = 0;
let gameStartSFX;
let ballHitSFX;
let gameOverSFX;
let shatellSansFont;

function displayText(color, size, textToDiplay, position, aligment=LEFT, font=shatellSansFont) {
  textAlign(aligment);
  fill(color);
  textSize(size);
  textFont(font);
  text(textToDiplay, position.x, position.y);
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

function getDifficultFactorFromScore()
{
  if(currentSceneKey != "Gameplay") return 0;
  let timeWithMaxDifficult = (settings.general.maxEnemiesLength+1)*settings.general.maxEnemySpawnCooldown;
  let t = (currentSeconds()-currentScene.gameplayStartTime)/timeWithMaxDifficult;
  let curve = settings.difficultCurve;
  let difficult = bezierPoint(curve.point1.y, curve.point2.y, curve.point3.y, curve.point4.y, t);
 
  return difficult;
}

function currentSeconds()
{
  return millis()/1000;
}