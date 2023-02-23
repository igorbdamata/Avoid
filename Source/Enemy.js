class Enemy extends BouncingEntity {
    constructor(position, diameter, minSpeed, maxSpeed, canvasSize, player, color) {
        super(position, diameter, 0, canvasSize, color);
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
        super._onHitHorizontalBorder();
        currentScene.addScore();
    }
    _onHitVerticalBorder() {
        super._onHitVerticalBorder();
        currentScene.addScore();
    }

}