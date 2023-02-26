class TitleScreenScene extends Scene {
    init() {
        this.balls = [];
        let speed = random(settings.enemy.minSpeed, settings.enemy.maxSpeed);
        for (let i = 0; i < settings.enemySpawn.maxSpawnLength; i++) {
            let position = createVector(random(0, width), random(0, height));
            this.balls[i] = new BouncingEntity(position, settings.enemy.diameter, speed, settings.enemy.color);
        }
    }

    update() {
        background(settings.general.backgroundColor);

        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].update();
        }

        this.#displayGameTitleText();
        this.#displayPressAnyKeyText();
        this.#displayKeysText();
        this.#displayHighScoreText();
    }
    #displayGameTitleText() {
        let textToDisplay = "Avoid!";
        let textPosition = createVector(width / 2, height / 2);
        displayText(textToDisplay, textPosition, settings.UI.titleSize, CENTER);
    }
    #displayPressAnyKeyText() {
        let textToDisplay = "Press any key to start!";
        let position = createVector(width / 2, height / 2 + 100);
        displayText(textToDisplay, position, settings.UI.subtitleSize, CENTER);
    }

    #displayKeysText() {
        let textToDisplay = "Arrows to move"
        let textPosition = createVector(20, 20 + settings.UI.subtitleSize);
        displayText(textToDisplay, textPosition, settings.UI.subtitleSize)
    }
    #displayHighScoreText() {
        let textToDisplay = "High score: " + highScore;
        let textPosition = createVector(20, 20 * 2 + settings.UI.subtitleSize * 2);
        displayText(textToDisplay, textPosition, settings.UI.subtitleSize)
    }

    onKeyPressed() {
        loadScene("Gameplay");
    }
}
