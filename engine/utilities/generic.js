/**
 * Clamps a number between two number.
 *
 * @param {Number} num - The number to clamp.
 * @param {Number} min - The minimum value the number can have.
 * @param {Number} max - The maximum value the number can have.
 * @returns {Number} The number clamped.
 */
const Clamp = function (num, min, max) {
	return Math.min(Math.max(num, min), max);
};