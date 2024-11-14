/**
* @param {number[]} nums
* @return {number}
*/
var countMaxOrSubsets = function(nums) {
	const orred = nums.reduce((b, v) => b | v, 0);
	const count = (index, currentOrred) => {
		if (index == nums.length) {
			return currentOrred == orred;
		}
		return count(index + 1, currentOrred) + count(index + 1, currentOrred | nums[index]);
	}
	return count(0, 0);
};

var nums = [3, 1];
console.log(countMaxOrSubsets(nums));

var nums = [2, 2, 2];
console.log(countMaxOrSubsets(nums));

var nums = [3, 1, 5];
console.log(countMaxOrSubsets(nums));

var nums = [3, 2, 1, 5];
console.log(countMaxOrSubsets(nums));

var nums = [3, 2, 2, 1, 5];
console.log(countMaxOrSubsets(nums));

var nums = [3, 2, 2, 2, 1, 5];
console.log(countMaxOrSubsets(nums));

var nums = [ 2, 2, 2, 1, 5];
console.log(countMaxOrSubsets(nums));

var nums = [ 2,  1];
console.log(countMaxOrSubsets(nums));

var nums = [ 2, 2, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 2, 2, 2, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 2,2, 2, 2, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 2,2,2, 2, 2, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 2,2,2,2, 2, 2, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 2, 2, 2,2,2,2,2,1,1, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 3, 3, 3,3,3,3,3,1,1, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,4,3,3,3,1,1, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,4,3,3,3];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3,3];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3,3,3];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3,3,3, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3,3,3,1, 1];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3,3,3, 1,1,1];
console.log(countMaxOrSubsets(nums));

var nums = [ 4, 4, 4,3,3,3,3,1,1,1, 1];
console.log(countMaxOrSubsets(nums));

