/**
* @param {number[]} arr
* @return {number}
*/
var findLengthOfShortestSubarray = function(arr) {
	const N = arr.length;
	let right = N - 1;
	let length = N - 1;
	while ((right > 0) && (arr[right - 1] <= arr[right])) {
		right--;
		length--;
	}
	if (right == 0) {
		return 0;
	}
	let left = -1;
	do {
		left++;
		while ((arr[left] > arr[right]) && (right < N)) {
			right++;
		}
		length = Math.min(right - left - 1, length);
	} while ((left < right) && (left < N - 1) && (arr[left] <= arr[left + 1]));
	return length;
};

var arr;
arr = [1, 2, 3, 10, 4, 2, 3, 5];
console.log(findLengthOfShortestSubarray(arr));
arr = [5, 4, 3, 2, 1];
console.log(findLengthOfShortestSubarray(arr));
arr = [1, 2, 3];
console.log(findLengthOfShortestSubarray(arr));
arr = [6, 3, 10, 11, 15, 20, 13, 3, 18, 12];
console.log(findLengthOfShortestSubarray(arr));

