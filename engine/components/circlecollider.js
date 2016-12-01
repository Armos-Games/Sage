/**
 * A component used by the CollisonResolver to resolve collisions with circles (i.e. circle-circle).
 *
 * @extends {Component}
 * @property {Number} radius - The radius of the circle that will be used to calculate collisions.
 * @property {Number} e - The coefficient of restitution of this BoxCollider (how much of it's energy is kept after a collision)(between 0 and 1).
 * @property {Number} roughness - The roughness of the objects which will determine how much friction will slow it down(between 0 and 1).
 * @property {boolean} rollOnCollision - If rollOnCollision, collisions will make the GameObject rotate.
 * @property {boolean} isTrigger - If isTrigger, collisions will only trigger events.
 * @property {Number} layer - The physics layer in which this BoxCollider is. There is no collision between two objects on the same layer except on the 0 layer (the default).
 */
class CircleCollider extends Component {
	/**
	 * Creates an instance of CircleCollider.
	 */
	constructor() {
		super();

		// Public
		this.radius = 1;
		this.e = 1;
		this.roughness = 0;
		this.rollOnCollision = false;
		this.isTrigger = false;
		this.layer = 0;
	}

	/**
	 * @private
	 * @memberOf CircleCollider
	 */
	Start(data) {
		engine.Physics.$AddCollider(this);

		if (data == null)
		{
			return;
		}

		if ("e" in data)
		{
			this.e = data.e;
		}
		if ("radius" in data)
		{
			this.radius = data.radius;
		}
		if ("roughness" in data)
		{
			this.roughness = data.roughness;
		}
		if ("rollOnCollision" in data)
		{
			this.rollOnCollision = data.rollOnCollision;
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
	 * @memberOf CircleCollider
	 */
	OnDestroy() {
		engine.Physics.$RemoveCollider(this);
	}

	/**
	 * @private
	 * @memberOf CircleCollider
	 */
	static get dependencies() {
		return ["Transform", "MovingElement"];
	}
}