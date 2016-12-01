/**
 * A component of a GameObject, that makes the object move. It takes into account, forces, gravity, velocity, etc. All moving object use this component.
 *
 * @extends {Component}
 * @property {Number} gravityScale - The percentage of the gravity that is applied on the MovingElement.
 * @property {Number} mass - The mass of the MovingElement. Used for collisions.
 * @property {boolean} fixed - If fixed, the MovingElement won't move.
 * @property {Vector} velocity - The current velocity of the the MovingElement.
 * @property {Number} angularVelocity - The current angular velocity of the MovingElement.
 * @property {boolean} interactable - ?????????????????????????????????????????????????? (See networking).
 */
class MovingElement extends Component {
    /**
     * Creates an instance of MovingElement.
     */
	constructor() {
		super();

		// Private
		this._forces = [];
		this._oldVelocity = Vector.zero;

		// Public
		this.gravityScale = 1;
		this.mass = 1;
		this.fixed = false;
		this.velocity = Vector.zero;
		this.angularVelocity = 0;
		this.interactable = true;
		this.collisionVelocity = Vector.zero;
	}

	/**
	 * @private
     * @memberOf MovingElement
     */
	Start(data) {

		if (data == null)
		{
			return;
		}

		if ("mass" in data)
		{
			this.mass = data.mass;
		}
		if ("velocity" in data)
		{
			this.velocity = new Vector(data.velocity.x, data.velocity.y);
		}
		if ("angularVelocity" in data)
		{
			this.angularVelocity = data.angularVelocity;
		}
		if ("gravityScale" in data)
		{
			this.gravityScale = data.gravityScale;
		}
		if ("fixed" in data)
		{
			this.fixed = data.fixed;
		}
		if ("interactable" in data)
		{
			this.interactable = data.interactable;
		}
	}

	/**
	 * @private
     * @memberOf MovingElement
     */
	LateUpdate(deltaTime) {
		if (!this.interactable)
		{
			return;
		}
		if (this.fixed)
		{
			this._forces = [];
			return;
		}

		// F=ma to convert all this._forces to an acceleration
		let fSum = new Vector(0, 0);
		for (let i = 0; i < this._forces.length; i++)
		{
			fSum = Vector.Add(fSum, this._forces[i]);
		}
		let a = Vector.Multiply(fSum, 1 / this.mass);
		this._forces = [];

		// Change velocity to use collision velocities if necessary
		if (Vector.Subtract(this._oldVelocity, this.velocity).magnitudeSqr < 0.0000001)
		{
			this.velocity = this.collisionVelocity;
		}
		else
		{
			this.collisionVelocity = this.velocity;
		}

		// Add gravity
		a = Vector.Add(a, Vector.Multiply(engine.Physics.gravity, this.gravityScale));

		// Position
		this.GetComponent("Transform").position.x += (this.velocity.x * deltaTime) + (0.5 * a.x * deltaTime * deltaTime);
		this.GetComponent("Transform").position.y += (this.velocity.y * deltaTime) + (0.5 * a.y * deltaTime * deltaTime);

		// Velocity
		this.velocity.x += (a.x * deltaTime);
		this.velocity.y += (a.y * deltaTime);

		// Apply the angular velocity
		// Check if the angularVelocity value is too small (floating point errors)
		if (Math.abs(this.angularVelocity * deltaTime) > Number.EPSILON)
		{
			this.GetComponent("Transform").rotation += this.angularVelocity * deltaTime;
		}
		this._oldVelocity.x = this.velocity.x;
		this._oldVelocity.y = this.velocity.y;
	}

	/**
	 * @private
     * @memberOf MovingElement
     */
	OnCollision(collision) {
		this.collisionVelocity = collision.resultingVelocity;
	}


	/**
	 * Add a force that will be applied on the next frame.
	 *
	 * @param {Vector} force - The force that will be applied.
     *
     * @memberOf MovingElement
     */
	AddForce(force) {
		if (Vector.IsVector(force))
		{
			this._forces.push(force);
			return;
		}
		console.error("Tried to add a force that is not a vector");
	}

	/**
	 * @private
	 * @memberOf MovingElement
	 */
	static get dependencies() {
		return ["Transform"];
	}
}