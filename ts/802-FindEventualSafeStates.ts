import { expect } from "jsr:@std/expect/expect";
function eventualSafeNodes(graph: number[][]): number[] {
	const visited: boolean[] = new Array(graph.length).fill(false);
	const safe: boolean[] = new Array(graph.length).fill(false);
	const dfs = (currentNode: number): boolean => {
		//if (visited[currentNode]) {
		//	return safe[currentNode];
		//}
		//visited[currentNode] = true;
		//for (const neighbor of graph[currentNode]) {
		//	return visited[neighbor] ? safe[neighbor] : dfs(neighbor);
		//}
		//safe[currentNode] = true;
		//return safe[currentNode];
		visited[currentNode] = true;
		let ret = true;
		for (const neighbor of graph[currentNode]) {
			ret = ret && (visited[neighbor] ? safe[neighbor] : dfs(neighbor));
		}
		safe[currentNode] = ret;
		return safe[currentNode];
	};

	for (let i = 0; i < graph.length; i++) {
		if (!visited[i]) dfs(i);
	}
	//console.log(safe);
	return safe.map((value, index) => value ? index : undefined).filter((x) =>
		x != undefined
	);
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
