/**
 * @return {Function}
 */
var createHelloWorld = function() {
	// viable return () => "Hello World";
	return function(...args) {
		return "Hello World"
	}
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */
