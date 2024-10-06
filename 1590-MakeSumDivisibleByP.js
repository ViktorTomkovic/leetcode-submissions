/**
* @param {number[]} nums
* @param {number} p
* @return {number}
*/
var minSubarray = function(nums, p) {
	let sum = nums.reduce((a, c) => a + c, 0) % p;
	if (sum == 0) return 0;
	let longestSum = {};
	longestSum[0] = 0;
	let result = nums.length;
	let prefix = 0;
	for (let i = 0; i < nums.length; i++) {
		prefix = (prefix + nums[i]) % p;
		let diff = (prefix - sum + p) % p
		if (diff in longestSum) {
			result = Math.min(i + 1 - longestSum[diff], result);
		}
		longestSum[prefix] = i + 1;
	}
	if (result == nums.length) {
		return -1;
	}
	return result;
};


var nums = [3, 1, 4, 2], p = 6;
console.log(minSubarray(nums, p));

var nums = [6, 3, 5, 2], p = 9;
console.log(minSubarray(nums, p));

var nums = [50, 1, 2], p = 47;
console.log(minSubarray(nums, p));

var nums = [3, 1, 2], p = 3;
console.log(minSubarray(nums, p));
