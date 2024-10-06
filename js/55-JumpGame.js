/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
	let a = new Array(nums.length).fill(false);
	a[0] = true;
	for (let i = 0; i < nums.length; i++) {
		if (a[i] == false) {
			return false;
		}
		for (let j = i; j < Math.min(nums.length, i + 1 + nums[i]); j++) {
			a[j] = true;
		}
	}
	return true;
};

