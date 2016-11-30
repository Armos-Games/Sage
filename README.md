# SAGE - Sage a Game Engine

SAGE is a very simple JavaScript 2D game engine. It uses HTML5 canvas to render simple games with simple 2D physics. It supports many features including:

* Display
	* Sprite rendering
	* Sprite-based animation system
	* Camera
* Physics
	* Circle and AABB collisions
	* Forces, velocity and angular velocity
* Simple keyboard and mouse input management
* Simple sound management
* Basic Networking (see Sage_Server)

## Getting Started

To create a game with the engine, you need:
* An HTML document with a canvas
* The SAGE game engine
* Some JavaScript that will use the engine

First, you need to include the engine in the HTML file.

```html
<script type="text/javascript" src="js/sage.min.js"></script>
```

To use the engine, you create a new `Engine` object and give it the HTML5 canvas it will use to render the game as a parameter. For example :

```javascript
const init = function () {
	new Engine(document.getElementsByTagName("canvas")[0]);
};
```

A complete game template can be found [here]().

## GameObjects

The game is made with GameObjects. A GameObject is anything that is in the game (player, weapon, vehicle, platform, etc). A GameObject can be added to the game this way:

```javascript
let go = engine.Instantiate(data);
```

The `data` argument is a JavaScript object containing the informations about this GameObject, more specificaly, about its Components (see Components below).

## Components

Components are used to change the behavior of a GameObject. In fact, adding a GameObject to the game won't display or change anything if there are no Components attached to it. There are two ways to add a Component to the game.

By passing a list of components to the `Instantiate` function:

```javascript
let go = engine.Instantiate({
	"component1": {
		"property1" : value,
		"property2" : {},
		"property3" : []
	},
	"component2" : {}
});
```
Or with the `AddComponent` function if the GameObject already exists:

```javascript
go.AddComponent("component1", {
	"property1" : value,
	"property2" : {},
	"property3" : []
});
```

These are the default components that you can use that already exist in the engine:


|Component|Description|
|---|---|
|`Transform`|Is used to give the position, the rotation and the scale of a GameObject|
|`SpriteRenderer`|Is used to display a sprite|
|`Animation`|Is used to display multiple sprites in an animation|
|`MovingElement`|Is used to apply any kind of physics to a GameObject|
|`BoxCollider`|Is used to apply a rectangle collider to a GameObject|
|`CircleCollider`|Is used to apply a circle collider to a GameObject|
|`NetworkController`|Is used to control an object over the network|

## Levels

The engine is level-based, which means that you can create different levels in the JSON format and load them. The levels contain a list of GameObjects with their Components. Once the engine has been initialised with `new Engine(canvas)` you can use the `engine.LoadLevel(level)` function to load a level. The engine will then instantiate all the GameObjects and start the physics.

Here is an example of level:

```json
{
	"name": "Lorem Ipsum",
	"gravity": { "x": 0, "y": 0 },
	"gameObjects": [
		{
			"Transform": {
				"position": { "x": 0, "y": 0 }
			},
			"SpriteRenderer": {
				"sprite": "img.png",
				"width": 1,
				"height": 1
			}
		},
		{
			"Transform": {
				"position": { "x": 0, "y": 0 }
			},
			"SpriteRenderer": {
				"sprite": "img2.png",
				"width": 2,
				"height": 2
			}
		}
	]
};
```

In this example, the level contains only two GameObjects. Both of them contain a Transform and a SpriteRenderer Component which will allow the game to display the sprite of the object at a specific position. Apart from the `gameObjects[]` array, the level also have a `name` tag to give your level a name and a `gravity` tag to be able to change the gravity acceleration in the game.

This level can be loaded using: `engine.LoadLevel(level);`

## Hierarchy

A typical game hierarchy can look like this:

* __css__
	* index.css
* __img__
	* img1.png
	* img2.jpg
* __js__
	* __levels__
		* level1.js
		* level2.js
	* __components__
		* component1.js
	* sage.min.js
	* gamemanager.js
* index.html