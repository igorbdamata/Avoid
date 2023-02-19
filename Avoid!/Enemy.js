class Enemy extends Entity {
    constructor(position, diameter, speed, canvasLimit, player) {
        super(position, diameter);
        this.speed = speed;
        this.canvasLimit = canvasLimit;
        this.player = player;

        this.radius = this.diameter / 2;

        let directionX = random(11) > 5 ? 1 : -1;
        let directionY = random(11) > 5 ? 1 : -1;
        this.direction = createVector(directionX, directionY);
    }

    update() {
        this.position.x += this.direction.x * this.speed;
        this.position.y += this.direction.y * this.speed;
        if(dist(this.position.x, this.position.y, this.player.position.x, this.player.position.y) <= this.radius + this.player.radius)
        {
            console.log('Is colliding!');
            this.direction = createVector(0,0);
        }
        this.#clampPosition();
    }

    #clampPosition() {
        if (this.position.y < 0 + this.radius) {
            this.position.y = 0 + this.radius;
            this.direction.y = +1;
        }
        else if (this.position.y > this.canvasLimit.y - this.radius) {
            this.position.y = this.canvasLimit.y - this.radius;
            this.direction.y = -1;
        }
        if (this.position.x < 0 + this.radius) {
            this.position.x = 0 + this.radius;
            this.direction.x = +1;
        }
        else if (this.position.x > this.canvasLimit.x - this.radius) {
            this.position.x = this.canvasLimit.x - this.radius;
            this.direction.x = -1;
        }
    }

    show() {
        stroke('#64656E');
        strokeWeight(2);
        fill(color('#FF7657'));
        circle(this.position.x, this.position.y, this.diameter)
        noStroke();
    }
}