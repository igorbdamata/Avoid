class GameOverScene extends Scene {
    init() {

    }

    update() {
        background(settings.general.gameOverBackgroundColor);

        let size = 64;
        let textToDisplay = 'Game Over!';
        let textPosition = createVector((width - textToDisplay.length / 2 * size) / 2, height / 2);
        displayText('#E6E9FE', size, textToDisplay, textPosition)

        size = 32;
        textToDisplay = 'Press any key!';
        textPosition = createVector((width - textToDisplay.length / 2 * size) / 2, height / 2 + 100);
        displayText('#E6E9FE', size, textToDisplay, textPosition)
    }
}