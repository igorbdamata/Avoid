class GameOverScene extends Scene {
    init() {
        gameOverSFX.play();
    }

    update() {
        background(settings.general.backgroundColor);
        this.#displayGameOverText();
        this.#displayPressAnyKeyText();
        this.#displayScoreAndHighScoreText();
    }
    #displayGameOverText() {
        let textToDisplay = "Game Over!";
        let textPosition = createVector(width / 2, height / 2);
        displayText(textToDisplay, textPosition, settings.UI.titleSize, CENTER)
    }
    #displayPressAnyKeyText() {
        let textToDisplay = "Press any key!";
        let textPosition = createVector(width / 2, height / 2 + 100);
        displayText(textToDisplay, textPosition, settings.UI.subtitleSize, CENTER)
    }

    #displayScoreAndHighScoreText() {
        let textToDisplay = "High score: " + highScore + "\nScore: " + currentScore;
        let textPosition = createVector(20, 20 + settings.UI.subtitleSize);
        displayText(textToDisplay, textPosition, settings.UI.subtitleSize)
    }

    onKeyPressed() {
        loadScene("Gameplay");
    }
}