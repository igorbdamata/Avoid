class Player extends Entity {
    constructor(position, diameter, speed, canvasLimit, color) {
        super(position, diameter, color, createVector(0, 0), speed, canvasLimit);
    }
}