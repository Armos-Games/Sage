/**
 * The basic object that any object in the game will inherit from. It contains basic things for a GameObject
 */
class GameObject {
	/**
	 * Creates an instance of GameObject.
	 *
	 *
	 * @memberOf GameObject
	 */
	constructor() {
		this._components = [];
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$FirstUpdate(deltaTime) {
		// Calls the Update of the prefab and the Updates of all the this._components

		for (let key in this._components)
		{
			this._components[key].FirstUpdate(deltaTime);
		}
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$Update(deltaTime) {
		// Calls the Update of the prefab and the Updates of all the this._components

		for (let key in this._components)
		{
			this._components[key].Update(deltaTime);
		}
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$LateUpdate(deltaTime) {
		// Calls the Update of the prefab and the Updates of all the this._components

		for (let key in this._components)
		{
			this._components[key].LateUpdate(deltaTime);
		}
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$OnLevelLoaded() {

		for (let key in this._components)
		{
			this._components[key].OnLevelLoaded();
		}
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$OnCollision(collision) {
		for (let key in this._components)
		{
			this._components[key].OnCollision(collision);
		}
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$OnTrigger(trigger) {
		for (let key in this._components)
		{
			this._components[key].OnTrigger(trigger);
		}
	}

	/**
	 * @private
	 * @memberOf GameObject
	 */
	$OnDestroy() {
		// Call $OnDestroy for this._components
		for (let key in this._components)
		{
			this._components[key].OnDestroy();
		}

		// Destroy the links between the gameObject and its component
		for (let key in this._components)
		{
			this._components[key].gameObject = null;
			this._components[key] = null;
			delete this._components[key];
		}
	}

	/**
	 * Get a specific component from this GameObject.
	 *
	 * @param {string} compName - The name of the component looked for.
	 * @returns {Component}
	 *
	 * @memberOf GameObject
	 */
	GetComponent(compName) {
		return this._components[compName];
	}

	/**
	 * Add a component to this GameObject
	 *
	 * @param {string} compName - The name of the component.
	 * @param {ComponentInfo} data - The data to initialize the component.
	 * @returns {Component} The component that was created.
	 *
	 * @memberOf GameObject
	 */
	AddComponent(compName, data) {
		let componentType = eval(compName);
		// Check if type exists
		if ((componentType == undefined) || !(componentType.prototype instanceof Component))
		{
			console.error(compName + " is not a valid component. Did you forget to add the link to the Component file?");
			return;
		}
		let self = this;
		componentType.dependencies.forEach(function (requirement) {
			if (self._components[requirement] == undefined)
			{
				console.log("Adding " + requirement);
				self.AddComponent(requirement);
			}
		});
		this._components[compName] = new componentType();
		this._components[compName].gameObject = this;
		if (data == undefined)
		{
			data = {};
		}
		this._components[compName].Start(data);
		return this._components[compName];
	}
}