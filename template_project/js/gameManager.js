var gameManager;
var canvas;

const init = function () {
	canvas = document.getElementsByTagName("canvas")[0];

	// Create engine
	new Engine(canvas);
	engine.LoadLevel(l1);
	engine.Camera.size = 10;
};