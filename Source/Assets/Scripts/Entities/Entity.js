class Entity {
    constructor(position, diameter, color, direction, speed) {
        this._position = position;
        this._direction = direction.normalize();
        this.speed = speed;

        this.diameter = diameter;
        this.radius = diameter / 2;

        this.color = color;
        this.strokeWeight = settings.general.defaultStrokeWeight;
        this.strokeColor = settings.general.defaultStrokeColor;

        this.lastMovementTime = this.isMoving ? currentSeconds() : 0;
    }

    get isMoving() {
        return !this.direction.equals(createVector(0,0));
    }

    get direction()
    {
        return this._direction;
    }
    set direction(value)
    {
        this._direction = value;
        this._direction.normalize();
    }

    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this.#constrainPositionInCanvas();
    }
    #constrainPositionInCanvas() {
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
        return width - this.radius;
    }

    get #minPositionYInCanvas() {
        return this.radius;
    }
    get #maxPositionYInCanvas() {
        return height - this.radius;
    }

    _onHitVerticalBorder() { }
    _onHitHorizontalBorder() { }

    update() {
        this._move();
        this._show();
    }

    _move() {
        if (this.isMoving) this.lastMovementTime = currentSeconds()

        let moveAmount = createVector(this.direction.x, this.direction.y).mult(this.speed);
        this.position = this.position.add(moveAmount);
    }

    _show() {
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
        fill(color(this.color));
        circle(this.position.x, this.position.y, this.diameter)
        noStroke();
    }
}