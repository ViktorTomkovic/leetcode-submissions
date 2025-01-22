import { MaxPriorityQueue } from "npm:@datastructures-js/priority-queue@5.4.0";
function repeatLimitedString(s: string, repeatLimit: number): string {
	let result = "";
	const frequency = new Array(128).fill(0);
	for (let i = 0; i < s.length; i++) {
		frequency[s.charCodeAt(i)]++;
	}
	const pq = new MaxPriorityQueue<number>();
	for (let i = frequency.length; i > 20; i--) {
		if (frequency[i] > 0) {
			pq.enqueue(frequency[i], i);
		}
	}
	while (!pq.isEmpty()) {
		let { element: countBig, priority: charCodeBig } = pq.dequeue();
		while (countBig > 0) {
			const addedCount = Math.min(countBig, repeatLimit);
			for (let i = 0; i < addedCount; i++) {
				result += String.fromCharCode(charCodeBig);
			}
			countBig -= addedCount;
			if (countBig == 0) continue;
			// interlace with smaller letter
			if (!pq.isEmpty()) {
				const { element: countSecond, priority: charCodeSecond } = pq.dequeue();
				result += String.fromCharCode(charCodeSecond);
				if (countSecond > 1) {
					pq.enqueue(countSecond - 1, charCodeSecond);
				}
			} else {
				break;
			}
		}
	}
	return result;
}

let s, repeatLimit;
//s = "cczazcc", repeatLimit = 3;
//console.log(repeatLimitedString(s, repeatLimit)); // "zzcccac"
//
//s = "aababab", repeatLimit = 2;
//console.log(repeatLimitedString(s, repeatLimit)); // "bbabaa";
//
//s = "cczccccccczzzzzzcccazcc", repeatLimit = 3;
//console.log(repeatLimitedString(s, repeatLimit)); // "zzcccac"

s = "robnsdvpuxbapuqgopqvxdrchivlifeepy", repeatLimit = 2;
console.log(repeatLimitedString(s, repeatLimit)); // "yxxvvuvusrrqqppopponliihgfeeddcbba"
