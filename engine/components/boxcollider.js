/**
 * A component used by the CollisonResolver to resolve collisions with boxes (i.e. box-box).
 *
 * @extends {Component}
 * @property {Number} width - The width of the BoxCollider.
 * @property {Number} height - The height of the BoxCollider.
 * @property {Number} e - The coefficient of restitution of this BoxCollider (how much of it's energy is kept after a collision)(between 0 and 1).
 * @property {boolean} isTrigger - If isTrigger, collisions will only trigger events.
 * @property {Number} layer - The physics layer in which this BoxCollider is. There is no collision between two objects on the same layer except on the 0 layer (the default).
 */
class BoxCollider extends Component {
	/**
	 * Creates an instance of BoxCollider.
	 */
	constructor() {
		super();
		this.width = 1;
		this.height = 1;
		this.e = 1;
		this.isTrigger = false;
		this.layer = 0;
	}

	/**
	 * @private
	 * @memberOf BoxCollider
	 */
	Start(data) {
		engine.Physics.$AddCollider(this);

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
		if ("e" in data)
		{
			this.e = data.e;
		}

		if ("isTrigger" in data)
		{
			this.isTrigger = data.isTrigger;
		}
		if ("layer" in data)
		{
			this.layer = data.layer;
		}
	}

	/**
	 * @private
	 * @memberOf BoxCollider
	 */
	OnDestroy() {
		engine.Physics.$RemoveCollider(this);
	}
}