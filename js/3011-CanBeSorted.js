/**
* @param {number[]} nums
* @return {boolean}
*/
var canSortArray = function(nums) {
	/**
	 * @param {number} num
	 * @returns {number}
	 */
	const bitCount = (num) => {
		let count = 0;
		let mask = 1;
		while (mask <= num) {
			count += (mask & num) > 0;
			mask = mask << 1;
		}
		return count;
	}

	let prevMax = Number.MIN_SAFE_INTEGER;
	let lastBitCount = bitCount(nums[0]);
	let currentMin = Number.MAX_SAFE_INTEGER;
	let currentMax = Number.MIN_SAFE_INTEGER;
	for (let i = 0; i < nums.length; i++) {
		const currentBitCount = bitCount(nums[i]);
		if (currentBitCount == lastBitCount) {
			currentMin = Math.min(currentMin, nums[i]);
			currentMax = Math.max(currentMax, nums[i]);
		} else {
			if (prevMax > currentMin) {
				return false;
			}
			prevMax = currentMax;
			lastBitCount = currentBitCount;
			currentMin = nums[i];
			currentMax = nums[i];
		}
	}
	if (prevMax > currentMin) {
		return false;
	}
	return true;
};

var nums;
nums = [8, 4, 2, 30, 15];
console.log(canSortArray(nums));

nums = [1, 2, 3, 4, 5];
console.log(canSortArray(nums));

nums = [3, 16, 8, 4, 2];
console.log(canSortArray(nums));

