/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
	return function(x) {
		return functions.reduceRight((prev, cur) => cur(prev), x);
	}
};

var functions = [x => x + 1, x => x * x, x => 2 * x], x = 4;
console.log(compose(functions)(x));
