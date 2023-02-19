let width = 720;
let height = 480;

let player;
let enemy;
function initGame()
{
  let playerDiameter = 30;
  let playerSpeed = 3;
  let playerPosition = createVector(width / 2, height / 2);
  player = new Player(playerPosition, playerDiameter, playerSpeed, createVector(width, height), '#E6E9FE');

  enemy = new Enemy(createVector(0, 0), playerDiameter * 2, playerSpeed, createVector(width, height), player, '#FF7657');
}

function setup() {
  createCanvas(width, height);
  initGame();
}



function draw() {
  if (!enemy.haveHitPlayer) {
    background('#1E1F21');
    enemy.update();
    enemy.show();

    player.update();
    player.show();
  }
  else
  {
    OnGameOver();
  }
}

function OnGameOver()
{
  fill(color('#E6E9FE'));
  background('#992F0F');
  let size = 64;
  let textToDisplay = 'Game Over!';
  textSize(size);
  text(textToDisplay, (width-textToDisplay.length/2*size)/2, height/2);

  size =32;
  textToDisplay = 'Press any key!';
  textSize(size);
  text(textToDisplay, (width-textToDisplay.length/2*size)/2, height/2+100);
}
function RestartGame()
{
  initGame();
}
function keyPressed() {
  if (enemy.haveHitPlayer) 
  {
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