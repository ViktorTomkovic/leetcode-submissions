/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
var maximumSubarraySum = function(nums, k) {
	const map = {};
	let keyCount = 0;
	let currentSum = 0;
	const addToMap = (num) => {
		if (!(num in map)) {
			map[num] = 0;
		}
		if (map[num] == 0) {
			keyCount++;
		}
		map[num]++;
		currentSum += num;
	}
	const removeFromMap = (num) => {
		map[num]--;
		if (map[num] == 0) {
			keyCount--;
		}
		currentSum -= num;
	}
	let maxSum = 0;
	for (let i = 0; i < nums.length; i++) {
		addToMap(nums[i]);
		if (i >= k) {
			removeFromMap(nums[i - k]);
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

