/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
	/**
	 * @param {Number} expected
	*/
	const toBe = (expected) => {
		if (val === expected) {
			return true;
		} else {
			throw new Error('Not Equal');
		};
	};
	const notToBe = (expected) => {
		if (val !== expected) {
			return true;
		} else {
			throw new Error('Equal');
		}
	};

	return {
		toBe,
		notToBe
	};
};


console.log(expect(5).toBe(5)); // true
console.log(expect(5).notToBe(5)); // throws "Equal"

