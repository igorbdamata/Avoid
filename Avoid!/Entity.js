class Entity {
    constructor(position, diameter, color, direction, speed, canvasSize) {

        this._position = position;
        this.diameter = diameter;
        this.color = color;
        this.direction = direction;
        this.speed = speed;
        this.canvasSize = canvasSize;

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
        else if (this._position.y > this.canvasSize.y - this.radius) {
            this._position = createVector(this._position.x, this.canvasSize.y - this.radius);
            this._onHitVerticalBorder();
        }
        if (this._position.x < 0 + this.radius) {
            this._position = createVector(this.radius, this._position.y);
            this._onHitHorizontalBorder();
        }
        else if (this._position.x > this.canvasSize.x - this.radius) {
            this._position = createVector(this.canvasSize.x - this.radius, this._position.y);
            this._onHitHorizontalBorder();
        }
    }

    _onHitVerticalBorder() {
    }

    _onHitHorizontalBorder() {
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