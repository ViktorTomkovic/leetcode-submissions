/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {

	return function(x) {
		let result = x;
		for (let i = functions.length - 1; i >= 0; i--) {
			result = functions[i](result);
		}
		return result;
	}
};

var functions = [x => x + 1, x => x * x, x => 2 * x], x = 4;
console.log(compose(functions)(x));
