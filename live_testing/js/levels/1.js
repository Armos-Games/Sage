const l1 = {
	"name": "Niveau de la mort",
	"gravity": { "x": 0, "y": 0 },
	"gameObjects": [
		{
			"Transform": {
				"position": { "x": 0, "y": 0 },
				"name": "Ball1"
			},
			"SpriteRenderer": {
				"width": 2,
				"height": 2,
				"sprite": "img/smile.png"
			},
			"CircleCollider": {
				"radius": 1,
				"roughness": 0,
				"e": 1,
				"rollOnCollision": true
			},
			"MovingElement": {
				"mass": 10,
				"velocity": {
					"x": 3,
					"y": -3
				}
			},
			"Drag": {}
		},
		{
			"Transform": {
				"position": { "x": 2, "y": 2 },
				"name": "Ball2"
			},
			"SpriteRenderer": {
				"width": 2,
				"height": 2,
				"sprite": "img/smile.png"
			},
			"CircleCollider": {
				"radius": 1,
				"roughness": 0,
				"e": 1,
				"rollOnCollision": true
			},
			"MovingElement": {
				"mass": 10,
				"velocity": {
					"x": -3,
					"y": -3
				}
			},
			"Drag": {}
		},
		{
			"Transform": {
				"position": { "x": 0, "y": 5 },
				"name": "Wall-North"
			},
			"SpriteRenderer": {
				"width": 16.1,
				"height": 0.1,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"e": 1,
				"width": 16,
				"height": 0.1
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		},
		{
			"Transform": {
				"position": { "x": 8, "y": 0 },
				"name": "Wall-East"
			},
			"SpriteRenderer": {
				"width": 0.1,
				"height": 10,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"e": 1,
				"width": 0.1,
				"height": 10
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		},
		{
			"Transform": {
				"position": { "x": 0, "y": -5 },
				"name": "Wall-South"
			},
			"SpriteRenderer": {
				"width": 16.1,
				"height": 0.1,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"e": 1,
				"width": 16,
				"height": 0.1
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		},
		{
			"Transform": {
				"position": { "x": -8, "y": 0 },
				"name": "Wall-West"
			},
			"SpriteRenderer": {
				"width": 0.1,
				"height": 10,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"e": 1,
				"width": 0.1,
				"height": 10
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		}
	]
};