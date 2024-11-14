/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
var minimumSubarrayLength = function(nums, k) {
	const MAX_BITS = 31;
	/**
	 * @param {Array<number>} map (bit -> count)
	 * @returns number
	 */
	const mapToOr = (map) => {
		let exponent = 1;
		let result = 0;
		for (let i = 0; i < MAX_BITS; i++) {
			result += ((map[i] > 0) ? 1 : 0) * exponent;
			exponent = exponent << 1;
		}
		return result;
	}
	/**
	 * @param {Array<number>} map (bit -> count)
	 * @param {number} num
	 * @returns {Array<number>}
	 */
	const addToMap = (map, num) => {
		let i = 0;
		while (num > 0) {
			map[i] += num & 1;
			num = num >> 1;
			i++;
		}
		return map;
	}

	/**
	 * @param {Array<number>} map (bit -> count)
	 * @param {number} num
	 * @returns {Array<number>}
	 */
	const subFromMap = (map, num) => {
		let i = 0;
		while (num > 0) {
			map[i] -= num & 1;
			num = num >> 1;
			i++;
		}
		return map;
	}

	let left = 0;
	let right = 0;
	let minSubarray = Number.MAX_SAFE_INTEGER;
	/** @type {Array<number>} */
	let bitCount = new Array(MAX_BITS).fill(0);
	if (nums[0] >= k) return 1;
	bitCount = addToMap(bitCount, nums[0]);
	while (left < nums.length || right < nums.length) {
		// console.log(left, right, mapToOr(bitCount));
		if (mapToOr(bitCount) < k) {
			right++;
			if (right == nums.length) break;
			bitCount = addToMap(bitCount, nums[right]);
			if (mapToOr(bitCount) >= k) minSubarray = Math.min(minSubarray, right - left + 1);
		} else {
			bitCount = subFromMap(bitCount, nums[left]);
			left++;
			if (mapToOr(bitCount) >= k) minSubarray = Math.min(minSubarray, right - left + 1);
		}
	}
	if (minSubarray == Number.MAX_SAFE_INTEGER) return -1;
	return minSubarray;
};

var nums, k;
nums = [1, 2, 3], k = 2;
console.log(minimumSubarrayLength(nums, k));

nums = [2, 1, 8], k = 10;
console.log(minimumSubarrayLength(nums, k));

nums = [1, 2], k = 0;
console.log(minimumSubarrayLength(nums, k));

nums = [1, 2], k = 5;
console.log(minimumSubarrayLength(nums, k));

nums = [2, 1, 9, 12]; k = 21;
console.log(minimumSubarrayLength(nums, k));

