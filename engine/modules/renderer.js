/**
 * The Module that renders all renderers attached to GameObjects on the canvas.
 */
class Renderer {
	/**
	 * Creates an instance of Renderer.
	 *
 	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.$layerChanged = true;
		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");
		this._renderers = [];
	}

	/**
	 * @private
	 * @memberOf Renderer
	 */
	$AddRenderer(renderer) {
		if (renderer instanceof SpriteRenderer)
		{
			this._renderers.push(renderer);
			this.$layerChanged = true;
		}
		else
		{
			console.error("AddRenderer -- The provided component is not a known component.");
		}
	}

	/**
	 * @private
	 * @memberOf Renderer
	 */
	$RemoveRenderer(renderer) {
		if (renderer instanceof SpriteRenderer)
		{
			this._renderers.splice(this._renderers.indexOf(renderer), 1);
		}
		else
		{
			console.error("RemoveRenderer -- The provided component is not a known component.");
		}
	}

	/**
	 * @private
	 * @memberOf Renderer
	 */
	$Update() {
		// Resort the gameObjects array if a new GameObject has been added to it
		if (this.$layerChanged)
		{
			this._renderers.sort(this._SortBySpriteLayerId);
			this.$layerChanged = false;
		}

		this._Render();
	}

	/**
	 * @private
	 * @memberOf Renderer
	 */
	_Render() {
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		for (let i = 0; i < this._renderers.length; i++)
		{
			let toRender = this._renderers[i].gameObject;
			let sr = this._renderers[i];
			if (sr != null && sr.sprite.naturalHeight != 0)
			{
				let transform = toRender.GetComponent("Transform");
				let position = engine.Camera.WorldToScreenPoint(transform.position);
				let rotation = transform.rotation;
				let size = {
					x: engine.Camera.WorldToScreenLengthX(sr.width),
					y: engine.Camera.WorldToScreenLengthY(sr.height)
				};

				let widthSign = (Math.sign(sr.width) == 0) ? (1) : Math.sign(sr.width);
				let heightSign = (Math.sign(sr.height) == 0) ? (1) : Math.sign(sr.height);

				this._ctx.translate(position.x, this._canvas.height - position.y);
				this._ctx.rotate(rotation);
				this._ctx.scale(widthSign, heightSign);

				this._ctx.drawImage(sr.sprite, -(size.x / 2) + 0.5, -(size.y / 2) + 0.5, size.x, size.y);

				this._ctx.scale(widthSign, heightSign);
				this._ctx.rotate(-rotation);
				this._ctx.translate(-position.x, -(this._canvas.height - position.y));

			}
		}
	}

	/**
	 * @private
	 * @memberOf Renderer
	 */
	_SortBySpriteLayerId(a, b) {
		return a.layer - b.layer;
	}
}