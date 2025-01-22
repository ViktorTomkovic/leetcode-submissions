function validArrangement(pairs: number[][]): number[][] {
	console.log("-->", pairs);
	const append = (
		edgeMap: Record<number, number[]>,
		key: number,
		value: number,
	) => {
		if (!edgeMap[key]) {
			edgeMap[key] = new Array<number>(0);
		}
		edgeMap[key].push(value);
	};
	const addDegree = (degreeMap: Record<number, number>, vertex: number) => {
		if (!degreeMap[vertex]) {
			degreeMap[vertex] = 0;
		}
	};
	const increaseDegree = (
		degreeMap: Record<number, number>,
		vertex: number,
	) => {
		degreeMap[vertex]++;
	};
	const inbound: Record<number, number> = {};
	const outbound: Record<number, number> = {};
	const edges: Record<number, Array<number>> = {};
	const vertices = new Set<number>();
	for (const [from, to] of pairs) {
		append(edges, from, to);
		addDegree(inbound, to);
		addDegree(outbound, to);
		increaseDegree(inbound, to);
		addDegree(outbound, from);
		addDegree(inbound, from);
		increaseDegree(outbound, from);
		vertices.add(from);
		vertices.add(to);
	}
	let firstVertex: number = vertices.entries().next().value![0];
	for (const vertex of vertices) {
		if (inbound[vertex] + 1 == outbound[vertex]) {
			firstVertex = vertex;
		}
	}
	console.log(edges);
	console.log(inbound);
	console.log(outbound);
	console.log(firstVertex);
	const loop = new Array<number>();
	const hierholzer = (vertex: number) => {
		console.log('H', vertex);
		while (outbound[vertex] > 0) {
			hierholzer(edges[vertex][--outbound[vertex]]);
		}
		loop.push(vertex);
	};
	hierholzer(firstVertex);
	console.log(outbound);
	console.log(loop);
	const result = new Array<number[]>();
	for (let i = loop.length - 1; i > 0; i--) {
		result.push([loop[i], loop[i-1]]);
	}
	return result;
}

let pairs;
pairs = [[5, 1], [4, 5], [11, 9], [9, 4]];
console.log(validArrangement(pairs)); // [[11,9],[9,4],[4,5],[5,1]]

pairs = [[1, 3], [3, 2], [2, 1]];
console.log(validArrangement(pairs)); // [[1,3],[3,2],[2,1]]

pairs = [[1, 2], [1, 3], [2, 1]];
console.log(validArrangement(pairs)); // [[1,2],[2,1],[1,3]]

pairs = [[3, 2], [2, 1], [1, 2]];
console.log(validArrangement(pairs)); // [[3,2],[2,1],[1,2]]
