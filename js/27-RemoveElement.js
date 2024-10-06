/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
	var k = nums.length - 1;
	while (nums[k] == val) k--;
	for (var i = 0; i < k; i++) {
		if (nums[i] == val) {
			while (nums[k] == val) k--;
			// left here just to remember that splice exists
			nums[k] = nums.splice(i, 1, nums[k])[0];
			k--;
			while (nums[k] == val) k--;
		}
	}
	return k + 1;
};

//var nums = [3,2,2,3,3,3,3,3,3]
//var val = 3
//removeElement(nums, val)
//console.log(nums)

nums = [0, 1, 2, 2, 3, 0, 4, 2]
val = 2
console.log(removeElement(nums, val))
console.log(nums)

