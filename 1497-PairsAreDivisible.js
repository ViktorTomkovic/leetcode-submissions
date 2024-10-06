/**
* Frequency as an object instead of an array is intentional - exercise for working with object's properties.
* For speed use an array instead..
* @param {number[]} arr
* @param {number} k
* @return {boolean}
*/
var canArrange = function(arr, k) {
	let frequency = {};
	let ach = undefined;
	for (let i = 0; i < arr.length; i++) {
		ach = ((arr[i] % k) + k) % k;
		if (ach in frequency) {
			frequency[ach]++;
		} else {
			frequency[ach] = 1;
		}
	}
	if (0 in frequency && frequency[0] & 1) return false;
	let keys = Object.keys(frequency).filter(v => v !== "0").map(v => Number(v));
	for (let i = 0; i < keys.length; i++) {
		let f1 = frequency[keys[i]];
		let f2 = frequency[k - keys[i]];
		if (f2 === undefined || f1 !== f2) return false;
		if (keys[i] > k/2) return true;
	}
	return true;
};

var arr = [1, 2, 3, 4, 5, 10, 6, 7, 8, 9], k = 5;
console.log(canArrange(arr, k));

var arr = [1, 2, 3, 4, 5, 6], k = 7;
console.log(canArrange(arr, k));

var arr = [1, 2, 3, 4, 5, 6], k = 10;
console.log(canArrange(arr, k));

var arr = [-4, -7, 5, 2, 9, 1, 10, 4, -8, -3], k = 3;
console.log(canArrange(arr, k));

var arr = [3, 8, 17, 2, 5, 6], k = 10;
