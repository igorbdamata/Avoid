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
        this.#onHitAnyBorder();

    }
    _onHitVerticalBorder() {
        super._onHitVerticalBorder();
        this.#onHitAnyBorder();
    }

    #onHitAnyBorder() {
        currentScene.addScore();
        if (this.player.isTryingToWinOnCorner && this.#canAimOnPlayer) {
            this.setDirectionToReachPlayer();
        }
        else if (abs(this.direction.x) != 1) {
            this.direction = createVector(round(this.direction.x), round(this.direction.y));
        }
    }

    get #canAimOnPlayer() {
        let pointingHorizontally = (this.player.position.y < height / 2) == (this.direction.y < 0);
        let pointingVertically = (this.player.position.x < width / 2) == (this.direction.x < 0);
        return pointingHorizontally && pointingVertically;
    }
    setDirectionToReachPlayer() {
        let distance = createVector(this.player.position.x - this.position.x, this.player.position.y - this.position.y);
        let angle = atan2(distance.y, distance.x);
        this.direction = createVector(cos(angle), sin(angle)).setMag(sqrt(2));
    }
}