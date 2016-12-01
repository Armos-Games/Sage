/**
 * An object that is attached to any object that will be rendered by the GameManager. It contains the informations to render it.
 *
 * @extends {Component}
 * @property {HTMLImageElement} sprite - The HTML Image that will be displayed for this SpriteRenderer.
 * @property {Number} width - The width of the Image that will be displayed.
 * @property {Number} height - THe height of the Image that will be displayed.
 */
class SpriteRenderer extends Component {
	/**
	 * Creates an instance of SpriteRenderer.
	 */
	constructor() {
		super();

		this._layer = 0;

		this.sprite = new Image();
		this.width = 1;
		this.height = 1;
	}

	/**
	 * @private
	 * @memberOf SpriteRenderer
	 */
	Start(data) {
		engine.Renderer.$AddRenderer(this);

		if (data == null)
		{
			return;
		}

		if ("width" in data)
		{
			this.width = data.width;
		}
		if ("height" in data)
		{
			this.height = data.height;
		}
		if ("sprite" in data)
		{
			this.sprite.src = data.sprite;
		}
		if ("layer" in data)
		{
			this._layer = data.layer;
		}
	}

	/**
	 * The layer on which the SpriteRenderer will be displayed.
	 *
	 * @memberOf SpriteRenderer
	 */
	get layer() {
		return this._layer;
	}
	set layer(value) {
		this._layer = value;
		engine.Renderer.$layerChanged = true;
	}

	/**
	 * @private
	 * @memberOf SpriteRenderer
	 */
	OnDestroy() {
		engine.Renderer.$RemoveRenderer(this);
	}

	/**
	 * @private
	 * @memberOf SpriteRenderer
	 */
	static get dependencies() {
		return ["Transform"];
	}
}