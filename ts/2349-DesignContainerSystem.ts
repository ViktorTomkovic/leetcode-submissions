import { expect } from "jsr:@std/expect";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";
class NumberContainers {
	numberToIndex: Map<number, MinPriorityQueue<number>>;
	indexToNumber: Map<number, number>;
	constructor() {
		this.numberToIndex = new Map<number, MinPriorityQueue<number>>();
		this.indexToNumber = new Map<number, number>();
	}

	change(index: number, number: number): void {
		if (!this.numberToIndex.has(number)) {
			this.numberToIndex.set(number, new MinPriorityQueue());
		}
		const pq = this.numberToIndex.get(number)!;
		pq.enqueue(index);
		this.indexToNumber.set(index, number);
	}

	find(number: number): number {
		if (!this.numberToIndex.has(number)) {
			return -1;
		}
		const pq = this.numberToIndex.get(number)!;
		let index = -1;
		while (!pq.isEmpty()) {
			index = pq.front().element;
			if (this.indexToNumber.get(index) == number) {
				return index;
			}
			pq.dequeue();
		}
		return -1;
	}
}

/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */

Deno.test("Example 1", () => {
	const result: Array<number | null> = [null];
	const nc = new NumberContainers();
	result.push(nc.find(10) ?? null); // There is no index that is filled with number 10. Therefore, we return -1.
	result.push(nc.change(2, 10) ?? null); // Your container at index 2 will be filled with number 10.
	result.push(nc.change(1, 10) ?? null); // Your container at index 1 will be filled with number 10.
	result.push(nc.change(3, 10) ?? null); // Your container at index 3 will be filled with number 10.
	result.push(nc.change(5, 10) ?? null); // Your container at index 5 will be filled with number 10.
	result.push(nc.find(10) ?? null); // Number 10 is at the indices 1, 2, 3, and 5. Since the smallest index that is filled with 10 is 1, we return 1.
	result.push(nc.change(1, 20) ?? null); // Your container at index 1 will be filled with number 20. Note that index 1 was filled with 10 and then replaced with 20.
	result.push(nc.find(10) ?? null); // Number 10 is at the indices 2, 3, and 5. The smallest index that is filled with 10 is 2. Therefore, we return 2.
	const output = [null, -1, null, null, null, null, 1, null, 2];
	expect(result).toEqual(output);
});

Deno.test("Fail 1", () => {
	const result: Array<number | null> = [null];
	const nc = new NumberContainers();
	result.push(nc.find(10) ?? null);
	result.push(nc.change(1, 10) ?? null);
	result.push(nc.change(2, 20) ?? null);
	result.push(nc.change(3, 30) ?? null);
	result.push(nc.find(10) ?? null);
	result.push(nc.find(20) ?? null);
	result.push(nc.find(30) ?? null);
	const output = [null, -1, null, null, null, 1, 2, 3];
	expect(result).toEqual(output);
});

Deno.test("Fail 2", () => {
	const result: Array<number | null> = [null];
	const nc = new NumberContainers();
	result.push(nc.change(1, 10) ?? null);
	result.push(nc.find(10) ?? null);
	result.push(nc.change(1, 20) ?? null);
	result.push(nc.find(10) ?? null);
	result.push(nc.find(20) ?? null);
	result.push(nc.find(30) ?? null);
	const output = [null, null, 1, null, -1, 1, -1];
	expect(result).toEqual(output);
});

Deno.test("Fail 3", () => {
	const result: Array<number | null> = [null];
	const nc = new NumberContainers();
	result.push(nc.change(25, 50) ?? null);
	result.push(nc.change(56, 31) ?? null);
	result.push(nc.find(50) ?? null);
	result.push(nc.find(50) ?? null);
	result.push(nc.find(43) ?? null);
	result.push(nc.change(30, 50) ?? null);
	result.push(nc.find(31) ?? null);
	result.push(nc.find(43) ?? null);
	result.push(nc.change(25, 20) ?? null);
	result.push(nc.find(50) ?? null);
	result.push(nc.change(56, 43) ?? null);
	result.push(nc.change(68, 31) ?? null);
	result.push(nc.change(56, 31) ?? null);
	result.push(nc.find(20) ?? null);
	result.push(nc.find(43) ?? null);
	result.push(nc.change(25, 43) ?? null);
	result.push(nc.find(43) ?? null);
	result.push(nc.change(56, 31) ?? null);
	result.push(nc.change(54, 43) ?? null);
	result.push(nc.change(63, 43) ?? null);
	const output = [
		null,
		null,
		null,
		25,
		25,
		-1,
		null,
		56,
		-1,
		null,
		30,
		null,
		null,
		null,
		25,
		-1,
		null,
		25,
		null,
		null,
		null,
	];
	expect(result).toEqual(output);
});
