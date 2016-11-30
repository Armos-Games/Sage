/**
 * The Module that serves as an interface to access input information.
 *
 * @class InputManager
 * @property {boolean[]} keysPressed - An array linking the keycodes to a boolean representing if the key is pressed or not.
 * @property {{isDown: boolean, position: Vector}} mouse - An object giving informations about the mouse.
 */
class InputManager {
	/**
	 * Creates an instance of InputManager.
	 *
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.keysPressed = [];
		this.mouse = {
			isDown: false,
			position: Vector.zero
		}
		this._canvas = canvas;

		///////////////////////////////////////
		///// ----- EVENT LISTENERS ----- /////
		///////////////////////////////////////
		document.addEventListener("keydown", function (e) {
			engine.InputManager.keysPressed[e.keyCode] = true;
		});

		document.addEventListener("keyup", function (e) {
			engine.InputManager.keysPressed[e.keyCode] = false;
		});

		canvas.addEventListener("mousemove", function (e) {
			let rect = canvas.getBoundingClientRect();
			let tmpPos = {
				x: (canvas.width / canvas.scrollWidth) * (e.clientX - rect.left),
				y: canvas.height - (canvas.height / canvas.scrollHeight) * (e.clientY - rect.top)
			};
			engine.InputManager.mouse.position = engine.Camera.ScreenToWorldPoint(tmpPos);
		});

		canvas.addEventListener("mousedown", function (e) {
			engine.InputManager.mouse.isDown = true;
		});

		document.addEventListener("mouseup", function (e) {
			engine.InputManager.mouse.isDown = false;
		});
	}
}