/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
	function swap(i, j) {
		const temp = nums[i];
		nums[i] = nums[j];
		nums[j] = temp;
	}

	const n = nums.length;
	k = k % n;
	const barrier = n - k;
	if (k == 0) {
		return;
	}
	if (k == 1) {
		for (let i = n - 1; i > 0; i--) {
			swap(i, i - 1);
		}
		return;
	}
	let left = 0;
	let right = n;
	while (barrier - left > 0) {
		// console.log(left, barrier, right, ':', ...nums);
		if ((barrier - left) >= (right - barrier)) {
			// positioning numbers from right side to left side
			for (let i = 0; i < right - barrier; i++) {
				swap(barrier + i, left + i);
			}
			left += right - barrier;
		} else {
			for (let i = 0; i < barrier - left; i++) {
				swap(left + i, right - (barrier -left) + i);
			}
			right -= barrier - left;
		}
	}
};

var nn = [];
var k = 0;

nn = [1, 2, 3, 4, 5, 6, 7];
k = 0;
rotate(nn, k);
console.log(nn);

nn = [1, 2, 3, 4, 5, 6, 7];
k = 1;
rotate(nn, k);
console.log(nn);

nn = [1, 2, 3, 4, 5, 6, 7];
k = 2;
rotate(nn, k);
console.log(nn);

nn = [1, 2, 3, 4, 5, 6, 7];
k = 5;
rotate(nn, k);
console.log(nn);

[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
[2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
[2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 7, 6, 5];
[2, 3, 4, 5, 6, 7, 1, 2, 3, 6, 7, 4, 5];
[2, 3, 4, 5, 6, 7, 1, 2, 7, 6, 3, 4, 5];
[2, 3, 4, 5, 6, 7, 1, 6, 7, 2, 3, 4, 5];
[2, 3, 4, 5, 6, 7, 7, 6, 1, 2, 3, 4, 5];
i = 1
k = 2
j = i - k // -1
if (j < 0) {
	j = k - j - 1 // 2 - 1 - 1
}



