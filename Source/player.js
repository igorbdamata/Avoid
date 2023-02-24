class Player extends Entity {
    constructor(position, diameter, speed, canvasSize, color) {
        super(position, diameter, color, createVector(0, 0), speed, canvasSize);
    }

    get isTryingToWinOnCorner() {
        let canBeOnCorner = currentSeconds() - this.lastMovementTime < settings.general.maxSecondsOnCorner;
        return !this.isMoving && !canBeOnCorner && this.#isOnCorner;
    }

    get #isOnCorner() {
        let corners = [createVector(0, 0), createVector(0, height), createVector(width, 0), createVector(width, height)];
        for (let i = 0; i < corners.length; i++) {
            if(this.position.dist(corners[i])<=90)
            return true;
        }
        return false;
    }
}