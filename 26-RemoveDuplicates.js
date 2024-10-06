/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
	var i = 0;
	var k = 0;
	while (i < nums.length) {
		nums[k] = nums[i];
		if (i< nums.length && nums[i+1] == nums[k]) {
			nums[++k] = nums[i++];
		}
		for (; i < nums.length && nums[i] == nums[k]; i++);
		k++;
	}

	return k;
};

