let currentSceneKey = '';
let currentScene;
let scenes = {};

function addScene(sceneName, newScene) {
    scenes[sceneName] = newScene;
}

function LoadScene(scene) {
    currentSceneKey = scene;
    currentScene = scenes[currentSceneKey];
    currentScene.init();
}