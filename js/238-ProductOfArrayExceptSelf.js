/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
	var result = new Array(nums.length);
	result[0] = 1;
	for (let i = 1; i < nums.length; i++) {
		result[i] = nums[i - 1] * result[i - 1];
	}
	let postfix = 1;
	for (let i = nums.length - 2; i >= 0; i--) {
		postfix *= nums[i+1];
		result[i] *= postfix;
	}
	return result;
};

var nums = [1,2,3,4];
console.log(productExceptSelf(nums));

var nums = [-1,1,0,-3,3];
console.log(productExceptSelf(nums));

var nums = [3,4,2,2,3];
console.log(productExceptSelf(nums));

