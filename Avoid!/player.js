class Player {
    constructor(position, speed, diameter, canvasLimit) {
        this.position = position;
        this.speed = speed;
        this.diameter = diameter;
        this.canvasLimit = canvasLimit;

        this.radius = this.diameter / 2;
        this.direction = createVector(0, 0);
    }

    update() {
        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;
        this.#clampPosition();
    }

    #clampPosition() {
        if (this.position.y < 0 + this.radius) {
            this.position.y = 0 + this.radius;
        }
        else if (this.position.y > this.canvasLimit.y - this.radius) {
            this.position.y = this.canvasLimit.y - this.radius;
        }
        if (this.position.x < 0 + this.radius) {
            this.position.x = 0 + this.radius;
        }
        else if (this.position.x > this.canvasLimit.x - this.radius) {
            this.position.x = this.canvasLimit.x - this.radius;
        }
    }

    show() {
        stroke('#64656E');
        strokeWeight(1);
        circle(this.position.x, this.position.y, this.diameter)
        noStroke();
    }
}