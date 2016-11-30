/**
 * The Module that contains all the current GameObjects. It is used to access those GameObjects,
 * to instantiate them and to destroy them.
 */
class GameObjects {
	/**
	 * Creates an instance of GameObjects.
	 */
	constructor() {
		this._gameObjects = [];
		this._firstUpdateToCall = [];
	}

	/**
	 * @private
	 * @memberOf GameObjects
	 */
	$Update(deltaTime) {
		// Call the Update of all the GameObjects
		for (let i = 0; i < this._firstUpdateToCall.length; i++)
		{
			this._firstUpdateToCall[i].$FirstUpdate(deltaTime);
		}
		this._firstUpdateToCall = [];
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			this._gameObjects[i].$Update(deltaTime);
		}
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			this._gameObjects[i].$LateUpdate(deltaTime);
		}
	}

	/**
	 * @private
	 * @memberOf GameObjects
	 */
	$OnLevelLoaded() {
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			this._gameObjects[i].$OnLevelLoaded();
		}
	}

	/**
	 * @private
	 * @memberOf GameObjects
	 */
	$DeleteAll() {
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			this.Destroy(this._gameObjects[i]);
		}
		this._gameObjects = [];
	}

	/**
	 * Instantiate a new GameObject.
	 *
	 * @param {GameObjectInfo} data - The informations about the GameObject to Instantiate.
	 * @returns {GameObject} The GameObject Instantiated.
	 *
	 * @memberOf GameObjects
	 */
	Instantiate(data) {
		let go = new GameObject();
		this._gameObjects[this._gameObjects.length] = go;

		for (let key in data)
		{
			go.AddComponent(key, data[key]);
		}

		this._firstUpdateToCall.push(go);

		return this._gameObjects[this._gameObjects.length - 1];
	}

	/**
	 * Destroy a GameObject.
	 *
	 * @param {GameObject} go
	 *
	 * @memberOf GameObjects
	 */
	Destroy(go) {
		// Check if gameObject is in the array
		if (this._gameObjects.indexOf(go) < 0)
		{
			console.error("You are trying to destroy a GameObject that is not in the engine's GameObjects list.");
			return;
		}

		go.$OnDestroy();

		this._gameObjects.splice(this._gameObjects.indexOf(go), 1);
	}

	/**
	 * Returns a copy of the engine's GameObjects array.
	 *
	 * @returns {GameObject[]} A copy of the array of GameObjects.
	 *
	 * @memberOf GameObjects
	 */
	GetGameObjects() {
		return this._gameObjects.slice();
	}

	/**
	 * Returns all the GameObjects that have the provided tag.
	 *
	 * @param {string} tag - The tag to search for.
	 * @returns {GameObject[]} An Array of the GameObjects found.
	 *
	 * @memberOf GameObjects
	 */
	FindGameObjectsWithTag(tag) {
		let gos = [];
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			if (this._gameObjects[i].GetComponent("Transform") != undefined && this._gameObjects[i].GetComponent("Transform").tags.indexOf(tag) != -1)
			{
				gos.push(this._gameObjects[i]);
			}
		}
		return gos;
	};

	/**
	 * Finds the GameObject with the provided name.
	 *
	 * @param {string} n - The name to look for.
	 * @returns {GameObject} The GameObject found (or null if none).
	 *
	 * @memberOf GameObjects
	 */
	FindGameObjectWithName(n) {
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			if (this._gameObjects[i].GetComponent("Transform") != undefined && this._gameObjects[i].GetComponent("Transform").name == n)
			{
				return this._gameObjects[i];
			}
		}
		return null;
	};

	/**
	 * Finds the GameObjects with the provided component.
	 *
	 * @param {string} componentName - The name of the component to find.
	 * @returns {GameObject[]} An Array of the GameObjects found.
	 *
	 * @memberOf GameObjects
	 */
	FindGameObjectsWithComponent(componentName) {
		let gos = [];
		for (let i = 0; i < this._gameObjects.length; i++)
		{
			if (this._gameObjects[i].GetComponent(componentName) != undefined)
			{
				gos.push(this._gameObjects[i]);
			}
		}
		return gos;
	};
}