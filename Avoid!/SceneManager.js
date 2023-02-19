let currentScene = '';
let scenes = {};

function addScene(sceneName, newScene) {
    scenes[sceneName] = newScene;
}

function LoadScene(scene) {
    currentScene = scene;
    scenes[currentScene].init();
  }