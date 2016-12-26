class Aim extends Component {
	constructor() {
		super();
	}

	Update(deltaTime) {
		this.GetComponent("Transform").position = engine.InputManager.mouse.position;

		if (engine.InputManager.mouse.scroll == 1)
		{
			engine.Camera.size--;
		}
		if (engine.InputManager.mouse.scroll == -1)
		{
			engine.Camera.size++;
		}
		if (engine.InputManager.keysPressed[38])
		{
			engine.Camera.position = new Vector(engine.Camera.position.x, engine.Camera.position.y + 0.1);
		}
	}
}