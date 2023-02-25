class GameOverScene extends Scene {
    init() {
        gameOverSFX.play();
    }

    update() {
        background(settings.general.gameplayBackgroundColor);
        this.#displayGameOverText();
        this.#displayPressAnyKeyText();
        this.#displayScoreAndHighScoreText();
    }
    #displayGameOverText() {
        let size = 64;
        let textToDisplay = 'Game Over!';
        let textPosition = createVector(width / 2, height / 2);
        displayText(textToDisplay, textPosition, size, CENTER)
    }
    #displayPressAnyKeyText() {
        let size = 32;
        let textToDisplay = 'Press any key!';
        let textPosition = createVector(width / 2, height / 2 + 100);
        displayText(textToDisplay, textPosition, size, CENTER)
    }

    #displayScoreAndHighScoreText() {
        let size = 30;
        let textToDisplay = "High score: " + highScore + '\nScore: ' + currentScore;
        let textPosition = createVector(20, 20 + size);
        displayText(textToDisplay, textPosition, size)
    }

    onKeyPressed() {
        loadScene("Gameplay");
    }
}