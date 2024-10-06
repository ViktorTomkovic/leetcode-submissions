/**
* @param {number[]} height
* @return {number}
*/
var trap = function(height) {
	var pool = new Array(height.length);
	pool[0] = height[0];
	let fix = height[0];
	for (let i = 1; i < pool.length; i++) {
		fix = Math.max(pool[i-1], height[i]);
		pool[i] = fix;
	}
	//console.log(pool);
	fix = height[height.length - 1];
	for (let i = pool.length - 1; i >= 0; i--) {
		fix = Math.max(height[i], fix);
		pool[i] = Math.min(fix, pool[i]);
	}
	//console.log(pool);
	return pool.reduce((acc, cur, index) => acc + (cur - height[index]), 0);
};

var height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
console.log(trap(height));

var height = [4, 2, 0, 3, 2, 5];
console.log(trap(height));

