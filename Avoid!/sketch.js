let settings;
let canvasSize;

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
}

function setup() {
  canvasSize = createVector(settings.general.canvasWidth, settings.general.canvasHeight);
  createCanvas(canvasSize.x, canvasSize.y);
  addScene('GameOver', new GameOverScene());
  addScene('Gameplay', new GameplayScene());
  LoadScene('Gameplay');
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