/**
 * The Module that serves as an interface to play sound and music.
 */
class SoundManager {
	/**
	 * Creates an instance of SoundManager.
	 */
	constructor() {
		this._audio = {};
	}

	/**
	 * Loads an audio file into memory so it can eventually be played.
	 *
	 * @param {string} name - The name by which this audio will be accessed.
	 * @param {string} url - the url from which the audio file will be downloaded.
	 *
	 * @memberOf SoundManager
	 */
	Load(name, url) {
		this._audio[name] = new Audio(url);
	}

	/**
	 * Play one of the loaded sound once.
	 *
	 * @param {string} name - The name of the sound to play.
	 *
	 * @memberOf SoundManager
	 */
	Play(name) {
		if (name in this._audios)
		{
			this._audios[name].loop = false;
			this._audios[name].play();
		}
	}

	/**
	 * Play on of the loaded sound in a loop.
	 *
	 * @param {string} name - The name of the sound to play.
	 *
	 * @memberOf SoundManager
	 */
	PlayLoop(name) {
		if (name in this._audios)
		{
			this._audios[name].loop = true;
			this._audios[name].play();
		}
	}

	/**
	 * Pause the playback of a sound.
	 *
	 * @param {string} name - The name of the sound to play.
	 *
	 * @memberOf SoundManager
	 */
	Pause(name) {
		if (name in this._audios)
		{
			this._audios[name].pause();
		}
	}

	/**
	 * Completely stop the playback of a sound, so the next time it is played, it starts from the beginning.
	 *
	 * @param {string} name - The name of the sound to play.
	 *
	 * @memberOf SoundManager
	 */
	Stop(name) {
		if (name in this._audios)
		{
			this._audios[name].pause();
			this._audios[name].currentTime = 0;
		}
	}

	/**
	 * Mute all the sounds.
	 *
	 * @memberOf SoundManager
	 */
	Mute() {
		for (let key in this._audios)
		{
			this._audios[key].muted = true;
		}
	}

	/**
	 * Unmute all the sounds.
	 *
	 * @memberOf SoundManager
	 */
	UnMute() {
		for (let key in this._audios)
		{
			this._audios[key].muted = false;
		}
	}
}