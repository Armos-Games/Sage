//     SSSSSSSSSSSSSSS              AAA                  GGGGGGGGGGGGGEEEEEEEEEEEEEEEEEEEEEE
//   SS:::::::::::::::S            A:::A              GGG::::::::::::GE::::::::::::::::::::E
//  S:::::SSSSSS::::::S           A:::::A           GG:::::::::::::::GE::::::::::::::::::::E
//  S:::::S     SSSSSSS          A:::::::A         G:::::GGGGGGGG::::GEE::::::EEEEEEEEE::::E
//  S:::::S                     A:::::::::A       G:::::G       GGGGGG  E:::::E       EEEEEE
//  S:::::S                    A:::::A:::::A     G:::::G                E:::::E
//   S::::SSSS                A:::::A A:::::A    G:::::G                E::::::EEEEEEEEEE
//    SS::::::SSSSS          A:::::A   A:::::A   G:::::G    GGGGGGGGGG  E:::::::::::::::E
//      SSS::::::::SS       A:::::A     A:::::A  G:::::G    G::::::::G  E:::::::::::::::E
//         SSSSSS::::S     A:::::AAAAAAAAA:::::A G:::::G    GGGGG::::G  E::::::EEEEEEEEEE
//              S:::::S   A:::::::::::::::::::::AG:::::G        G::::G  E:::::E
//              S:::::S  A:::::AAAAAAAAAAAAA:::::AG:::::G       G::::G  E:::::E       EEEEEE
//  SSSSSSS     S:::::S A:::::A             A:::::AG:::::GGGGGGGG::::GEE::::::EEEEEEEE:::::E
//  S::::::SSSSSS:::::SA:::::A               A:::::AGG:::::::::::::::GE::::::::::::::::::::E
//  S:::::::::::::::SSA:::::A                 A:::::A GGG::::::GGG:::GE::::::::::::::::::::E
//   SSSSSSSSSSSSSSS AAAAAAA                   AAAAAAA   GGGGGG   GGGGEEEEEEEEEEEEEEEEEEEEEE
var engine;

/**
 * The main class which contains all of the engine. It is the class to instantiate to create a new Instance of the
 * engine.
 *
 * @class Engine
 */
class Engine {
	constructor(canvas) {
		if (engine != undefined)
			console.warn("An engine already exist. Replacing for now.");
		engine = this;

		// Modules
		this.Camera = new Camera(canvas);
		this.InputManager = new InputManager(canvas);
		this.Network = new Network();
		this.SoundManager = new SoundManager();
		this.GameObjects = new GameObjects();
		this.Renderer = new Renderer(canvas);
		this.Physics = new Physics();

		// Private
		this._canvas = canvas;
		this._lastTimestamp = 0;
		this._deltaTime = 0.02;
		this._requestAnimationFrameId = window.requestAnimationFrame(this._Update, canvas);
	}

	/**
	 * @private
	 * @memberOf Engine
	 */
	_Update(timestamp) {
		// Calculate the deltaTime
		if (engine._lastTimestamp !== 0)
		{
			engine._deltaTime = (timestamp - engine._lastTimestamp) / 1000;
			engine._deltaTime = Math.min(engine._deltaTime, 0.02);
		}
		engine._lastTimestamp = timestamp;

		// Call update of modules
		engine.GameObjects.$Update(engine._deltaTime);
		engine.Network.$Update();
		engine.Physics.$Update();
		engine.Renderer.$Update();

		engine._requestAnimationFrameId = window.requestAnimationFrame(engine._Update, engine._canvas);
	};

    /**
     * Load the level passed as parameter.
     *
     * @param {LevelInfo} level - The informations about the level to load.
     * @param {boolean} net - Does the level need to be loaded on a network?
     * @memberOf Engine
	 */
	LoadLevel(level, net) {
		if (this._requestAnimationFrameId != null)
		{
			cancelAnimationFrame(this._requestAnimationFrameId);
		}

		// Unfocus the button
		document.activeElement.blur();

		if (net == true)
		{
			for (let i = 0; i < level.gameObjects.length; i++)
			{
				this.Network.Instantiate(level.gameObjects[i]);
			}
		}
		else
		{
			for (let i = 0; i < level.gameObjects.length; i++)
			{
				this.GameObjects.Instantiate(level.gameObjects[i]);
			}
		}

		if ("gravity" in level)
		{
			this.Physics.gravity = new Vector(level.gravity.x, level.gravity.y);
		}
		this.GameObjects.$OnLevelLoaded();
		if ("name" in level)
		{
			console.log("Loaded level : '" + level.name + "'");
		}
		this._requestAnimationFrameId = window.requestAnimationFrame(this._Update, this._canvas);
	}
}






/**
 * The object that engine.LoadLevel() will load.
 * @typedef {Object} LevelInfo
 * @property {string} name - The name of the level.
 * @property {GameObjectInfo[]} gameObjects - An array of all the GameObjects to be instantiated.
 */

/**
 * The object that GameObjects.Instantiate() will use to instantiate a GameObject.
 * @typedef {Object.<string, ComponentInfo>} GameObjectInfo
 */

/**
 * The object that Component.Start() receives when it is created.
 * @typedef {Object.<string, any>} ComponentInfo
 */