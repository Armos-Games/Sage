//////////////////////////////////////////////////////////
//	This is the script that instantiates the engine and	//
// 	loads the level contained in 'level.js'.			//
//////////////////////////////////////////////////////////
const init = function () {
	// Find the canvas we want the engine to use. In this case
	// it is the only canvas in the whole HTML page.
	let canvas = document.getElementsByTagName("canvas")[0];

	// Create the engine with the provided canvas
	new Engine(canvas);

	// Load the pre-made level with engine.LoadLevel()
	engine.LoadLevel(level);
};