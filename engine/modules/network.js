/**
 * The Module that serves as an interface to connect to a remote server (following the standard of Sage_Server).
 */
class Network {
	/**
	 * Creates an instance of Network.
	 */
	constructor() {
		// PRIVATE
		this._maxGOsPerMessage = 200;

		this._websocket = null;
		this._tmpRoomId = 0;
		this._currentRoomId = 0;

		this._networkControllersToSync = []; // Unordered list
		this._remoteNetworkViews = {}; // id -> NetworkView

		this._getRoomListCallbacks = [];
		this._createRoomCallback = undefined;
		this._leaveRoomCallback = undefined;
		this._joinRoomCallback = undefined;
		this._connectCallback = undefined;

		this._gosToCreate = [];
		this._gosInCreation = [];

		this._idsToDestroy = [];
	}

	/**
	 * Connect the engine to a remote server.
	 *
	 * @param {string} ip - The IP address of the server to connect to.
	 * @param {Number} port - The port on which to try to connect to the server.
	 * @param {function} callback - A callback that will be called when a connection to the server is established.
	 *
	 * @memberOf Network
	 */
	Connect(ip, port, callback) {
		if (this._websocket != null)
		{
			this.Disconnect();
		}
		if (typeof callback === "function")
		{
			connectCallback = callback;
		}
		this._websocket = new WebSocket("ws://" + ip + ":" + port);
		this._websocket.onopen = this._onopen;
		this._websocket.onclose = this._onclose;
		this._websocket.onmessage = this._onmessage;
		this._websocket.onerror = this._onerror;
	}

	/**
	 * Get the list of the current rooms on the server.
	 *
	 * @param {function} callback
	 *
	 * @memberOf Network
	 */
	GetRoomsList(callback) {
		let message = {
			command: "getRoomsList"
		};
		if (typeof callback === "function")
		{
			this._getRoomListCallbacks.push(callback);
		}
		this._websocket.send(JSON.stringify(message));
	}

	/**
	 * @callback Network~createRoomCallback
	 * @param {Number} roomId - The ID of the room that was created and joined.
	 */
	/**
	 * Creates a room on the server.
	 *
	 * @param {string} roomName - The name of the room to be created.
	 * @param {Network~createRoomCallback} callback - The callback that is called when a new room is created.
	 *
	 * @memberOf Network
	 */
	CreateRoom(roomName, callback) {
		let message = {
			command: "createRoom",
			name: roomName
		};
		if (typeof callback === "function")
		{
			this._createRoomCallback = callback;
		}
		this._websocket.send(JSON.stringify(message));
	}

	/**
	 * Leave the current room.
	 *
	 * @param {function} callback
	 *
	 * @memberOf Network
	 */
	LeaveRoom(callback) {
		this._currentRoomId = 0;

		// Destroy all networked GameObjects
		for (let i = 0; i < this._networkControllersToSync.length; i++)
		{
			engine.GameObjects.Destroy(this._networkControllersToSync[i].gameObject);
		}
		networkControllersToSync = [];
		for (let key in this._remoteNetworkViews)
		{
			engine.GameObjects.Destroy(this._remoteNetworkViews[key].gameObject);
		}
		this._remoteNetworkViews = {};

		let message = {
			command: "leaveRoom"
		};
		if (typeof callback === "function")
		{
			this._leaveRoomCallback = callback;
		}
		this._websocket.send(JSON.stringify(message));
	}

	/**
	 * Join an existing room on the server.
	 *
	 * @param {Number} id - The id of the room to join.
	 * @param {function} callback
	 *
	 * @memberOf Network
	 */
	JoinRoom(id, callback) {
		if (typeof callback === "function")
		{
			this._joinRoomCallback = callback;
		}

		this._tmpRoomId = id;
		let message = {
			command: "joinRoom",
			roomId: id
		};
		this._websocket.send(JSON.stringify(message));
	}

	/**
	 * Disconnect from the server.
	 *
	 * @memberOf Network
	 */
	Disconnect() {
		this._currentRoomId = 0;

		// Destroy all networked GameObjects
		for (let i = 0; i < this._networkControllersToSync.length; i++)
		{
			engine.GameObjects.Destroy(this._networkControllersToSync[i].gameObject);
		}
		networkControllersToSync = [];
		for (let key in this._remoteNetworkViews)
		{
			engine.GameObjects.Destroy(this._remoteNetworkViews[key].gameObject);
		}
		this._remoteNetworkViews = {};

		if (this._websocket != null)
		{
			this._websocket.close();
		}
	}

	/**
	 * Instantiate an object networkly so that other players can see it.
	 *
	 * @param {GameObjectInfo} data
	 * @returns {GameObject} The GameObject that was created.
	 *
	 * @memberOf Network
	 */
	Instantiate(data) {
		let go = engine.GameObjects.Instantiate(data);

		if (this._currentRoomId == 0)
		{
			console.error("You can't instantiate a networked GameObject if you are not in a room.");
			return go;
		}

		if (go.GetComponent("NetworkController") == undefined)
		{
			console.error("Trying to networkly instantiate a GameObject with no NetworkController");
			return go;
		}

		this._networkControllersToSync.push(go.GetComponent("NetworkController"));

		this._gosInCreation.push(go);
		this._gosToCreate.push(data);
		return go;
	}

	/**
	 * Destroy a networkly instatiated object to also destroy it on the server.
	 *
	 * @param {GameObject} go - The GameObject to destroy.
	 *
	 * @memberOf Network
	 */
	Destroy(go) {
		let controller = go.GetComponent("NetworkController");
		if (controller == undefined)
		{
			console.error("Can't destroy a non-networked GameObject with engine.Network.Destroy() or a GameObject of another client.");
			return;
		}
		this._networkControllersToSync.splice(this._networkControllersToSync.indexOf(controller), 1);

		this._idsToDestroy.push(controller.networkId);

		engine.GameObjects.Destroy(go);
	};

	/**
	 * @private
	 * @memberOf Network
	 */
	$Update() {
		if (this._websocket == null || this._websocket.readyState != 1 || this._currentRoomId == 0)
		{
			return;
		}

		// destroyGO
		if (this._idsToDestroy.length > 0)
		{
			let message = {
				command: "destroyGO",
				ids: this._idsToDestroy
			};

			this._websocket.send(JSON.stringify(message));
			this._idsToDestroy = [];
		}

		// createGO
		if (this._gosToCreate.length > 0)
		{
			while (this._gosToCreate.length > 0)
			{
				let packet = [];
				for (let i = 0; (i < this._gosToCreate.length && i < this._maxGOsPerMessage); i++)
				{
					packet.push(this._gosToCreate[i]);
				}
				let message = {
					command: "createGO",
					gameObjects: packet
				};

				this._websocket.send(JSON.stringify(message));
				this._gosToCreate.splice(0, packet.length);
			}
		}

		// updateGO
		let gameObjectsUpdated = [];
		for (let i = 0; i < this._networkControllersToSync.length; i++)
		{
			if (this._networkControllersToSync[i].toUpdate != null)
			{
				gameObjectsUpdated.push(this._networkControllersToSync[i].toUpdate);
				this._networkControllersToSync[i].toUpdate = undefined;
			}
		}

		if (gameObjectsUpdated.length > 0)
		{
			let message = {
				command: "updateGO",
				gameObjects: gameObjectsUpdated
			};
			this._websocket.send(JSON.stringify(message));
		}
	};

	///////////////////////////////////////
	///// ----- EVENT LISTENERS ----- /////
	///////////////////////////////////////
	/**
	 * @private
	 * @memberOf Network
	 */
	_onopen(e) {
		if (this._connectCallback != undefined)
		{
			this._connectCallback();
			this._connectCallback = undefined;
		}
	}

	/**
	 * @private
	 * @memberOf Network
	 */
	_onclose(e) { }

	/**
	 * @private
	 * @memberOf Network
	 */
	_onmessage(e) {
		let data = JSON.parse(e.data);
		switch (data.command)
		{
			case "roomCreated":
				// The new room has been created (and joined)

				// Destroy all networked GameObjects of an older room
				for (let i = 0; i < engine.Network._networkControllersToSync.length; i++)
				{
					engine.GameObjects.Destroy(engine.Networkthis._networkControllersToSync[i].gameObject);
				}
				engine.Network._networkControllersToSync = [];
				for (let key in engine.Network._remoteNetworkViews)
				{
					engine.GameObjects.Destroy(engine.Network._remoteNetworkViews[key].gameObject);
				}
				engine.Network._remoteNetworkViews = {};

				engine.Network._currentRoomId = data.id;
				if (engine.Network._createRoomCallback != undefined)
				{
					engine.Network._createRoomCallback(engine.Network._currentRoomId);
					engine.Network._createRoomCallback = undefined;
				}
				break;
			//
			case "roomJoined":
				// Joined an already existing room

				// Destroy all networked GameObjects of an older room
				for (let i = 0; i < engine.Network._networkControllersToSync.length; i++)
				{
					engine.GameObjects.Destroy(engine.Network._networkControllersToSync[i].gameObject);
				}
				engine.Network._networkControllersToSync = [];
				for (let key in engine.Network._remoteNetworkViews)
				{
					engine.GameObjectsDestroy(engine.Network._remoteNetworkViews[key].gameObject);
				}
				engine.Network._remoteNetworkViews = {};

				engine.Network._currentRoomId = engine.Network._tmpRoomId;
				engine.Network._tmpRoomId = 0;
				break;
			//
			case "roomLoaded":
				// Room has been loaded, call callbacks
				if (engine.Network._joinRoomCallback != undefined)
				{
					engine.Network._joinRoomCallback();
					engine.Network._joinRoomCallback = undefined;
				}
				break;
			//
			case "roomLeft":
				// Left the room
				if (engine.Network._leaveRoomCallback != undefined)
				{
					engine.Network._leaveRoomCallback();
					engine.Network._leaveRoomCallback = undefined;
				}
				break;
			//
			case "GOCreated":
				// The objects have been created
				for (let i = 0; i < data.ids.length; i++)
				{
					// FIXME : maybe?
					engine.Network._gosInCreation[0].GetComponent("NetworkController").networkId = data.ids[i];
					engine.Network._gosInCreation.splice(0, 1);
				}
				break;
			//
			case "createGO":
				// A new GameObject has been created
				for (let i = 0; i < data.gameObjects.length; i++)
				{
					engine.Network._CreateRemoteGO(data.gameObjects[i]);
				}
				break;
			//
			case "updateGO":
				// Some gameobjects have been updated
				for (let i = 0; i < data.gameObjects.length; i++)
				{
					let id = data.gameObjects[i].networkId;
					delete data.gameObjects[i].networkId;
					engine.Network._remoteNetworkViews[id].updated = data.gameObjects[i];
				}
				break;
			//
			case "destroyGO":
				// Some gameobjects have been destroyed
				for (let i = 0; i < data.ids.length; i++)
				{
					engine.GameObjects.Destroy(engine.Network._remoteNetworkViews[data.ids[i]].gameObject);
					delete engine.Network._remoteNetworkViews[data.ids[i]];
				}
				break;
			//
			case "roomsList":
				// This is the list of the rooms on the server
				for (let i = 0; i < engine.Network._getRoomListCallbacks.length; i++)
				{
					engine.Network._getRoomListCallbacks[i](data.rooms);
				}
				engine.Network._getRoomListCallbacks = [];
				break;
			//
		}
	}

	/**
	 * @private
	 * @memberOf Network
	 */
	_onerror(e) { }

	/**
	 * @private
	 * @memberOf Network
	 */
	_CreateRemoteGO(goInfo) {
		let id = goInfo.networkId;
		delete goInfo.networkId;
		delete goInfo.NetworkController;
		goInfo.NetworkView = {
			networkId: id
		};
		let go = engine.GameObjects.Instantiate(goInfo);
		this._remoteNetworkViews[id] = go.GetComponent("NetworkView");
	}
}