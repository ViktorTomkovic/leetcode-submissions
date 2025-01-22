import {
	large1edges,
	large1k,
	large1n,
	large1values,
} from "./2872-LargeInput.in.ts";
function maxKDivisibleComponents(
	n: number,
	edges: number[][],
	values: number[],
	k: number,
): number {
	const valuesMap = new Map<number, number>();
	for (const [index, value] of values.entries()) {
		valuesMap.set(index, value);
	}
	const edgesMap = new Map<number, Array<number>>();
	for (let i = 0; i < n; i++) edgesMap.set(i, new Array(0));
	for (let i = 0; i < edges.length; i++) {
		const [from, to] = edges[i];
		edgesMap.get(from)!.push(to);
		edgesMap.get(to)!.push(from);
	}

	function solveForSubtree(
		nodeIndex: number,
		comingFrom: number,
		edgesMap: Map<number, number[]>,
		valuesMap: Map<number, number>,
		k: number,
	): { sum: number; marked: number } {
		const children = edgesMap.get(nodeIndex)!.filter((node) =>
			node != comingFrom
		);
		let solvedChildren = { sum: 0, marked: 0 };
		for (const child of children) {
			const solvedChild = solveForSubtree(
				child,
				nodeIndex,
				edgesMap,
				valuesMap,
				k,
			);
			solvedChildren = {
				sum: solvedChildren.sum + solvedChild.sum,
				marked: solvedChild.marked + solvedChildren.marked,
			};
		}
		const componentSum = solvedChildren.sum + valuesMap.get(nodeIndex)!;
		const remainder = componentSum % k;
		//console.log(nodeIndex, solvedChildren, componentSum);

		if (remainder == 0) {
			return { sum: 0, marked: solvedChildren.marked + 1 };
		} else {
			return { sum: componentSum, marked: solvedChildren.marked };
		}
	}

	const markedNodes: { sum: number; marked: number } = solveForSubtree(
		0,
		0,
		edgesMap,
		valuesMap,
		k,
	);
	return markedNodes.marked;
}

let n, edges, values, k;
n = 5;
edges = [[0, 2], [1, 2], [1, 3], [2, 4]];
values = [1, 8, 1, 4, 4];
k = 6;
console.log(maxKDivisibleComponents(n, edges, values, k));

n = 7;
edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
values = [3, 0, 6, 1, 5, 2, 1];
k = 3;
console.log(maxKDivisibleComponents(n, edges, values, k));

const start = Date.now();
n = large1n;
edges = large1edges;
values = large1values;
k = large1k;

console.log(maxKDivisibleComponents(n,edges,values,k))
console.log(Date.now() - start)
