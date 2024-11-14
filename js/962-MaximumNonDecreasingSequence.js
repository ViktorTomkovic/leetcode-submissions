/**
* @param {number[]} nums
* @return {number}
*/
var maxWidthRamp = function(nums) {
	let postfix = new Array(nums.length);
	postfix[nums.length - 1] = nums[nums.length - 1];
	for (let i = nums.length - 2; i >= 0; i--) {
		postfix[i] = Math.max(nums[i], postfix[i + 1]);
	}
	let max = 0;
	let l = 0;
	let r = 1;
	while ((nums.length - l) > max && r < nums.length) {
		console.log(l, r);
		if (nums[l] <= nums[r]) {
			max = Math.max(max, r - l);
			if (r - l >= max) {
				console.log('newmax', l, r);
			}
		}
		if (nums[l] > postfix[r]) {
			l++;
		} else {
			r++;
		}
	}
	return max;

};

var nums = [600, 800, 200, 100, 5000, 60,50,40,30,20,10];
console.log(maxWidthRamp(nums));

var nums = [6, 0, 8, 2, 1, 5];
console.log(maxWidthRamp(nums));

var nums = [9, 8, 1, 0, 1, 9, 4, 0, 4, 1];
console.log(maxWidthRamp(nums));

