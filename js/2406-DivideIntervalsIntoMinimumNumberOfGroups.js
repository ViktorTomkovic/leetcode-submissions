import { Queue } from '@datastructures-js/queue';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
/**
* @param {number[][]} intervals
* @return {number}
*/
var minGroups = function(intervals) {
	let ordering = Array.from(intervals.keys());
	ordering.sort((a, b) => intervals[a][0] - intervals[b][0]);
	let numberOfGroups = 0;
	/** @type {Queue<number>} */
	let freeGroups = new Queue();
	/** @type {MinPriorityQueue<number>} */
	let scheduledGroups = new MinPriorityQueue();
	for (let i = 0; i < ordering.length; i++) {
		let currentInterval = intervals[ordering[i]];
		while (!scheduledGroups.isEmpty() && scheduledGroups.front().priority < currentInterval[0]) {
			freeGroups.push(scheduledGroups.dequeue().element);
		}
		let nextGroup = freeGroups.isEmpty() ? ++numberOfGroups : freeGroups.pop();
		scheduledGroups.enqueue(nextGroup, currentInterval[1]);
	}
	return numberOfGroups;
};

var intervals = [[5, 10], [6, 8], [1, 5], [2, 3], [1, 10]]
console.log(minGroups(intervals));

var intervals = [[1, 3], [5, 6], [8, 10], [11, 13]]
console.log(minGroups(intervals));

