/**
* @param {number[]} nums
* @return {number}
*/
var longestSquareStreak = function(nums) {
	nums.sort((a, b) => a - b);
	const binarySearch = (num, left, right) => {
		if (left >= right) {
			return nums[right] == num ? right : -1;
		}
		if (right <= left) {
			return nums[left] == num ? left : -1;
		}
		const middle = Math.floor((left + right) / 2);
		if (nums[middle] == num) {
			return middle;
		} else if (num < nums[middle]) {
			return binarySearch(num, left, middle - 1);
		} else {
			return binarySearch(num, middle + 1, right);
		}
	}
	const marked = Array(nums.length).fill(false);
	const rt = Math.sqrt(nums[nums.length - 1]);
	let result = -1;
	for (let i = 0; i < nums.length; i++) {
		if (marked[i]) {
			continue;
		}
		if (nums[i] > rt) {
			break;
		}
		let sequenceLength = 0;
		let nextIndex = i;
		let nextInSequence = -1;
		let sequenceNumber = nums[i];

		do {
			marked[nextIndex] = true;
			sequenceNumber = nums[nextIndex];
			sequenceLength++;

			nextInSequence = sequenceNumber * sequenceNumber;
			nextIndex = binarySearch(nextInSequence, nextIndex, nums.length - 1);
		} while (nextIndex != -1);

		if (sequenceLength >= 2) {
			result = Math.max(result, sequenceLength);
		}
	}
	return result;
};

var nums;
nums = [4, 3, 6, 16, 8, 2];
console.log(longestSquareStreak(nums));

nums = [2, 3, 5, 6, 7];
console.log(longestSquareStreak(nums));

nums = [3, 3, 5, 2, 5];
console.log(longestSquareStreak(nums));

