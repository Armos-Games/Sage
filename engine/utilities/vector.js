/**
 * A class to represent a two-dimensional vector which has multiple uses : position, velocity, acceleration, etc.
 *
 * @property {Number} x - The X component of the vector.
 * @property {Number} y - The Y component of the vector.
 */
class Vector {
	/**
	 * Creates an instance of Vector.
	 *
	 * @param {Number} x - The initial X component of the vector.
	 * @param {Number} y - The initial Y component of the vector.
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	/**
	 * The magnitude of the Vector.
	 *
	 * @readonly
	 *
	 * @memberOf Vector
	 */
	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	/**
	 * The magnitude of the Vector, squarred.
	 *
	 * @readonly
	 *
	 * @memberOf Vector
	 */
	get magnitudeSqr() {
		return this.x * this.x + this.y * this.y;
	}

	/**
	 * Gives the angle of the Vector.
	 *
	 * @readonly
	 *
	 * @memberOf Vector
	 */
	get angle() {
		if (this.y < 0)
		{
			return 2 * Math.PI - Math.acos(this.x / this.magnitude);
		}
		return Math.acos(this.x / this.magnitude);
	}

	/**
	 * Get the normalized version of this Vector.
	 *
	 * @readonly
	 *
	 * @memberOf Vector
	 */
	get normalized() {
		let mag = this.magnitude;
		if (mag === 0)
		{
			return new Vector(0, 0);
		}
		return Vector.Multiply(this, 1 / mag);
	}

	/**
	 * Clamp the current Vector to a certain maximum.
	 *
 	 * @param {Number} max - The maximum value of the resulting vector's magnitude
	 *
	 * @memberOf Vector
	 */
	Clamp(max) {
		let mag = this.magnitude;
		if (mag === 0)
			return;
		if (mag > max)
		{
			let tmp = Vector.Multiply(this, (max / mag));
			this.x = tmp.x;
			this.y = tmp.y;
		}
	}

	/**
 	 * Find the distance between the two vector, squarred.
	 *
	 * @static
 	 * @param {Vector} v1 - The first vector
 	 * @param {Vector} v2 - The second vector
	 * @returns {Number}
	 *
	 * @memberOf Vector
	 */
	static DistanceSqr(v1, v2) {
		if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}

		return ((v2.x - v1.x) * (v2.x - v1.x)) + ((v2.y - v1.y) * (v2.y - v1.y));
	}

	/**
	 * Find the distance between the two vector.
	 *
	 * @static
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Number} The distance between the two Vectors.
	 *
	 * @memberOf Vector
	 */
	static Distance(v1, v2) {
		if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}

		return Math.sqrt(Vector.DistanceSqr(v1, v2));
	}

	/**
	 * Verify if the provided object is a Vector.
	 *
	 * @static
	 * @param {any} vector - The object to test.
	 * @returns {boolean}
	 *
	 * @memberOf Vector
	 */
	static IsVector(vector) {
		return (vector instanceof Vector);
	}

	/**
	 * Adds two Vectors together
	 *
	 * @static
	 * @param {Vector} v1 - The first vector.
	 * @param {Vector} v2 - The second vector.
	 * @returns {Vector} The resulting vector.
	 *
	 * @memberOf Vector
	 */
	static Add(v1, v2) {
		if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}

		return new Vector(v1.x + v2.x, v1.y + v2.y);
	}

	/**
	 * Subtract one Vector from another one.
	 *
	 * @static
	 * @param {Vector} v1 - The first vector.
	 * @param {Vector} v2 - The second vector.
	 * @returns {Vector} The resulting vector.
	 *
	 * @memberOf Vector
	 */
	static Subtract(v1, v2) {
		if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}

		return new Vector(v1.x - v2.x, v1.y - v2.y);
	}
	/**
	 * Multiply a Vector by a scalar
	 *
	 * @static
	 * @param {Vector} v1 - The vector to multiply.
	 * @param {Number} s - The scalar to multiply with.
	 * @returns {Vector} The resulting Vector.
	 *
	 * @memberOf Vector
	 */
	static Multiply(v1, s) {
		if (!(v1 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}

		return new Vector(v1.x * s, v1.y * s);
	}

	/**
	 * Calculate the dot product between two vectors.
	 *
	 * @static
	 * @param {Vector} v1 - The first Vector.
	 * @param {Vector} v2 - The second Vector.
	 * @returns {Number} The resulting scalar.
	 *
	 * @memberOf Vector
	 */
	static DotProduct(v1, v2) {
		if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}

		return (v1.x * v2.x + v1.y * v2.y);
	}
	/**
	 * Calculate the projection of a Vector on another Vector.
	 *
	 * @static
	 * @param {Vector} v1 - The Vector to project from.
	 * @param {Vector} v2 - The Vector to project on.
	 * @returns {Vector} The resulting Vector.
	 *
	 * @memberOf Vector
	 */
	static Project(v1, v2) {
		if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
		{
			console.error("The arguments are not vectors")
			return null;
		}
		if (v2.magnitudeSqr === 0)
			return Vector.zero;
		return Vector.Multiply(v2, Vector.DotProduct(v1, v2) / v2.magnitudeSqr);
	}
	/**
	 * The zero Vector.
	 *
	 * @readonly
	 * @static
	 *
	 * @memberOf Vector
	 */
	static get zero() {
		return new Vector(0, 0);
	}
}