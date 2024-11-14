/**
* @param {number[]} nums
* @return {number}
*/
var minimumMountainRemovals = function(nums) {
	// LIS - longest increasing sequence
	const lis = new Array(nums.length);
	lis[0] = 1;
	for (let i = 1; i < lis.length; i++) {
		let maxSubsequence = 1;
		for (let j = 0; j < i; j++) {
			if (nums[j] < nums[i]) {
				maxSubsequence = Math.max(maxSubsequence, lis[j] + 1);
			}
		}
		lis[i] = maxSubsequence;
	}

	const lds = new Array(nums.length);
	lds[lds.length - 1] = 1;
	for (let i = lds.length - 2; i >= 0; i--) {
		let maxSubsequence = 1;
		for (let j = i + 1; j < lds.length; j++) {
			if (nums[i] > nums[j]) {
				maxSubsequence = Math.max(maxSubsequence, lds[j] + 1);
			}
		}
		lds[i] = maxSubsequence;
	}
	let minimumRemovals = nums.length;
	for (let i = 0; i < nums.length; i++) {
		if (lis[i] > 1 && lds[i] > 1) {
			minimumRemovals = Math.min(minimumRemovals, nums.length - lis[i] - lds[i] + 1);
		}
	}
	return minimumRemovals;
};

var nums;
nums = [1,3,1];
console.log(minimumMountainRemovals(nums)); // 0

nums = [2, 1, 1, 5, 6, 2, 3, 1];
console.log(minimumMountainRemovals(nums)); // 3

nums = [4,3,2,1,1,2,3,1];
console.log(minimumMountainRemovals(nums)); // 4

nums = [23, 47, 63, 72, 81, 99, 88, 55, 21, 33, 32];
console.log(minimumMountainRemovals(nums)); // 1
