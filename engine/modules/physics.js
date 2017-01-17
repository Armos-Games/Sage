/**
 * The Module that takes care of the physics in game. Notably, the collisions.
 * @property {Vector} gravity - The gravity vector of the world.
 */
class Physics {
	/**
	 * Creates an instance of Physics.
	 */
	constructor() {
		this._colliders = {
			circles: [],
			boxes: []
		};
		this.gravity = new Vector(0, -9.8);
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	$Update(deltaTime) {
		this._ResolveCollisions();
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	$AddCollider(collider) {
		if (collider instanceof CircleCollider)
		{
			this._colliders.circles.push(collider);
		}
		else if (collider instanceof BoxCollider)
		{
			this._colliders.boxes.push(collider);
		}
		else
		{
			console.error("AddCollider -- The provided component is not a known component.");
		}
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	$RemoveCollider(collider) {
		if (collider instanceof CircleCollider)
		{
			this._colliders.circles.splice(this._colliders.circles.indexOf(collider), 1);
		}
		else if (collider instanceof BoxCollider)
		{
			this._colliders.boxes.splice(this._colliders.boxes.indexOf(collider), 1);
		}
		else
		{
			console.error("RemoveCollider -- The provided component is not a known component.");
		}
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	_ResolveCollisions() {
		// Collision detection for circles
		for (let i = 0; i < this._colliders.circles.length; i++)
		{
			// With circles
			for (let j = i + 1; j < this._colliders.circles.length; j++)
			{
				if (this._colliders.circles[i].layer == 0 || this._colliders.circles[j].layer == 0 || this._colliders.circles[i].layer != this._colliders.circles[j].layer)
				{
					this._CircleCircle(this._colliders.circles[i], this._colliders.circles[j]);
				}

			}
			// With boxes
			for (let j = 0; j < this._colliders.boxes.length; j++)
			{
				if (this._colliders.circles[i].layer == 0 || this._colliders.boxes[j].layer == 0 || this._colliders.circles[i].layer != this._colliders.boxes[j].layer)
				{
					this._CircleBox(this._colliders.circles[i], this._colliders.boxes[j]);
				}
			}
		}
		// Collision detection for boxes
		for (let i = 0; i < this._colliders.boxes.length; i++)
		{
			// With boxes
			for (let j = i + 1; j < this._colliders.boxes.length; j++)
			{
				if (this._colliders.boxes[i].layer == 0 || this._colliders.boxes[j].layer == 0 || this._colliders.boxes[i].layer != this._colliders.boxes[j].layer)
				{
					this._BoxBox(this._colliders.boxes[i], this._colliders.boxes[j]);
				}
			}
		}
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	_CircleCircle(c1, c2) {
		if (c1.GetComponent("MovingElement").fixed && c2.GetComponent("MovingElement").fixed)
		{
			return;
		}

		let r = (c1.radius + c2.radius);
		let rSqr = r * r;
		let distanceSqr = (c1.GetComponent("Transform").position.x - c2.GetComponent("Transform").position.x) * (c1.GetComponent("Transform").position.x - c2.GetComponent("Transform").position.x) + (c1.GetComponent("Transform").position.y - c2.GetComponent("Transform").position.y) * (c1.GetComponent("Transform").position.y - c2.GetComponent("Transform").position.y);

		// Compare the distance between the two circles and the sum of their radii.
		// If the distance is smaller, then there is a collision to resolve.
		if (distanceSqr < rSqr)
		{
			if (c1.isTrigger || c2.isTrigger)
			{
				let triggerObject1 = {
					collider: c2
				};
				let triggerObject2 = {
					collider: c1
				};

				c1.gameObject.$OnTrigger(triggerObject1);
				c2.gameObject.$OnTrigger(triggerObject2);
				return;
			}

			// Temporary variables for easy access
			let m1 = c1.GetComponent("MovingElement").mass;
			let m2 = c2.GetComponent("MovingElement").mass;
			let v1 = c1.GetComponent("MovingElement").collisionVelocity;
			let v2 = c2.GetComponent("MovingElement").collisionVelocity;

			// Calculate the magnitude of the resulting velocity of both circles
			let e = Math.min(c1.e, c2.e);
			let v1fx = (e * m2 * (v2.x - v1.x) + m1 * v1.x + m2 * v2.x) / (m1 + m2);
			let v1fy = (e * m2 * (v2.y - v1.y) + m1 * v1.y + m2 * v2.y) / (m1 + m2);
			let v2fx = (e * m1 * (v1.x - v2.x) + m1 * v1.x + m2 * v2.x) / (m1 + m2);
			let v2fy = (e * m1 * (v1.y - v2.y) + m1 * v1.y + m2 * v2.y) / (m1 + m2);
			let magnitude1 = (new Vector(v1fx, v1fy)).magnitude;
			let magnitude2 = (new Vector(v2fx, v2fy)).magnitude;

			// Make sure the two circles are not overlaping each other
			let distance = Math.sqrt(distanceSqr);
			let distanceVector = new Vector((c1.GetComponent("Transform").position.x - c2.GetComponent("Transform").position.x), (c1.GetComponent("Transform").position.y - c2.GetComponent("Transform").position.y));
			let director = distanceVector.normalized;

			if (!c1.GetComponent("MovingElement").fixed)
			{
				c1.GetComponent("Transform").position.x += ((r - distance) * director.x);
				c1.GetComponent("Transform").position.y += ((r - distance) * director.y);
			}
			else if (!c2.GetComponent("MovingElement").fixed)
			{
				c2.GetComponent("Transform").position.x += ((r - distance) * -director.x);
				c2.GetComponent("Transform").position.y += ((r - distance) * -director.y);
			}


			// Calculate the angle of the velocity vectors and assign the new velocities
			let surface = new Vector(distanceVector.y, -distanceVector.x);
			let c1Velocity = Vector.Multiply(this._CalculateAngleCircleCircle(Vector.Subtract(v1, v2), surface), magnitude1);
			surface = new Vector(-distanceVector.y, distanceVector.x);
			let c2Velocity = Vector.Multiply(this._CalculateAngleCircleCircle(Vector.Subtract(v2, v1), surface), magnitude2);

			let collisionObject1 = {
				collider: c2,
				resultingVelocity: c1Velocity
			};
			let collisionObject2 = {
				collider: c1,
				resultingVelocity: c2Velocity
			};

			c1.gameObject.$OnCollision(collisionObject1);
			c2.gameObject.$OnCollision(collisionObject2);
		}
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	_BoxBox(b1, b2) {
		if (b1.GetComponent("MovingElement").fixed && b2.GetComponent("MovingElement").fixed)
		{
			return;
		}

		let p1 = b1.GetComponent("Transform").position;
		let p2 = b2.GetComponent("Transform").position;
		let rect1 = { x: p1.x - b1.width / 2, y: p1.y - b1.height / 2, width: b1.width, height: b1.height }
		let rect2 = { x: p2.x - b2.width / 2, y: p2.y - b2.height / 2, width: b2.width, height: b2.height }

		// Collision
		if (rect1.x < rect2.x + rect2.width &&
			rect1.x + rect1.width > rect2.x &&
			rect1.y < rect2.y + rect2.height &&
			rect1.height + rect1.y > rect2.y)
		{
			// Trigger collision
			if (b1.isTrigger || b2.isTrigger)
			{
				let triggerObject1 = {
					collider: b2,
				};
				let triggerObject2 = {
					collider: b1,
				};

				b1.gameObject.$OnTrigger(triggerObject1);
				b2.gameObject.$OnTrigger(triggerObject2);
				return;
			}

			let m1 = b1.GetComponent("MovingElement").mass;
			let m2 = b2.GetComponent("MovingElement").mass;
			let v1 = b1.GetComponent("MovingElement").collisionVelocity;
			let v2 = b2.GetComponent("MovingElement").collisionVelocity;
			let e = Math.min(b1.e, b2.e);

			let distanceX = Math.abs(p1.x - p2.x);
			let distanceY = Math.abs(p1.y - p2.y);
			let overlapX = (b1.width / 2 + b2.width / 2) - distanceX;
			let overlapY = (b1.height / 2 + b2.height / 2) - distanceY;

			let b1Velocity = Vector.zero;
			let b2Velocity = Vector.zero;

			// Calculate the collision on the axis of least penetration
			if (overlapX < overlapY)
			{
				// Collision in the X axis

				// Anti-overlap
				if (b1.GetComponent("MovingElement").fixed)
				{
					b2.GetComponent("Transform").position.x += overlapX * Math.sign(p2.x - p1.x);
				}
				else if (b2.GetComponent("MovingElement").fixed)
				{
					b1.GetComponent("Transform").position.x += overlapX * Math.sign(p1.x - p2.x);
				}
				else
				{
					b1.GetComponent("Transform").position.x += overlapX / 2 * Math.sign(p1.x - p2.x);
					b2.GetComponent("Transform").position.x += overlapX / 2 * Math.sign(p2.x - p1.x);
				}

				// Velocity change
				let v1fx = 0;
				let v2fx = 0;
				if (b1.GetComponent("MovingElement").fixed)
				{
					v2fx = -v2.x * e;
				}
				else if (b2.GetComponent("MovingElement").fixed)
				{
					v1fx = -v1.x * e;
				}
				else
				{
					v1fx = (e * m2 * (v2.x - v1.x) + m1 * v1.x + m2 * v2.x) / (m1 + m2);
					v2fx = (e * m1 * (v1.x - v2.x) + m1 * v1.x + m2 * v2.x) / (m1 + m2);
				}
				b1Velocity = new Vector(v1fx, v1.y);
				b2Velocity = new Vector(v2fx, v1.y);
			}
			else
			{
				// Collision in the Y axis

				// Anti-overlap
				if (b1.GetComponent("MovingElement").fixed)
				{
					b2.GetComponent("Transform").position.y += overlapY * Math.sign(p2.y - p1.y);
				}
				else if (b2.GetComponent("MovingElement").fixed)
				{
					b1.GetComponent("Transform").position.y += overlapY * Math.sign(p1.y - p2.y);
				}
				else
				{
					b1.GetComponent("Transform").position.y += overlapY / 2 * Math.sign(p1.y - p2.y);
					b2.GetComponent("Transform").position.y += overlapY / 2 * Math.sign(p2.y - p1.y);
				}

				// Velocity change
				let v1fy = 0;
				let v2fy = 0;
				if (b1.GetComponent("MovingElement").fixed)
				{
					v2fy = -v2.y * e;
				}
				else if (b2.GetComponent("MovingElement").fixed)
				{
					v1fy = -v1.y * e;
				}
				else
				{
					v1fy = (e * m2 * (v2.y - v1.y) + m1 * v1.y + m2 * v2.y) / (m1 + m2);
					v2fy = (e * m1 * (v1.y - v2.y) + m1 * v1.y + m2 * v2.y) / (m1 + m2);
				}
				b1Velocity = new Vector(v1.x, v1fy);
				b2Velocity = new Vector(v2.x, v2fy);
			}

			let collisionObject1 = {
				collider: b2,
				resultingVelocity: b1Velocity
			};
			let collisionObject2 = {
				collider: b1,
				resultingVelocity: b2Velocity
			};

			b1.gameObject.$OnCollision(collisionObject1);
			b2.gameObject.$OnCollision(collisionObject2);
		}
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	_CircleBox(circle, box) {
		if (circle.GetComponent("MovingElement").fixed && box.GetComponent("MovingElement").fixed)
		{
			return;
		}

		let distance = Vector.Subtract(circle.GetComponent("Transform").position, box.GetComponent("Transform").position);
		let overlapX = (box.width / 2 + circle.radius) - Math.abs(distance.x);
		let overlapY = (box.height / 2 + circle.radius) - Math.abs(distance.y);
		if (overlapX > 0 && overlapY > 0)
		{
			// Trigger collision
			if (box.isTrigger || circle.isTrigger)
			{
				let triggerObjectCircle = {
					collider: box
				};
				let triggerObjectBox = {
					collider: circle
				};

				circle.gameObject.$OnTrigger(triggerObjectCircle);
				box.gameObject.$OnTrigger(triggerObjectBox);
				return;
			}

			let mCircle = circle.GetComponent("MovingElement").mass;
			let mBox = box.GetComponent("MovingElement").mass;
			let e = Math.min(circle.e, box.e);
			let vCircle = circle.GetComponent("MovingElement").collisionVelocity;
			let vBox = box.GetComponent("MovingElement").collisionVelocity;
			let pCircle = circle.GetComponent("Transform").position;
			let pBox = circle.GetComponent("Transform").position;

			let circleVelocity = Vector.zero;
			let boxVelocity = Vector.zero;

			// Calculate the collision on the axis of least penetration
			if (overlapX < overlapY)
			{
				// Collision in the X axis

				// Anti-overlap
				if (circle.GetComponent("MovingElement").fixed)
				{
					box.GetComponent("Transform").position.x += overlapX * Math.sign(pBox.x - pCircle.x);
				}
				else if (box.GetComponent("MovingElement").fixed)
				{
					circle.GetComponent("Transform").position.x += overlapX * Math.sign(pCircle.x - pBox.x);
				}
				else
				{
					circle.GetComponent("Transform").position.x += overlapX / 2 * Math.sign(pCircle.x - pBox.x);
					box.GetComponent("Transform").position.x += overlapX / 2 * Math.sign(pBox.x - pCircle.x);
				}

				// Velocity change
				let vCirclefx = 0;
				let vBoxfx = 0;
				if (circle.GetComponent("MovingElement").fixed)
				{
					vBoxfx = -vBox.x * e;
				}
				else if (box.GetComponent("MovingElement").fixed)
				{
					vCirclefx = -vCircle.x * e;
				}
				else
				{
					vCirclefx = (e * mBox * (vBox.x - vCircle.x) + mCircle * vCircle.x + mBox * vBox.x) / (mCircle + mBox);
					vBoxfx = (e * mCircle * (vCircle.x - vBox.x) + mCircle * vCircle.x + mBox * vBox.x) / (mCircle + mBox);
				}
				circleVelocity = new Vector(vCirclefx, vCircle.y);
				boxVelocity = new Vector(vBoxfx, vBox.y);
			}
			else
			{
				// Collision in the Y axis

				// Anti-overlap
				if (circle.GetComponent("MovingElement").fixed)
				{
					box.GetComponent("Transform").position.y += overlapY * Math.sign(pBox.y - pCircle.y);
				}
				else if (box.GetComponent("MovingElement").fixed)
				{
					circle.GetComponent("Transform").position.y += overlapY * Math.sign(pCircle.y - pBox.y);
				}
				else
				{
					circle.GetComponent("Transform").position.y += overlapY / 2 * Math.sign(pCircle.y - pBox.y);
					box.GetComponent("Transform").position.y += overlapY / 2 * Math.sign(pBox.y - pCircle.y);
				}

				// Velocity change
				let vCirclefy = 0;
				let vBoxfy = 0;
				if (circle.GetComponent("MovingElement").fixed)
				{
					vBoxfy = -vBox.y * e;
				}
				else if (box.GetComponent("MovingElement").fixed)
				{
					vCirclefy = -vCircle.y * e;
				}
				else
				{
					vCirclefy = (e * mBox * (vBox.y - vCircle.y) + mCircle * vCircle.y + mBox * vBox.y) / (mCircle + mBox);
					vBoxfy = (e * mCircle * (vCircle.y - vBox.y) + mCircle * vCircle.y + mBox * vBox.y) / (mCircle + mBox);
				}
				circleVelocity = new Vector(vCircle.x, vCirclefy);
				boxVelocity = new Vector(vBox.x, vBoxfy);
			}

			let collisionObjectCircle = {
				collider: box,
				resultingVelocity: circleVelocity
			};
			let collisionObjectBox = {
				collider: circle,
				resultingVelocity: boxVelocity
			};

			circle.gameObject.$OnCollision(collisionObjectCircle);
			box.gameObject.$OnCollision(collisionObjectBox);
		}
	}

	/**
	 * @private
	 * @memberOf Physics
	 */
	_CalculateAngleCircleCircle(v, surface) {
		// Angle calculation
		let sUnit = surface.normalized;
		let sNormale = new Vector(surface.y, -surface.x);

		// Set new velocity
		let proj1 = Vector.Project(sUnit, v);
		let proj2 = Vector.Project(v, sNormale);
		proj2 = Vector.Multiply(proj2, -1);
		let vUnit = Vector.Add(proj1, proj2).normalized;
		return vUnit;
	}
}


/**
 * The object sent by the collision resolution system to OnTrigger funtions.
 * @typedef {Object} Trigger
 * @property {(CircleCollider|BoxCollider)} collider - The collider with which the collision occured.
 */
/**
 * The object sent by the collision resolution system to OnCollision funtions.
 * @typedef {Object} Collision
 * @property {(CircleCollider|BoxCollider)} collider - The collider with which the collision occured.
 * @property {Vector} resultingVelocity - The resulting velocity of this object following the collision.
 */