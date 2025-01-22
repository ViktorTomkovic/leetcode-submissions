import { MaxPriorityQueue } from "npm:@datastructures-js/priority-queue";

function pickGifts(gifts: number[], k: number): number {
	const maxQueue = MaxPriorityQueue.from(gifts.map((v) => [v, v]));
	for (let i = 0; i < k; i++) {
		const max = maxQueue.dequeue().element;
		const leftover = Math.floor(Math.sqrt(max));
		maxQueue.enqueue(leftover);
	}
	return maxQueue.toArray().map((v) => v.element).reduce((a, c) => a + c, 0);
}

let gifts, k;
gifts = [25, 64, 9, 4, 100], k = 4;
console.log(pickGifts(gifts, k));
