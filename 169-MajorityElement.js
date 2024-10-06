/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
	const n = nums.length;
	const majority = Math.floor(n / 2);
	while (true) {
		let a = Math.floor(Math.random() * n);
		let numberA = nums[a];
		let count = 0;
		for (let i = 0; i < n; i++) {
			if (numberA == nums[i]) {
				count++;
			}
		}
		if (count > majority) {
			return numberA;
		}
	};
};
