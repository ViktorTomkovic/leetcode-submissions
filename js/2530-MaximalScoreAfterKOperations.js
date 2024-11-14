import { PriorityQueue } from "@datastructures-js/priority-queue"
/**
* @param {number[]} nums
* @param {number} k
* @return {number}
*/
var maxKelements = function(nums, k) {
	/** @type {PriorityQueue<number>} */
	const q = new PriorityQueue({ compare: (a, b) => { console.log(a, b); return b - a; } });
	for (let i = 0; i < nums.length; i++) q.enqueue(nums[i]);
	let s = 0;
	while (k--) {
		const e = q.dequeue().element;
		s += e;
		q.enqueue(Math.ceil(e / 3));
	}
	return s;
};

var nums = [10, 10, 10, 10, 10], k = 5;
console.log(maxKelements(nums, k));

var nums = [1, 10, 3, 3, 3], k = 3;
console.log(maxKelements(nums, k));

