/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
	const n = nums.length;
	k = k % n;
	const a = nums.slice(n - k, n);
	const b = nums.slice(0, n - k);
	const c = [...a, ...b];
	for (var i = 0; i < nums.length; i++) {
		nums[i] = c[i];
	}
};

