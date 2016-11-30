class Follow extends Component {
	constructor() {
		super();
	}

	Update(deltaTime) {
		camera.position = this.GetComponent("Transform").GetWorldPosition();
	}
}