class Entity {
    constructor(position, diameter) {
        
        this.position = position;
        this.diameter= diameter;

        this.direction = createVector(0,0);
    }

    update() 
    {

    }

    show() {
        throw new Error("Method 'show()' must be implemented.");
    }
}