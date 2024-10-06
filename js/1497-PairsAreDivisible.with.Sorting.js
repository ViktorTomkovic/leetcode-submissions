/**
* @param {number[]} arr
* @param {number} k
* @return {boolean}
*/
var canArrange = function(arr, k) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] = ((arr[i] % k) + k) % k;
	}
	arr.sort((a, b) => a - b);
	let zeroes = 0;
	while (arr[zeroes] == 0) zeroes++;
	if (zeroes % 2 !== 0) return false;
	for (let i = 0; i < arr.length-zeroes; i++) {
		if (((arr[zeroes + i] + arr[arr.length - i - 1]) % k) !== 0) {
			return false;
		}
	}
	return true;
};

var arr = [1, 2, 3, 4, 5, 10, 6, 7, 8, 9], k = 5;
console.log(canArrange(arr, k));

var arr = [1, 2, 3, 4, 5, 6], k = 7;
console.log(canArrange(arr, k));

var arr = [1, 2, 3, 4, 5, 6], k = 10;
console.log(canArrange(arr, k));

var arr = [-4,-7,5,2,9,1,10,4,-8,-3], k = 3;
console.log(canArrange(arr, k));

