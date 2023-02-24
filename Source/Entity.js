class Entity {
    constructor(position, diameter, color, direction, speed, canvasSize) {
        this._position = position;
        this.diameter = diameter;
        this.color = color;
        this.direction = direction;
        this.speed = speed;
        this.canvasSize = canvasSize;
        this.radius = diameter / 2;
        this.lastMovementTime = this.isMoving ? currentSeconds() : 0;
    }

    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this.#constrainPositionInCanvas();
    }
    get isMoving() {
        return !this.direction.equals(createVector(0, 0));
    }
    #constrainPositionInCanvas() {
        if (this.isMoving) this.lastMovementTime = currentSeconds()
        let constrainedPositionX = constrain(this._position.x, this.#minPositionXInCanvas, this.#maxPositionXInCanvas);
        let constrainedPositionY = constrain(this._position.y, this.#minPositionYInCanvas, this.#maxPositionYInCanvas);

        if (constrainedPositionX != this._position.x) this._onHitHorizontalBorder();
        if (constrainedPositionY != this._position.y) this._onHitVerticalBorder();

        this._position = createVector(constrainedPositionX, constrainedPositionY);
    }

    get #minPositionXInCanvas() {
        return this.radius;
    }
    get #maxPositionXInCanvas() {
        return this.canvasSize.x - this.radius;
    }

    get #minPositionYInCanvas() {
        return this.radius;
    }
    get #maxPositionYInCanvas() {
        return this.canvasSize.y - this.radius;
    }

    _onHitVerticalBorder() { }
    _onHitHorizontalBorder() { }

    update() {
        let moveAmount = createVector(this.direction.x, this.direction.y).mult(this.speed);
        this.position = createVector(this.position.x + moveAmount.x, this.position.y + moveAmount.y);
    }

    show() {
        stroke('#64656E');
        strokeWeight(1);
        fill(color(this.color));
        circle(this.position.x, this.position.y, this.diameter)
        noStroke();
    }
}