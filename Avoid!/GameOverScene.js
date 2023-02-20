class GameOverScene extends Scene {
    update() {
        background(settings.general.gameOverBackgroundColor);
        this.#displayGameOverText();
        this.#displayPressAnyKeyText();
    }
    #displayGameOverText()
    {
        let size = 64;
        let textToDisplay = 'Game Over!';
        let textPosition = createVector(GetCentralizedAxisXOf(textToDisplay, size), height / 2);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }
    #displayPressAnyKeyText()
    {
        let size = 32;
        let textToDisplay = 'Press any key!';
        let textPosition = createVector(GetCentralizedAxisXOf(textToDisplay, size), height / 2 + 100);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }

    onKeyPressed()
    {
        LoadScene("Gameplay");
    }
}