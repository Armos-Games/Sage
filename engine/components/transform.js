/**
 * A component that positions a GameObject in the world.
 *
 * @extends {Component}
 * @property {string} name - A name that identifies this Transform.
 * @property {string[]} tags - An array of tags that categorize this Transform.
 */
class Transform extends Component {
	/**
	 * Creates an instance of Transform.
	 * @memberOf Transform
	 */
	constructor() {
		super();

		this.name = "";
		this.tags = [];

		this._localPosition = Vector.zero;
		this._localRotation = 0;
		this._parent = null;
		this._children = [];
	}

	/**
	 * @private
	 * @memberOf Transform
	 */
	Start(data) {
		if (data == null)
		{
			return;
		}

		if ("name" in data)
		{
			this.name = data.name;
		}
		if ("rotation" in data)
		{
			this._localRotation = data.rotation;
		}
		if ("tags" in data && Array.isArray(data.tags))
		{
			this.tags = data.tags;
		}
		if ("position" in data)
		{
			this._localPosition = new Vector(data.position.x, data.position.y);
		}
	}

	/**
	 * The position of this Transform in the world.
	 * @memberOf Transform
	 */
	get position() {
		if (this._parent != null)
		{
			return Vector.Add(this._parent.position, this._localPosition);
		}
		else
		{
			return this._localPosition;
		}
	}
	set position(value) {
		if (Vector.IsVector(value) == false)
		{
			console.error("A position has to be a Vector.");
			return;
		}

		if (this._parent != null)
		{
			this._localPosition = Vector.Subtract(value, this._parent.position);
		}
		else
		{
			this._localPosition = value;
		}
	}

	/**
	 * The position of this Transform relative to its parent.
	 * @memberOf Transform
	 */
	get localPosition() {
		return this._localPosition;
	}
	set localPosition(value) {
		if (Vector.IsVector(value) == false)
		{
			console.error("A position has to be a Vector.");
			return;
		}
		this._localPosition = value;
	}


	/**
	 * The rotation of this Tranform in the world.
	 * @memberOf Transform
	 */
	get rotation() {
		if (this._parent != null)
		{
			return this._parent.rotation + this._localRotation;
		}
		else
		{
			return this._localRotation;
		}
	}
	set rotation(value) {
		if (this._parent != null)
		{
			this._localRotation = value - this._parent.rotation;
		}
		else
		{
			this._localRotation = value;
		}
	}

	/**
	 * The rotation of this Tranform relative to its parent.
	 * @memberOf Transform
	 */
	get localRotation() {
		return this._localRotation;
	}
	set localRotation(value) {
		this._localRotation = value;
	}


	/**
	 * The parent of this Tranform.
	 * @memberOf Transform
	 */
	get parent() {
		return this._parent;
	}
	set parent(value) {
		if ((value instanceof Transform) == false && value != null)
		{
			console.error("The parent of a Transform must be another Transform.");
			return;
		}

		if (this._parent != undefined)
		{
			this._parent.$RemoveChild(this);
		}
		this._parent = value;
		if (value != null)
		{
			value.$AddChild(this);
		}
	}

	/**
	 * An array of all the children of this Tranform.
	 *
	 * @readonly
	 *
	 * @memberOf Transform
	 */
	get children() {
		return this._children.slice();
	}

	/**
	 * @private
	 * @memberOf Transform
	 */
	$AddChild(child) {
		this._children.push(child);
	}

	/**
	 * @private
	 * @memberOf Transform
	 */
	$RemoveChild(child) {
		this._children.splice(this._children.indexOf(child), 1);
	}

	/**
	 * @private
	 * @memberOf Transform
	 */
	OnDestroy() {
		// Delete children
		this._children.forEach(function (child) {
			engine.GameObjects.Destroy(child.gameObject);
		});
		// Tell parent we are dead
		if (this._parent != null)
		{
			this._parent.$RemoveChild(this.gameObject);
			this._parent = undefined; // Become Batman
		}
	}
}