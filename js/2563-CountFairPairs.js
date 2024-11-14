/**
* @param {number[]} nums
* @param {number} lower
* @param {number} upper
* @return {number}
*/
var countFairPairs = function(nums, lower, upper) {
	nums.sort((a, b) => a - b);
	const getLowestIndexGreaterOrEqualThan = (left, right, target, leftBound) => {
		//console.log("lo", left, right, target, leftBound);
		const mid = Math.ceil((left + right) / 2);
		if (((mid == leftBound) || (nums[mid - 1] < target)) && (target <= nums[mid])) return mid;
		else if (left >= right) return undefined;
		else if (nums[mid] < target) return getLowestIndexGreaterOrEqualThan(mid, right, target, leftBound);
		else return getLowestIndexGreaterOrEqualThan(left, mid - 1, target, leftBound);
	};
	const getGreatestIndexLessOrEqualThan = (left, right, target) => {
		//console.log("hi", left, right, target);
		const mid = Math.ceil((left + right) / 2);
		if ((nums[mid] <= target) && ((target < nums[mid + 1]) || (mid == nums.length - 1))) return mid;
		else if (left >= right) return undefined;
		else if (target < nums[mid]) return getGreatestIndexLessOrEqualThan(left, mid - 1, target);
		else return getGreatestIndexLessOrEqualThan(mid, right, target);
	};
	const boundaries = Array.from({ length: nums.length }, () => Array(2).fill(undefined));
	for (let i = 0; i < nums.length - 1; i++) {
		const lowerIndex = getLowestIndexGreaterOrEqualThan(i + 1, nums.length - 1, lower - nums[i], i + 1);
		boundaries[i][0] = lowerIndex;
		const upperIndex = getGreatestIndexLessOrEqualThan(i + 1, nums.length - 1, upper - nums[i]);
		boundaries[i][1] = upperIndex;
	}
	//console.log(boundaries);
	const result = boundaries.map(b => 1 + b[1] - b[0]).reduce((a, v) => { return a + (Number.isNaN(v) ? 0 : v) }, 0);
	return result;
};

var nums, lower, upper;

nums = [0, 1, 7, 4, 4, 5], lower = 3, upper = 6; // 6
console.log(countFairPairs(nums, lower, upper));

nums = [1, 7, 9, 2, 5], lower = 11, upper = 11; // 1
console.log(countFairPairs(nums, lower, upper));

nums = [0,0,0,0,0,0], lower = 0, upper = 0;
console.log(countFairPairs(nums, lower, upper));

