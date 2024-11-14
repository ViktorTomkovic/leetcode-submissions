/**
* @param {number[]} nums
* @param {number} maximumBit
* @return {number[]}
*/
var getMaximumXor = function(nums, maximumBit) {
	let result = new Array(nums.length);
	let currentXor = 0;
	const mask = (1 << maximumBit) - 1;
	for (let i = 0; i < nums.length; i++) {
		currentXor = currentXor ^ nums[i];
		result[i] = (currentXor & mask) ^ mask;
	}
	return result.reverse();
};

var nums, maximumBit;
nums = [0, 1, 1, 3], maximumBit = 2;
console.log(getMaximumXor(nums, maximumBit));

nums = [2, 3, 4, 7], maximumBit = 3;
console.log(getMaximumXor(nums, maximumBit));

nums = [0, 1, 2, 2, 5, 7], maximumBit = 3;
console.log(getMaximumXor(nums, maximumBit));

