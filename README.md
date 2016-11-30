# SAGE - Sage a Game Engine

SAGE is a very simple JavaScript 2D game engine. It uses HTML5 canvas to render simple games with simple 2D physics. It supports many features including:

* [Features](#features)
* [Getting Started](#getting-started)
	* [GameObjects](#gameobjects)
	* [Components](#components)
	* [Levels](#levels)
* [Documentation](#documentation)
* [Building yourself](#building-yourself)

## Features

* Display
	* Sprite rendering
	* Sprite-based animation system
	* Camera
* Physics
	* Circle and AABB collisions
	* Forces, velocity and angular velocity
* Simple keyboard and mouse input management
* Simple sound management
* Basic Networking (see [Sage_Server](https://github.com/Armos-Games/Sage-Server))

## Getting Started

To create a game with the engine, you need:
* An HTML document with a canvas
* The SAGE game engine
* Some JavaScript that will use the engine

First, include the engine in the HTML file.

```html
<script type="text/javascript" src="js/sage.min.js"></script>
```

To use the engine, you create a new `Engine` object and give it the HTML5 canvas it will use to render the game as a parameter. For example :

```javascript
const init = function () {
	new Engine(document.getElementsByTagName("canvas")[0]);
};
```

### GameObjects

The game is made with GameObjects. A GameObject is anything that is in the game (players, weapons, health bars, platforms, etc). A GameObject can be added to the game this way:

```javascript
let go = engine.GameObjects.Instantiate(data);
```

The `data` argument is a JavaScript object containing the informations about this GameObject, more specificaly, about its Components (see Components below).

### Components

Components are used to change the behaviour of a GameObject. In fact, only adding an empty GameObject to the game won't display or change anything. There are two ways to add a Component to a GameObject.

1. By passing a list of components to the `Instantiate` function:
```javascript
let go = engine.GameObjects.Instantiate({
	component1: {
		property1 : value,
		property2 : {},
		property3 : []
	},
	component2 : {}
});
```
2. With the `AddComponent` function if the GameObject already exists:
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

### Levels

You can create different levels in the JSON format and then load them into the engine. A level contains a list of GameObjects to create with their Components and some other optionnal informations about the level it is loading. Once the engine has been initialised with `new Engine(canvas)` you can use the `engine.LoadLevel(level)` function to load a level. The engine will then instantiate all the GameObjects.

Here is an example of a level:

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

In this example, the level contains two GameObjects. Both of them have a Transform and a SpriteRenderer Component which will allow the game to display a sprite at their position. Apart from the `gameObjects[]` array, the level also has a `name` tag to give the level a name and a `gravity` tag to  change the gravity vector in the game.

>A complete game template can be found [here](https://github.com/Armos-Games/Sage/tree/update-readme/template_project).

## Documentation

The engine's documentation is available [here](TODO)

## Building yourself

To build the latest version of Sage, you will need [NodeJS](https://nodejs.org) installed.

1. Clone or download this repository to your computer.
2. Download all the necessary dependencies from NPM by running `npm install` in the repository folder.
3. You can then build :
	* The minified version of the engine with `npm run compile`
	* The engine's documentation with `npm run doc`
	* The engine's Dash-compatible docset with `npm run docset`
4. Have fun!