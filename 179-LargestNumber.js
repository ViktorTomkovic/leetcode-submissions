/**
* @param {number[]} nums
* @return {string}
*/
var largestNumber = function(nums) {
	/**
	* @param {string} a first number
	* @param {string} b second number
	*/
	const compareFn = (a, b) => {
		if (a.length != b.length) {
			return compareFn(a + b, b + a);
		}
		for (let i = 0; i < a.length; i++) {
			let left = a[i];
			let right = b[i];
			if (left < right) {
				return 1;
			} else if (right < left) {
				return -1;
			}
		}
		return -1;
	};

	let strs = new Array();
	nums.forEach(num => strs.push(num.toString()));
	strs.sort(compareFn);
	if (strs[0] == "0") {
		return "0";
	}
	return strs.reduce((result, cur) => result + cur, "");
};

//var nums = [10, 2];
//console.log(largestNumber(nums));

var nums = [3, 30, 34, 5, 9];
console.log(largestNumber(nums));

var nums = [34323, 3432];
console.log(largestNumber(nums));
var nums = [3432, 34323];
console.log(largestNumber(nums));

// Very nice!
/**
* @param {number[]} nums
* @return {string}
*/
/*
var largestNumber = function(nums) {
	 nums = nums.map(String);
	 nums.sort((a, b) => (b + a) - (a + b));
	 if (nums[0] === '0') {
			 return '0';
	 }
	 return nums.join('');
};
*/
