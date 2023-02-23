class Enemy extends Entity {
    constructor(position, diameter, minSpeed, maxSpeed, canvasSize, player, color) {
        let directionX = random(11) > 5 ? 1 : -1;
        let directionY = random(11) > 5 ? 1 : -1;
        let direction = createVector(directionX, directionY);
        super(position, diameter, color, direction, 0, canvasSize);
        this.player = player;
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
    }

    update() {
        this.speed = this.speedFromDifficult;
        super.update();
        this.#checkCollisionWithPlayer();
    }
    get speedFromDifficult() {
        return (this.maxSpeed - this.minSpeed) * getDifficultFactorFromScore() + this.minSpeed;
    }

    #checkCollisionWithPlayer() {
        if (this.#isCollidingWithPlayer) {
            this.#onCollideWithPlayer();
        }
    }

    get #isCollidingWithPlayer() {
        let distance = dist(this.position.x, this.position.y, this.player.position.x, this.player.position.y);
        return distance <= this.radius + this.player.radius;
    }

    #onCollideWithPlayer() {
        onGameOver();
    }

    _onHitHorizontalBorder() {
        ballHitSFX.play();
        currentScene.addScore();
        this.direction.x *= -1;
    }
    _onHitVerticalBorder() {
        ballHitSFX.play();
        currentScene.addScore();
        this.direction.y *= -1;
    }

}