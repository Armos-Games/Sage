/**
 * A component that is attached to any gameobject instantiated by remote players and that needs to get synced with the server.
 *
 * @class NetworkView
 * @extends {Component}
 * @property {Number} networkId - The unique id of this NetworkController on the server.
 */
class NetworkView extends Component {
	/**
	 * Creates an instance of NetworkView.
	 */
	constructor() {
		super();

		this.networkId = null;
		this.updated = undefined;
	}

	/**
	 * @private
	 * @memberOf NetworkView
	 */
	Start(data) {
		this.networkId = data.networkId;
	}

	/**
	 * @private
	 * @memberOf NetworkView
	 */
	Update() {
		if (this.updated == undefined)
		{
			return;
		}

		for (let componentName in this.updated)
		{
			for (let variableName in this.updated[componentName])
			{
				let value = this.GetComponent(componentName)[variableName];
				// Exception for vectors (send x and y)
				if (value.x != undefined)
				{
					this.GetComponent(componentName)[variableName].x = this.updated[componentName][variableName].x;
					this.GetComponent(componentName)[variableName].y = this.updated[componentName][variableName].y;
				}
				else
				{
					this.GetComponent(componentName)[variableName] = this.updated[componentName][variableName];
				}
			}
		}

		this.updated = undefined;
	}
}