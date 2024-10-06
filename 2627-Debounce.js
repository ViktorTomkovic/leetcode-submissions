/**
* @param {Function} fn
* @param {number} t milliseconds
* @return {Function}
*/
var debounce = function(fn, t) {
	let timerId;
	return function(...args) {
		if (timerId !== undefined) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => fn(...args), t);
	}
};
