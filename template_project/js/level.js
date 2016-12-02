//////////////////////////////////////////////////////////////////
//	This is the level that we are loading in 'gameManager.js'.	//
// 	We declare it in a separate file because of its size.		//
//////////////////////////////////////////////////////////////////
const level = {
	// The name of this level
	"name": "My Awesome Level",

	// The gravity vector in this level. In this case, there is no gravity
	"gravity": { "x": 0, "y": 0 },

	// The array of all the GameObjects that have to be instantiated,
	// and all the components they contain
	"gameObjects": [

		// GameObject 1 //
		//  A red box   //
		//////////////////
		{
			// Add a 'Transform' component
			"Transform": {
				// Sets the initial position to (0,0)
				"position": { "x": 0, "y": 0 },
				// Give this GameObject the name "Box1"
				"name": "Box1"
			},
			// Add a 'SpriteRenderer' component
			"SpriteRenderer": {
				// Give it a width of 1
				"width": 1,
				// and a height of 2
				"height": 2,
				// Use the image located at "img/square_red.png" for display
				"sprite": "img/square_red.png"
			},
			// Add a 'BoxCollider' component
			"BoxCollider": {
				// Give it a width of 1
				"width": 1,
				// and a height of 2
				"height": 2,
				// Give it a coefficient of restitution of 1 (all the energy is conserved)
				"e": 1
			},
			// Add a 'MovingElement' component
			"MovingElement": {
				// Give it a mass of 10
				"mass": 10,
				// Sets it initial velocity to (10,3)
				"velocity": {
					"x": 10,
					"y": 3
				}
			}
		},

		// GameObject 2 //
		//  A blue box  //
		//////////////////
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

		// GameObject 3 //
		//  West Wall   //
		//////////////////
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

		// GameObject 4 //
		//  East Wall   //
		//////////////////
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

		// GameObject 5 //
		//  South Wall  //
		//////////////////
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

		// GameObject 6 //
		//  North Wall  //
		//////////////////
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