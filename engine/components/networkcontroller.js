/**
 * A component that is attached to any gameobject instantiated with engine.Network.Instantiate(). It identify this object networkly.
 *
 * @extends {Component}
 * @property {Number} networkId - The unique id of this NetworkController on the server.
 */
class NetworkController extends Component {
	/**
	 * Creates an instance of NetworkController.
	 */
	constructor() {
		super();

		this._toSync = {};

		this.networkId = null;
		this.toUpdate = undefined;
	}

	/**
	 * @private
	 * @memberOf NetworkController
	 */
	Start(data) {
		if ("letsthis._toSync" in data)
		{
			for (let componentName in data.letsthis._toSync)
			{
				this._toSync[componentName] = {};
				for (let i = 0; i < data.letsthis._toSync[componentName].length; i++)
				{
					let letiableName = data.letsthis._toSync[componentName][i]
					let value = this.GetComponent(componentName)[letiableName];
					this._toSync[componentName][letiableName] = new Vector(value.x, value.y);
				}
			}
		}
	}

	/**
	 * @private
	 * @memberOf NetworkController
	 */
	Update() {
		this.toUpdate = undefined
		for (let componentName in this._toSync)
		{
			for (let letiableName in this._toSync[componentName])
			{
				let value = this.GetComponent(componentName)[letiableName];

				// Exception for vectors (send x and y)
				if (Vector.IsVector(value))
				{
					if (value.x != this._toSync[componentName][letiableName].x || value.y != this._toSync[componentName][letiableName].y)
					{
						if (this.toUpdate == undefined)
						{
							this.toUpdate = {};
						}
						if (this.toUpdate[componentName] == undefined)
						{
							this.toUpdate[componentName] = {};
						}
						this.toUpdate[componentName][letiableName] = {};
						this.toUpdate[componentName][letiableName].x = value.x;
						this.toUpdate[componentName][letiableName].y = value.y;
						this._toSync[componentName][letiableName] = new Vector(value.x, value.y);
					}
				}
				else
				{
					if (value != this._toSync[componentName][letiableName])
					{
						if (this.toUpdate == undefined)
						{
							this.toUpdate = {};
						}
						if (this.toUpdate[componentName] == undefined)
						{
							this.toUpdate[componentName] = {};
						}
						this.toUpdate[componentName][letiableName] = value;
						this._toSync[componentName][letiableName] = value;
					}
				}
			}
		}

		if (this.toUpdate != undefined)
		{
			this.toUpdate.networkId = this.networkId;
		}
	}
}