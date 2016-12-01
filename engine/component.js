/**
 * The basic object that any component in the game will inherit from.
 */
class Component {
	// All the functions are there to be replaced by children inheriting from Component

	/**
	 * Called when the GameObject is created.
	 *
	 * @param {ComponentInfo} data - The data used tu initially setup the Component.
	 * @memberOf Component
	 */
	Start(data) { }

    /**
     * Called when all the GameObjects of the levels have been created and their Start() function called.
	 * @memberOf Component
     */
	OnLevelLoaded() { }

    /**
     * Called once each frame
     *
     * @param {Number} deltaTime - The time that has passed since the last frame.
     * @memberOf Component
     */
	Update(deltaTime) { }

    /**
     * Called at the end of a frame. After all Update() functions were called.
     *
     * @param {Number} deltaTime - The time that has passed since the last frame.
     * @memberOf Component
     */
	LateUpdate(deltaTime) { }

    /**
     * Called when a collision occurs with a collider on this GameObject.
     *
     * @param {Collision} collision - The collision object that has informations about the collision.
     * @memberOf Component
     */
	OnCollision(collision) { }

    /**
     * Called when a collision occurs with a isTrigger collider on this GameObject.
     *
     * @param {Trigger} trigger - The collision object that has information about the collision.
     * @memberOf Component
     */
	OnTrigger(trigger) { }

    /**
     * Called when this GameObject is about to get destroyed.
     * @memberOf Component
     */
	OnDestroy() { }

    /**
     * Called at the start of the first update this GameObject has. Before the Update() are called.
     * @memberOf Component
     */
	FirstUpdate() { }

    /**
     * Get a specific component from this Component's GameObject.
     *
     * @param {string} compName - The name of the component looked for.
     * @returns {Component}
     * @memberOf Component
     */
	GetComponent(compName) {
		return this.gameObject.GetComponent(compName);
	}

	/**
	 * Get an array of the Component's dependencies.
	 *
	 * @readonly
	 * @static
	 * @memberOf Component
	 */
	static get dependencies() {
		return [];
	}
}