class Enemy extends Entity {
    constructor(position, diameter, speed, canvasLimit, player, color) {
        let directionX = random(11) > 5 ? 1 : -1;
        let directionY = random(11) > 5 ? 1 : -1;
        let direction = createVector(directionX, directionY);
        super(position, diameter, color, direction, speed,canvasLimit);
        this.player = player;
    }

    update() {
        super.update();
        this.#checkCollisionWithPlayer();
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
        console.log('Is colliding!');
        this.direction = createVector(0, 0);
    }

    _OnHitLeftBorder()
    {
        super._OnHitLeftBorder();
        this.direction.x = +1;
    }
    _OnHitRightBorder()
    {
        super._OnHitRightBorder();
        this.direction.x = -1;
    }
    _OnHitUpperBorder()
    {
        super._OnHitUpperBorder();
        this.direction.y = +1;
    }
    _OnHitBottomBorder()
    {
        super._OnHitBottomBorder();
        this.direction.y = -1;
    }

    
}