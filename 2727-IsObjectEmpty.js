/**
* @param {Object|Array} obj
* @return {boolean}
*/
var isEmpty = function(obj) {
	return Object.keys(obj).length == 0;
};

var obj = {"x": 5, "y": 42}
console.log(isEmpty(obj));

var obj = {}
console.log(isEmpty(obj));

var obj = [null, false, 0]
console.log(isEmpty(obj));
