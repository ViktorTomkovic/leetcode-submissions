/**
* @param {Function} fn
* @return {Function}
*/
var once = function(fn) {
	let count = 0;
	return function(...args) {
		if (count > 0) {
			return;
		};
		count++;
		return fn(...args);
	}
};

fn = (a, b, c) => (a + b + c), calls = [[1, 2, 3], [2, 3, 6]]
const onceFn = once(fn);
console.log(calls.map((value) => onceFn(...value)));

