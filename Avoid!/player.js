class Player extends Entity {
    constructor(position, diameter, speed, canvasSize, color) {
        super(position, diameter, color, createVector(0, 0), speed, canvasSize);
    }
}