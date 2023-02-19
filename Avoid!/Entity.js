class Entity {
    constructor(position, diameter, color, direction, speed, canvasLimit) {

        this._position = position;
        this.diameter = diameter;
        this.color = color;
        this.direction = direction;
        this.speed = speed;
        this.canvasLimit = canvasLimit;

        this.radius = diameter / 2;
    }

    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this.#clampPosition();
    }
    #clampPosition() {
        if (this._position.y < 0 + this.radius) {
            this._position = createVector(this._position.x, this.radius);
            this._onHitVerticalBorder();
        }
        else if (this._position.y > this.canvasLimit.y - this.radius) {
            this._position = createVector(this._position.x, this.canvasLimit.y - this.radius);
            this._onHitVerticalBorder();
        }
        if (this._position.x < 0 + this.radius) {
            this._position = createVector(this.radius, this._position.y);
            this._onHitHorizontalBorder();
        }
        else if (this._position.x > this.canvasLimit.x - this.radius) {
            this._position = createVector(this.canvasLimit.x - this.radius, this._position.y);
            this._onHitHorizontalBorder();
        }
    }

    _onHitVerticalBorder() {
        throw error("'_OnHitVerticalBorder' is not implemented");
    }

    _onHitHorizontalBorder() {
        throw error("'_OnHitHorizontalBorder' is not implemented");
    }

    update() {
        this.position = createVector(this.position.x + this.direction.x * this.speed, this.position.y + this.direction.y * this.speed);
    }

    show() {
        stroke('#64656E');
        strokeWeight(1);
        fill(color(this.color));
        circle(this.position.x, this.position.y, this.diameter)
        noStroke();
    }
}