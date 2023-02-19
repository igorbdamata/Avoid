class Enemy extends Entity {
    constructor(position, diameter, speed, canvasLimit, player, color) {
        let directionX = random(11) > 5 ? 1 : -1;
        let directionY = random(11) > 5 ? 1 : -1;
        let direction = createVector(directionX, directionY);
        super(position, diameter, color, direction, speed,canvasLimit);
        this.player = player;
        this.haveHitPlayer = false;
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
        this.haveHitPlayer = true;
    }

    _onHitHorizontalBorder()
    {
        this.direction.x *= -1;
    }
    _onHitVerticalBorder()
    {
        this.direction.y *= -1;
    }
}