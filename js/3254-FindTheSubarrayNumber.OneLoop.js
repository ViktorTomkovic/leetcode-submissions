/**
* @param {number[]} nums
* @param {number} k
* @return {number[]}
*/
var resultsArray = function(nums, k) {
	k--;
	let lastConsecutivnessBeggining = 0;
	let thisConsecutivnessBeggining = 0;
	let results = new Array(nums.length - k);
	for (let i = 0; i < nums.length; i++) {
		if (i > 0) {
			lastConsecutivnessBeggining = thisConsecutivnessBeggining;
			if (nums[i] != nums[i - 1] + 1) {
				thisConsecutivnessBeggining = i;
			}
		}
		if (i >= k) {
			results[i - k] = ((i - k) >= thisConsecutivnessBeggining) ? nums[i] : -1;
		}
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

