class BouncingEntity extends Entity {
    constructor(position, diameter, speed, color) {
        let directionX = random(11) > 5 ? 1 : -1;
        let directionY = random(11) > 5 ? 1 : -1;
        let direction = createVector(directionX, directionY);
        super(position, diameter, color, direction, 0);
        this.speed = speed;
    }

    update() {
        super.update();
    }

    _onHitHorizontalBorder() {
        ballHitSFX.play();
        this.direction.x *= -1;
    }
    _onHitVerticalBorder() {
        ballHitSFX.play();
        this.direction.y *= -1;
    }
}