/**
* @param {number[]} nums
* @param {number} k
* @return {number[]}
*/
var resultsArray = function(nums, k) {
	k--;
	let consecutivnessBegginings = new Array(nums.length);
	consecutivnessBegginings[0] = -1;
	for (let i = 1; i < nums.length; i++) {
		consecutivnessBegginings[i] = (nums[i] == nums[i - 1] + 1) ? consecutivnessBegginings[i - 1] : i;
	}
	let results = new Array(nums.length - k);
	for (let i = 0; i < results.length; i++) {
		results[i] = (i >= consecutivnessBegginings[i + k]) ? nums[i + k] : -1;
	}
	return results;
};

var nums, k;
nums = [1, 2, 3, 4, 3, 2, 5], k = 3;
console.log(resultsArray(nums, k));

nums = [2, 2, 2, 2, 2], k = 4;
console.log(resultsArray(nums, k));

nums = [3, 2, 3, 2, 3, 2], k = 2;
console.log(resultsArray(nums, k));

nums = [5], k = 1;
console.log(resultsArray(nums, k));

