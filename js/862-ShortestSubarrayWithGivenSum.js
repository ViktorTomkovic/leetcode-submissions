import { Deque } from "@datastructures-js/deque";
/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
var shortestSubarray = function(nums, k) {
	class PrefixInfo {
		/** @type {number} */
		sum = 0;
		/** @type {number} */
		index;
		/** @param {number} prefixSum @param {number} prefixIndex */
		constructor(prefixSum, prefixIndex) {
			this.sum = prefixSum;
			this.index = prefixIndex;
		}
	}
	/** @type Deque<PrefixInfo> */
	let deque = new Deque();
	let shortest = Number.MAX_SAFE_INTEGER;
	let currentPrefixSum = 0;
	for (let right = 0; right < nums.length; right++) {
		currentPrefixSum += nums[right];
		// nums[right] is not positive
		while (!deque.isEmpty() && (deque.back().sum >= currentPrefixSum)) {
			deque.popBack();
		}
		deque.pushBack(new PrefixInfo(currentPrefixSum, right));
		// nums[right] is positive
		let left = undefined;
		if (currentPrefixSum >= k) {
			left = -1;
		}
		// move left pointer if possible
		while (!deque.isEmpty() && ((currentPrefixSum - deque.front().sum) >= k)) {
			const { index: prefixIndex } = deque.popFront();
			left = prefixIndex;
		}
		if (left != undefined) {
			shortest = Math.min(shortest, right - left);
		}
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
nums = [17,85,93,-45,-21], k = 150;
console.log(shortestSubarray(nums, k));
nums = [75,-32,50,32,97], k = 129;
console.log(shortestSubarray(nums, k));
nums = [-28, 81, -20, 28, -29], k = 89;
console.log(shortestSubarray(nums, k));

