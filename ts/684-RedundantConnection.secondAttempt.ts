import { expect } from "jsr:@std/expect";
function findRedundantConnection(edges: number[][]): number[] {
	const sets = new Array<Set<number>>(edges.length + 1);
	for (let i = 0; i < sets.length; i++) {
		const set = new Set<number>();
		set.add(i);
		sets[i] = set;
	}

	const findSet = (index: number): [number, Set<number>] => {
		for (let i = 0; i < sets.length; i++) {
			if (sets[i].has(index)) {
				return [i, sets[i]];
			}
		}
		return [-1, new Set()];
	};
	for (const [from, to] of edges) {
		const [fromIndex, fromSet] = findSet(from);
		const [toIndex, toSet] = findSet(to);
		//console.log(fromIndex, toIndex);
		if (fromIndex == toIndex) {
			return [from, to];
		}
		sets[toIndex] = new Set();
		const unionSet = fromSet;
		for (const element of toSet) unionSet.add(element);
		sets[fromIndex] = unionSet;
	}

	return [-1, -1];
}

Deno.test("leet1", () => {
	const edges = [[1, 2], [1, 3], [2, 3]];
	const output = [2, 3];
	const result = findRedundantConnection(edges);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const edges = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]];
	const output = [1, 4];
	const result = findRedundantConnection(edges);
	expect(result).toEqual(output);
});
