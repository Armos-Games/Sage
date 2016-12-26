/**
 * The Module that represents the camera from which the level is displayed.
 *
 * @property {Number} size - The height, in world units, of the camera.
 * @property {Vector} position - The position of the camera in the world.
 */
class Camera {
	/**
	 * Creates an instance of Camera.
	 *
	 * @param {any} canvas
	 *
	 */
	constructor(canvas) {
		this.size = 10;
		this._position = Vector.zero;
		this._screenSize = new Vector(canvas.width, canvas.height);
		this._ratio = canvas.width / canvas.height;
	}


	get position() {
		return this._position;
	}
	set position(value) {
		if (Vector.IsVector(value) == false)
		{
			console.error("A position has to be a Vector.");
			return;
		}
		engine.InputManager.$RefreshWorldPosition();
		this._position = value;
	}

	/**
	 * Convert a point on the screen to a point in the world.
	 *
	 * @param {Vector} screenPoint - The point in screen units to convert to world units.
	 * @returns {Vector} The world point at the screen point.
	 *
	 * @memberOf Camera
	 */
	ScreenToWorldPoint(screenPoint) {
		return new Vector(
			screenPoint.x / this._screenSize.x * (this.size * this._ratio) + (this.position.x - (this.size * this._ratio / 2)),
			screenPoint.y / this._screenSize.y * (this.size) + (this.position.y - (this.size / 2))
		);
	}

	/**
	 * Convert a point in the world to a point on the screen.
	 *
	 * @param {Vector} worldPoint - The point in world units to convert to screen units.
	 * @returns {Vector} The screen point at the world point.
	 *
	 * @memberOf Camera
	 */
	WorldToScreenPoint(worldPoint) {
		return new Vector(
			(worldPoint.x - (this.position.x - (this.size * this._ratio / 2))) / (this.size * this._ratio) * this._screenSize.x,
			(worldPoint.y - (this.position.y - (this.size / 2))) / this.size * this._screenSize.y
		);
	}

	/**
	 * Converts a world length on the X-axis to a screen length.
	 *
	 * @param {Number} x - The length to convert.
	 * @returns {Number} The length on screen.
	 *
	 * @memberOf Camera
	 */
	WorldToScreenLengthX(x) {
		return (x) / (this.size * this._ratio) * this._screenSize.x;
	}

	/**
	 * Converts a world length on the Y-axis to a screen length.
	 *
	 * @param {Number} y - The length to convert.
	 * @returns {Number} The length on screen.
	 *
	 * @memberOf Camera
	 */
	WorldToScreenLengthY(y) {
		return (y) / this.size * this._screenSize.y;
	}
}