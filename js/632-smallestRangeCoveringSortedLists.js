import { MinPriorityQueue } from "@datastructures-js/priority-queue";
/**
* @param {number[][]} nums
* @return {number[]}
*/
var smallestRange = function(nums) {
	if (nums.length == 1) { return [nums[0][0], nums[0][0]]; }
	const smallerRange = (first, second0, second1) => {
		return (((first[1] - first[0]) < (second1 - second0)) || (((first[1] - first[0]) == (second1 - second0)) && (first[0] < second0))) ?
			first :
			[second0, second1];
	};
	let big = Number.MIN_SAFE_INTEGER;
	/** @type {MinPriorityQueue<number[]>} */
	let pointers = new MinPriorityQueue();
	for (let k = 0; k < nums.length; k++) {
		pointers.enqueue([k, 0], nums[k][0]);
		big = Math.max(big, nums[k][0]);
	}
	let result = [pointers.front().priority, big];
	while (true) {
		let small = pointers.dequeue().element;
		let k = small[0];
		let i = small[1] + 1;
		if (i >= nums[k].length) {
			return result;
		}
		pointers.enqueue([k, i], nums[k][i]);
		big = Math.max(big, nums[k][i]);
		result = smallerRange(result, pointers.front().priority, big);
	}
};

var nums = [[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]];
console.log(smallestRange(nums));

var nums = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
console.log(smallestRange(nums));

var nums = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
console.log(smallestRange(nums));

