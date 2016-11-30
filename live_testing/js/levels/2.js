const l2 = {
	"name": "Level 1",
	"gravity": { "x": 0, "y": 0 },
	"gameObjects": [
		{
			"Transform": {
				"position": { "x": 0, "y": -3 },
				"name": "Box1"
			},
			"SpriteRenderer": {
				"width": 2,
				"height": 2,
				"sprite": "img/circle.png"
			},
			"CircleCollider": {
				"radius": 1,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"velocity": {
					"x": 0,
					"y": 3
				}
			}
		},
		{
			"Transform": {
				"position": { "x": 0, "y": 3 },
				"name": "Box1"
			},
			"SpriteRenderer": {
				"width": 2,
				"height": 2,
				"sprite": "img/square_blue.png"
			},
			"BoxCollider": {
				"width": 2,
				"height": 2,
				"e": 1
			},
			"MovingElement": {
				"mass": 10,
				"velocity": {
					"x": 1,
					"y": -1
				}
			}
		},
	]
};