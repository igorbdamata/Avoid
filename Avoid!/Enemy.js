class Enemy extends Entity {
    constructor(position, diameter, speed, canvasSize, player, color) {
        super(position, diameter, color, this.#getNewDirection(), speed, canvasSize);
        this.player = player;
    }
    #getNewDirection()
    {
        let directionX = random(11) > 5 ? 1 : -1;
        let directionY = random(11) > 5 ? 1 : -1;
        return createVector(directionX, directionY);
    }

    update() {
        super.update();
        this.#checkCollisionWithPlayer();
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
        LoadScene('GameOver');
    }

    _onHitHorizontalBorder() {
        this.direction.x *= -1;
    }
    _onHitVerticalBorder() {
        this.direction.y *= -1;
    }
}