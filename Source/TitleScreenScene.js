class TitleScreenScene extends Scene {
    update() {
        background(settings.general.titleScreenBackgroundColor);
        this.#displayGameTitleText();
        this.#displayPressAnyKeyText();
        this.#displayKeysText();
        this.#displayHighScoreText();
    }
    #displayGameTitleText() {
        let size = 64;
        let textToDisplay = 'Avoid!';
        let textPosition = createVector(GetCentralizedAxisXOf(textToDisplay, size), height / 2);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }
    #displayPressAnyKeyText() {
        let size = 32;
        let textToDisplay = 'Press any key to start!';
        let textPosition = createVector(GetCentralizedAxisXOf(textToDisplay, size), height / 2 + 100);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }

    #displayKeysText() {
        let size = 32;
        let textToDisplay = "Arrows to move"
        let textPosition = createVector(20, 20 + size);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }
    #displayHighScoreText() {
        let size = 32;
        let textToDisplay = "High score: " + highScore;
        let textPosition = createVector(20, 20 * 2 + size*2);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }

    onKeyPressed() {
        LoadScene("Gameplay");
    }
}