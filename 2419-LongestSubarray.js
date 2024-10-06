/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
	const maxNum = Math.max(...nums);
	let curSub = 0;
	let maxSub = 0;
	for (let i = 0; i < nums.length; i++) {
		// console.log(nums[i], maxNum, curSub, maxSub);
		if (nums[i] == maxNum) {
			curSub++;
		} else {
			if (curSub > maxSub) {
				maxSub = curSub;
			}
			curSub = 0;
		}
	}
	return (curSub > maxSub) ? curSub : maxSub;
};

var nums = [1, 2, 3, 3, 2, 2];
console.log(longestSubarray(nums));

var nums = [1, 2, 3, 4];
console.log(longestSubarray(nums));

