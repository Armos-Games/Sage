/**
 * An object that is attached to any GameObject that will have an animation. It changes the SpriteRenderer of the GameObject.
 *
 * @extends {Component}
 * @property {Number} timePerFrame - The time between the sprite changes.
 */
class Animation extends Component {
    /**
     * Creates an instance of Animation.
     */
	constructor() {
		super();

		this.timePerFrame = 1;

		this._states = {};
		this._currentState = undefined;
		this._timeToNextFrame = 0;
		this._currentSpriteIndex = 0;
		this._playingOnce = false;
	}

    /**
	 * @private
     * @memberOf Animation
     */
	Start(data) {
		if (!("states" in data) || data.states.length <= 0)
		{
			console.error("There is an object with an Animation component which doesn't have any sprites.")
			engine.GameObjects.Destroy(this.gameObject);
			return;
		}

		for (let key in data.states)
		{
			this._states[key] = [];
			for (let i = 0; i < data.states[key].length; i++)
			{
				this._states[key][i] = new Image();
				this._states[key][i].src = data.states[key][i];
			}
		}

		if ("timePerFrame" in data)
		{
			this.timePerFrame = data.timePerFrame;
		}
		if ("state" in data)
		{
			this.Play(data.state)
		}

		this._timeToNextFrame = this.timePerFrame;
		if (this._currentState != undefined)
		{
			this.GetComponent("SpriteRenderer").sprite = this._states[this._currentState][0];
		}
	}

    /**
	 * @private
     * @memberOf Animation
     */
	Update(deltaTime) {
		if (this._currentState == undefined)
		{
			return;
		}

		this._timeToNextFrame -= deltaTime;

		if (this._timeToNextFrame <= 0)
		{
			this._timeToNextFrame = this.timePerFrame;
			this._currentSpriteIndex++;
			if (this._currentSpriteIndex >= this._states[this._currentState].length) // Restart from beginning if not playing once
			{
				if (this._playingOnce)
				{
					this.Stop();
					this._playingOnce = false;
					return;
				}
				this._currentSpriteIndex = 0;
			}
			this.GetComponent("SpriteRenderer").sprite = this._states[this._currentState][this._currentSpriteIndex];
		}
	}

	/**
	 * Start playing the animation of a certain state.
	 *
	 * @param {string} stateName - The state to start playing.
	 * @returns {boolean} True if the state exist or False if the state does not exist.
     *
     * @memberOf Animation
     */
	Play(stateName) {
		if (this._states[stateName] != undefined)
		{
			this._currentState = stateName;
			this._currentSpriteIndex = 0;
			this._timeToNextFrame = this.timePerFrame;
			this.GetComponent("SpriteRenderer").sprite = this._states[this._currentState][0];
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * Stop playing the current animation.
	 *
     * @memberOf Animation
     */
	Stop() {
		this._currentState = undefined;
	}

	/**
	 * Play a state's animation once and then stop.
	 *
	 * @param {string} stateName - The state to start playing.
     *
     * @memberOf Animation
     */
	PlayOnce(stateName) {
		if (this.Play(stateName))
		{
			this._playingOnce = true;
		}
	}

	/**
	 * The current state currently animating.
     *
	 * @readonly
	 *
     * @memberOf Animation
     */
	get currentState() {
		return this._currentState;
	}
}