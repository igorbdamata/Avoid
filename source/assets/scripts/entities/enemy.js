class Enemy extends BouncingEntity {
    constructor(position, player) {
        super(position, settings.enemy.diameter, 0, settings.enemy.color);
        this.player = player;
        this.minSpeed = settings.enemy.minSpeed;
        this.maxSpeed = settings.enemy.maxSpeed;
        this.aimingPlayer = false;
    }

    update() {
        this.speed = this.#speedFromDifficult;
        super.update();
        this.#checkCollisionWithPlayer();
    }

    get #speedFromDifficult() {
        return map(currentScene.getDifficultFactorFromScore(), 0, 1, this.minSpeed, this.maxSpeed);
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
        currentScene.onGameOver();
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
            this.aimOnPlayer();
        }
        else if (this.aimingPlayer) {
            this.setDirectionToDefaultAngle();
        }
    }

    get #canAimOnPlayer() {
        let pointingHorizontally = (this.player.position.y < height / 2) == (this.direction.y < 0);
        let pointingVertically = (this.player.position.x < width / 2) == (this.direction.x < 0);
        return pointingHorizontally && pointingVertically;
    }
    aimOnPlayer() {
        this.#setDirectionToReachPlayer();
        this.aimingOnPlayer = true;
    }
    #setDirectionToReachPlayer() {
        let distance = createVector(this.player.position.x - this.position.x, this.player.position.y - this.position.y);
        let angle = atan2(distance.y, distance.x);
        this.direction = createVector(cos(angle), sin(angle));
    }

    setDirectionToDefaultAngle() {
        this.direction = createVector(ceil(this.direction.x), ceil(this.direction.y));
    }
}