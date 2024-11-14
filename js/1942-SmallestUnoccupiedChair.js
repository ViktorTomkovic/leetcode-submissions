import { MinPriorityQueue } from '@datastructures-js/priority-queue';
/**
* @param {number[][]} times
* @param {number} targetFriend
* @return {number}
*/
var smallestChair = function(times, targetFriend) {
	let ordering = Array.from(times.keys());
	ordering.sort((a, b) => times[a][0] - times[b][0]);
	let nextFreeChair = 0;
	/** @type {MinPriorityQueue<number>} */
	let freeChairs = new MinPriorityQueue();
	/** @type {MinPriorityQueue<number>} */
	let takenChairs = new MinPriorityQueue();

	for (let i = 0; i < ordering.length; i++) {
		let friendNo = ordering[i];
		while (!takenChairs.isEmpty() && takenChairs.front().priority <= times[friendNo][0]) {
			freeChairs.enqueue(takenChairs.dequeue().element);
		}
		let nextChair;
		if (freeChairs.isEmpty()) {
			nextChair = nextFreeChair;
			nextFreeChair++;
		} else {
			nextChair = freeChairs.dequeue().element;
		}
		if (friendNo === targetFriend) {
			return nextChair;
		}
		takenChairs.enqueue(nextChair, times[friendNo][1]);
	}
};

var times = [[1, 4], [2, 3], [4, 6]], targetFriend = 1;
console.log(smallestChair(times, targetFriend));

var times = [[3, 10], [1, 5], [2, 6]], targetFriend = 0;
console.log(smallestChair(times, targetFriend));

var times = [[1, 3], [2, 5], [3, 6]], targetFriend = 2;
console.log(smallestChair(times, targetFriend));

