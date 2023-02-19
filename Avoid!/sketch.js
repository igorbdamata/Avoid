let width = 720;
let height = 480;

let player;

function setup() {
  createCanvas(width, height);
  let playerDiameter = 30;
  let playerSpeed = 3;
  let playerPosition = createVector(width / 2, height / 2);
  player = new Player(playerPosition, playerSpeed, playerDiameter, createVector(width, height));
}

function draw() {
  background('#1E1F21');
  player.update();
  player.show();
}

function keyPressed() {
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