/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
var maximumSubarraySum = function(nums, k) {
	const map = new Array(100001).fill(0);
	let keyCount = 0;
	let currentSum = 0;
	let maxSum = 0;
	for (let i = 0; i < nums.length; i++) {
		{
			const num = nums[i];
			if (map[num] == 0) {
				keyCount++;
			}
			map[num]++;
			currentSum += num;
		}
		if (i >= k) {
			{
				const num = nums[i - k];
				map[num]--;
				if (map[num] == 0) {
					keyCount--;
				}
				currentSum -= num;

			}
		}
		if (keyCount == k) {
			maxSum = Math.max(maxSum, currentSum);
		}
	}
	return maxSum;
};

var nums, k;
nums = [1, 5, 4, 2, 9, 9, 9], k = 3;
console.log(maximumSubarraySum(nums, k));

nums = [4, 4, 4], k = 3;
console.log(maximumSubarraySum(nums, k));

