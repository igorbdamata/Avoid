class TitleScreenScene extends Scene {
    init() {
        this.balls = [];
        let speed = random(settings.enemy.minSpeed, settings.enemy.maxSpeed);
        for (let i = 0; i < settings.general.maxEnemiesLength; i++) {
            let position = createVector(random(0, width), random(0, height));
            this.balls[i] = new BouncingEntity(position, settings.enemy.diameter, speed, settings.enemy.color);
        }
    }

    update() {
        background(settings.general.gameplayBackgroundColor);

        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
            this.balls[i].show();
        }

        this.#displayGameTitleText();
        this.#displayPressAnyKeyText();
        this.#displayKeysText();
        this.#displayHighScoreText();
    }
    #displayGameTitleText() {
        let size = 64;
        let textToDisplay = 'Avoid!';
        let textPosition = createVector(width / 2, height / 2);
        displayText(textToDisplay, textPosition, size, CENTER);
    }
    #displayPressAnyKeyText() {
        let size = 32;
        let textToDisplay = 'Press any key to start!';
        let position = createVector(width / 2, height / 2 + 100);
        displayText(textToDisplay, position, size, CENTER);
    }

    #displayKeysText() {
        let size = 32;
        let textToDisplay = "Arrows to move"
        let textPosition = createVector(20, 20 + size);
        displayText(textToDisplay, textPosition, size)
    }
    #displayHighScoreText() {
        let size = 32;
        let textToDisplay = "High score: " + highScore;
        let textPosition = createVector(20, 20 * 2 + size * 2);
        displayText(textToDisplay, textPosition, size)
    }

    onKeyPressed() {
        loadScene("Gameplay");
    }
}