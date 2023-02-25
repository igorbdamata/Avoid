class Player extends Entity {
    constructor(position) {
        super(position, settings.player.diameter, settings.player.color, createVector(0, 0), settings.player.speed);
        this.maxSecondsOnCorner = settings.general.maxSecondsOnCorner
        this.cornerRadius = settings.general.cornerRadius;
    }

    get isTryingToWinOnCorner() {
        let intervalSinceStoppedMovement = currentSeconds() - this.lastMovementTime;
        let canBeOnCorner = intervalSinceStoppedMovement < this.maxSecondsOnCorner;
        return !canBeOnCorner && this.#isOnCorner;
    }
    get #isOnCorner() {
        for (const [key, corner] of Object.entries(canvasCorners)) {
            if (this.position.dist(corner) <= this.cornerRadius)
                return true;
        }
        return false;
    }

    onPress(input) {
        if (input === UP_ARROW) {
            this.direction = createVector(this.direction.x, -1);
        }
        else if (input === LEFT_ARROW) {
            this.direction = createVector(-1, this.direction.y);
        }
        else if (input === DOWN_ARROW) {
            this.direction = createVector(this.direction.x, 1);
        }
        else if (input === RIGHT_ARROW) {
            this.direction = createVector(1, this.direction.y);
        }
    }
    onRelease(input) {
        if (input === UP_ARROW && this.direction.y < 0) {
            this.direction = createVector(this.direction.x, 0);
        }
        else if (input === LEFT_ARROW && this.direction.x < 0) {
            this.direction = createVector(0, this.direction.y);
        }
        else if (input === DOWN_ARROW && this.direction.y > 0) {
            this.direction = createVector(this.direction.x, 0);
        }
        else if (input === RIGHT_ARROW && this.direction.x > 0) {
            this.direction = createVector(0, this.direction.y);
        }
    }
}