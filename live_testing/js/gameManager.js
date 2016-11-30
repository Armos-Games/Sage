var gameManager;
var canvas;

const init = function () {
	canvas = document.getElementsByTagName("canvas")[0];

	// Create engine
	new Engine(canvas);

	let level = {
		name: "Level 1",
		gameObjects: [
			{
				"Transform": {
					"position": { "x": 0, "y": -3 },
					"name": "bottom"
				},
				"SpriteRenderer": {
					"width": 20,
					"height": 0.5,
					"sprite": "img/square_red.png"
				},
				"BoxCollider": {
					"width": 20,
					"height": 0.5,
					"e": 1
				},
				"MovingElement": {
					"fixed": true,
					"mass": 10,
					"velocity": {
						"x": 0,
						"y": 0
					}
				}
			},
			{
				"Transform": {
					"position": { "x": -3, "y": 0 },
					"name": "Left"
				},
				"SpriteRenderer": {
					"width": 0.5,
					"height": 20,
					"sprite": "img/square_red.png"
				},
				"BoxCollider": {
					"width": 0.5,
					"height": 20,
					"e": 1
				},
				"MovingElement": {
					"fixed": true,
					"mass": 10,
					"velocity": {
						"x": 0,
						"y": 0
					}
				}
			},
			{
				"Transform": {
					"position": { "x": 3, "y": 0 },
					"name": "Right"
				},
				"SpriteRenderer": {
					"width": 0.5,
					"height": 20,
					"sprite": "img/square_red.png"
				},
				"BoxCollider": {
					"width": 0.5,
					"height": 20,
					"e": 1
				},
				"MovingElement": {
					"fixed": true,
					"mass": 10,
					"velocity": {
						"x": 0,
						"y": 0
					}
				}
			}
		]
	};
	for (let x = -2; x < 3; x++)
	{
		for (let y = -2; y < 6; y++)
		{
			level.gameObjects.push({
				"Transform": {
					"position": { "x": x, "y": y },
					"name": "Box1"
				},
				"SpriteRenderer": {
					"width": 0.5,
					"height": 0.5,
					"sprite": "img/square_blue.png"
				},
				"BoxCollider": {
					"width": 0.5,
					"height": 0.5,
					"e": 1
				},
				"MovingElement": {
					"mass": 10,
					"velocity": {
						"x": (Math.random() - 0.5) * 2,
						"y": 0
					}
				}
			});
		}
	}

	engine.LoadLevel(level);
	engine.Camera.size = 10;
};