import { MinPriorityQueue } from "npm:@datastructures-js/priority-queue";
function getFinalState(
	nums: number[],
	k: number,
	multiplier: number,
): number[] {
	const ccc = 10**9 + 7;
	const q = new MinPriorityQueue<[number, number]>();
	const result = new Array(nums.length);
	for (const [index, num] of nums.entries()) {
		q.enqueue([index, num], num * 1000 + index);
	}
	for (let i = 0; i < k; i++) {
		const e = q.dequeue().element;
		const n: [number, number] = [e[0], e[1] * multiplier % ccc];
		q.enqueue(n, n[1] * 1000 + n[0]);
	}
	while (!q.isEmpty()) {
		const e = q.dequeue().element;
		result[e[0]] = e[1] % ccc;
	}
	return result;
}

let nums = [2,1,3,5,6], k = 5, multiplier = 2;
console.log(getFinalState(nums,k,multiplier));

nums = [100000,2000], k = 2, multiplier = 1000000;
console.log(getFinalState(nums,k,multiplier)); //[999999307,999999993]

nums = [161209470], k = 56851412, multiplier = 39846;
console.log(getFinalState(nums,k,multiplier)); //[198168519]
