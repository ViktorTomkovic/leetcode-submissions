/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
var shortestSubarray = function(nums, k) {
	let deque = new Array(nums.length + 1);
	// Enough because we never insert at front
	let dLeft = 0;
	let dRight = 0;
	let shortest = Number.MAX_SAFE_INTEGER;
	for (let nRight = 0; nRight < nums.length; nRight++) {
		if (nRight > 0) nums[nRight] += nums[nRight - 1];
		// original nums[right] was positive
		let nLeft = undefined;
		if (nums[nRight] >= k) nLeft = -1;
		while ((dLeft < dRight) && ((nums[nRight] - nums[deque[dLeft + 1]]) >= k)) nLeft = deque[++dLeft];
		if (nLeft != undefined) shortest = Math.min(shortest, nRight - nLeft);
		// original nums[right] was not positive
		while ((dLeft < dRight) && (nums[deque[dRight]] >= nums[nRight])) dRight--;
		deque[++dRight] = nRight;
	}
	return (shortest == Number.MAX_SAFE_INTEGER) ? -1 : shortest;
};

var nums, k;
nums = [1], k = 1;
console.log(shortestSubarray(nums, k));
nums = [1, 2], k = 4;
console.log(shortestSubarray(nums, k));
nums = [2, -1, 2], k = 3;
console.log(shortestSubarray(nums, k));
nums = [17, 85, 93, -45, -21], k = 150;
console.log(shortestSubarray(nums, k));
nums = [75, -32, 50, 32, 97], k = 129;
console.log(shortestSubarray(nums, k));
nums = [-28, 81, -20, 28, -29], k = 89;
console.log(shortestSubarray(nums, k));
nums = [84, -37, 32, 40, 95], k = 167;
console.log(shortestSubarray(nums, k));

