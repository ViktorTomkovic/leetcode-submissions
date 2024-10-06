var majorityElement = function(nums) {
	let candidate = nums[0];
	let count = 1;
	for (let i = 1; i < nums.length; i++) {
		let candidateOld = candidate;
		let countOld = count;
		if (nums[i] == candidate) {
			count++;
		} else if (count == 0) {
			candidate = nums[i];
			count++;
		} else {
			count--;
		}
let countNew = count;
console.log(i, nums[i], candidateOld, countOld, '->', countNew);
	}
	return candidate;
}

var n = [];

n = [1, 3, 1];
console.log(majorityElement(n));

n = [2, 3, 2, 3, 2, 3, 2, 3, 2];
console.log(majorityElement(n));

n = [3];
console.log(majorityElement(n));

n = [3, 4, 4, 4, 4, 4, 3, 3, 3];
console.log(majorityElement(n));

n = [5, 3, 5, 5, 3];
console.log(majorityElement(n));

n = [3, 6, 6, 6, 3];
console.log(majorityElement(n));

n = [7, 3, 7, 7, 4, 7, 7, 5, 7, 7, 6, 2, 2];
console.log(majorityElement(n));

n = [8, 3, 3, 3, 3, 8, 8, 8, 8, 8, 6, 8, 8, 2, 2];
console.log(majorityElement(n));

n = [1, 1, 10, 10, 3, 3, 10, 10, 10];
console.log(majorityElement(n));

