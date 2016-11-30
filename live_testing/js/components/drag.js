let isDragging = false;

class Drag extends Component {
	constructor() {
		super();
		this._isDraggingThis = false;
	}

	Update(deltaTime) {
		let mouse = engine.InputManager.mouse;

		if (mouse.isDown && Vector.Subtract(this.GetComponent("Transform").position, mouse.position).magnitude < this.GetComponent("CircleCollider").radius && !isDragging)
		{
			this._isDraggingThis = true;
			isDragging = true;
		}

		if (this._isDraggingThis)
		{
			if (!mouse.isDown)
			{
				this._isDraggingThis = false;
				isDragging = false;
			}
			this.GetComponent("MovingElement").velocity = Vector.Multiply(Vector.Subtract(mouse.position, this.GetComponent("Transform").position), 1 / deltaTime);
		}

	}
}