import { MaxPriorityQueue } from "npm:@datastructures-js/priority-queue@5.4.0";
function maxAverageRatio(classes: number[][], extraStudents: number): number {
	let avgRatio = 0;
	const q = new MaxPriorityQueue<number[]>();
	for (const c of classes) {
		q.enqueue(c, ((c[0] + 1) / (c[1] + 1)) - (c[0] / c[1]));
	}
	for (let i = 0; i < extraStudents; i++) {
		const c = q.dequeue().element;
		c[0] = c[0] + 1;
		c[1] = c[1] + 1;
		q.enqueue(c, ((c[0] + 1) / (c[1] + 1)) - (c[0] / c[1]));
	}
	while (!q.isEmpty()) {
		const c = q.dequeue().element;
		//console.log(c);
		avgRatio += c[0] / c[1];
	}
	return avgRatio / classes.length;
}

let classes, extraStudents;
classes = [[1, 2], [3, 5], [2, 2]], extraStudents = 2;
console.log(maxAverageRatio(classes, extraStudents)); // 0.78333

classes = [[2, 4], [3, 9], [4, 5], [2, 10]], extraStudents = 4;
console.log(maxAverageRatio(classes, extraStudents)); // 0.53485
