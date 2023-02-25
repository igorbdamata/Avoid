class GameOverScene extends Scene {
    init()
    {
        gameOverSFX.play();
    }
    
    update() {
        background(settings.general.gameplayBackgroundColor);
        this.#displayGameOverText();
        this.#displayPressAnyKeyText();
        this.#displayScoreAndHighScoreText();
    }
    #displayGameOverText()
    {
        let size = 64;
        let textToDisplay = 'Game Over!';
        let textPosition = createVector(width/2, height / 2);
        displayText('#E6E9FE', size, textToDisplay, textPosition,CENTER)
    }
    #displayPressAnyKeyText()
    {
        let size = 32;
        let textToDisplay = 'Press any key!';
        let textPosition = createVector(width/2, height / 2 + 100);
        displayText('#E6E9FE', size, textToDisplay, textPosition,CENTER)
    }

    #displayScoreAndHighScoreText()
    {
        let size = 30;
        let textToDisplay = "High score: " + highScore+'\nScore: ' + currentScore;
        let textPosition = createVector(20,20+size);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }

    onKeyPressed()
    {
        loadScene("Gameplay");
    }
}