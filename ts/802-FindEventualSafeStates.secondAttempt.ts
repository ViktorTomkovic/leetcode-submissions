import { expect } from "jsr:@std/expect/expect";
function eventualSafeNodes(graph: number[][]): number[] {
	const n = graph.length;
	const enum Status {
		unprocessed,
		unvisited,
		visited,
	}
	const status: Status[] = new Array(n).fill(Status.unprocessed);
	const dfs = (currentNode: number): Status => {
		switch (status[currentNode]) {
			case Status.visited:
				return Status.visited;
			case Status.unvisited:
				return Status.unvisited;
			case Status.unprocessed:
				status[currentNode] = Status.unvisited;
				for (const neighbor of graph[currentNode]) {
					if (dfs(neighbor) == Status.unvisited) return Status.unvisited;
				}
				status[currentNode] = Status.visited;
				return Status.visited;
		}
	};
	for (let i = 0; i < n; i++) dfs(i);
	const result: number[] = [];
	for (let i = 0; i < n; i++) {
		if (status[i] == Status.visited) {
			result.push(i);
		}
	}
	return result;
}

Deno.test("leet1", () => {
	const graph = [[1, 2], [2, 3], [5], [0], [5], [], []];
	const output = [2, 4, 5, 6];
	const result = eventualSafeNodes(graph);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []];
	const output = [4];
	const result = eventualSafeNodes(graph);
	expect(result).toEqual(output);
});
