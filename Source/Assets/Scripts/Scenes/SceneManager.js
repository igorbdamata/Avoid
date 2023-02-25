let currentSceneKey = '';
let currentScene;
let scenes = {};

function addScene(sceneName, newScene) {
    scenes[sceneName] = newScene;
}

function loadScene(scene) {
    currentSceneKey = scene;
    currentScene = scenes[currentSceneKey];
    currentScene.init();
}