/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
	for (let index = 0; index < arr.length; index++) {
		arr[index] = fn(arr[index], index);
	}
	return arr;
};


var fn = function plusone(n) { return n + 1; };
var arr = [1,2,3];

console.log(map(arr, fn));

var fn = function plusI(n, i) { return n + i; };
var arr = [1,2,3];

console.log(map(arr, fn));

var fn = function constant() { return 42; };
var arr = [10,20,30];

console.log(map(arr, fn));

