function shortestDistanceAfterQueries(
	n: number,
	queries: number[][],
): number[] {
	const shortestPath = new Array(n);
	for (let i = 0; i < n; i++) {
		shortestPath[i] = n - 1 - i;
	}
	const inedges = Array.from({ length: n }, () => new Array<number>());
	for (let i = 1; i < n; i++) {
		inedges[i].push(i - 1);
	}
	const result = new Array<number>(0);
	for (let i = 0; i < queries.length; i++) {
		const [newSource, newDestination] = queries[i];
		inedges[newDestination].push(newSource);
		let currentPath = shortestPath[newDestination] + 1;
		let parents = Array.from(inedges[newDestination]);
		while (parents.length) {
			const newParents = new Array(0);
			for (let j = 0; j < parents.length; j++) {
				if (currentPath >= shortestPath[parents[j]]) {
					continue;
				}
				shortestPath[parents[j]] = currentPath;
				for (let k = 0; k < inedges[parents[j]].length; k++) {
					newParents.push(inedges[parents[j]][k]);
				}
			}
			parents = newParents;
			currentPath++;
		}
		result.push(shortestPath[0]);
	}
	return result;
}

let n, queries;
n = 5, queries = [[2, 4], [0, 2], [0, 4]]; // [3,2,1]
console.log(shortestDistanceAfterQueries(n, queries));

n = 4, queries = [[0, 3], [0, 2]]; // [1,1]
console.log(shortestDistanceAfterQueries(n, queries));

n = 40,
	queries = [
		[12, 32],
		[12, 33],
		[13, 27],
		[18, 34],
		[23, 31],
		[28, 34],
		[11, 21],
		[2, 10],
		[20, 28],
		[19, 33],
		[1, 39],
		[2, 37],
		[3, 10],
		[1, 23],
		[7, 34],
		[16, 27],
		[22, 39],
		[23, 32],
		[25, 32],
		[31, 34],
		[29, 31],
		[2, 20],
		[15, 26],
		[21, 26],
		[18, 38],
		[9, 36],
		[0, 23],
		[17, 35],
		[17, 33],
		[13, 22],
		[9, 35],
		[0, 16],
		[2, 14],
		[0, 8],
		[7, 17],
		[11, 23],
		[25, 28],
		[12, 24],
		[4, 13],
		[23, 30],
		[14, 29],
		[15, 35],
		[14, 34],
		[22, 33],
		[7, 31],
		[6, 20],
		[8, 14],
		[0, 7],
		[4, 26],
		[12, 22],
		[0, 38],
		[16, 34],
		[13, 30],
		[14, 31],
		[11, 28],
		[25, 37],
		[0, 32],
		[10, 12],
		[4, 6],
		[17, 24],
		[8, 17],
		[21, 34],
		[4, 19],
		[2, 38],
		[35, 38],
		[24, 36],
		[22, 27],
		[16, 25],
		[9, 22],
		[26, 32],
		[6, 32],
		[1, 20],
		[3, 5],
		[17, 31],
		[1, 9],
		[4, 22],
		[9, 23],
		[10, 14],
		[3, 6],
		[0, 4],
		[12, 20],
		[5, 24],
		[2, 21],
		[1, 37],
		[2, 23],
		[8, 34],
		[5, 29],
		[10, 35],
		[1, 38],
		[6, 36],
		[21, 27],
		[37, 39],
		[20, 37],
		[7, 35],
		[5, 39],
		[2, 36],
		[29, 34],
		[10, 26],
		[18, 25],
		[26, 39],
		[23, 26],
		[1, 24],
		[1, 13],
		[19, 32],
		[31, 39],
		[15, 39],
		[7, 21],
		[0, 34],
		[11, 25],
		[3, 24],
		[10, 25],
		[2, 35],
		[8, 19],
		[27, 29],
		[14, 20],
		[5, 7],
		[6, 12],
		[23, 33],
		[4, 36],
		[27, 38],
		[27, 30],
		[33, 38],
		[14, 28],
		[3, 11],
		[5, 8],
		[15, 30],
		[5, 12],
		[1, 15],
		[3, 15],
		[15, 25],
		[11, 27],
		[3, 34],
		[29, 37],
		[9, 17],
		[22, 38],
		[4, 12],
		[0, 5],
		[17, 23],
		[2, 15],
		[5, 20],
		[11, 33],
		[25, 38],
		[24, 38],
		[10, 31],
		[10, 36],
		[0, 13],
		[7, 36],
		[16, 19],
		[11, 15],
		[6, 37],
		[10, 34],
		[10, 20],
		[8, 15],
		[15, 28],
		[34, 36],
		[13, 36],
		[12, 14],
		[21, 24],
		[1, 19],
		[35, 39],
		[19, 28],
		[3, 23],
		[11, 35],
		[23, 36],
		[5, 21],
		[2, 27],
		[27, 33],
		[7, 28],
		[19, 39],
		[0, 33],
	];
console.log(shortestDistanceAfterQueries(n, queries));
