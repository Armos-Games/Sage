const l1 = {
	"name": "Level 1",
	"gravity": { "x": 0, "y": 0 },
	"gameObjects": [
		{
			"Transform": {
				"position": { "x": 0, "y": 0 },
				"name": "Box1"
			},
			"SpriteRenderer": {
				"width": 1,
				"height": 2,
				"sprite": "img/square_red.png"
			},
			"BoxCollider": {
				"width": 1,
				"height": 2,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"velocity": {
					"x": 10,
					"y": 3
				}
			}
		},
		{
			"Transform": {
				"position": { "x": 5, "y": 2 },
				"name": "Box2"
			},
			"SpriteRenderer": {
				"width": 2,
				"height": 1,
				"sprite": "img/square_blue.png"
			},
			"BoxCollider": {
				"width": 2,
				"height": 1,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"velocity": {
					"x": 10,
					"y": 3
				}
			}
		},
		{
			"Transform": {
				"position": { "x": -8, "y": 0 },
				"name": "Wall"
			},
			"SpriteRenderer": {
				"width": 0.1,
				"height": 8.2,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"width": 0.1,
				"height": 8,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		},
		{
			"Transform": {
				"position": { "x": 8, "y": 0 },
				"name": "Wall"
			},
			"SpriteRenderer": {
				"width": 0.1,
				"height": 8.2,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"width": 0.1,
				"height": 8,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		},
		{
			"Transform": {
				"position": { "x": 0, "y": -4 },
				"name": "Wall"
			},
			"SpriteRenderer": {
				"width": 16,
				"height": 0.1,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"width": 16,
				"height": 0.1,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		},
		{
			"Transform": {
				"position": { "x": 0, "y": 4 },
				"name": "Wall"
			},
			"SpriteRenderer": {
				"width": 16,
				"height": 0.1,
				"sprite": "img/square_black.png"
			},
			"BoxCollider": {
				"width": 16,
				"height": 0.1,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"fixed": true
			}
		}
	]
};