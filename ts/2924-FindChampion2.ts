function findChampion(n: number, edges: number[][]): number {
	const indegree = new Array<boolean>(n).fill(false);
	edges.forEach((edge) => indegree[edge[1]] = true);
	let result = -1;
	for (let i = 0; i < indegree.length; i++) {
		if (!indegree[i]) {
			if (result == -1) {
				result = i;
			} else {
				return -1;
			}
		}
	}
	return result;
}

let n, edges;
n = 3, edges = [[0, 1], [1, 2]]; // 0
console.log(findChampion(n, edges));

n = 4, edges = [[0, 2], [1, 3], [1, 2]]; // -1
console.log(findChampion(n, edges));
