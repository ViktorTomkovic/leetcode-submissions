import { writeUndirectedGraph } from "./writeToDotFile.ts";
function minimumDiameterAfterMerge(
	edges1: number[][],
	edges2: number[][],
): number {
	const n1 = Math.max.apply(null, edges1.flat()) + 1;
	const neighbors1: Set<number>[] = Array.from({ length: n1 }, () => new Set());
	for (const [from, to] of edges1) {
		neighbors1[from].add(to);
		neighbors1[to].add(from);
	}
	const n2 = Math.max.apply(null, edges2.flat()) + 1;
	const neighbors2: Set<number>[] = Array.from({ length: n2 }, () => new Set());
	for (const [from, to] of edges2) {
		neighbors2[from].add(to);
		neighbors2[to].add(from);
	}

	const findDiameter = (
		currentNode: number,
		comingFrom: number,
		neighborsMatrix: Set<number>[],
		currentDepth: number,
	): [number, number, number] => {
		const neighbors = neighborsMatrix[currentNode];
		let diameterOfVisitedNodes = 0;
		let diameterWithThisNode = 0;
		let maxDepth = 0;
		let secondDepth = 0;
		for (const neighbor of neighbors.values()) {
			if (neighbor == comingFrom) {
				continue;
			}
			const [_diameterSubtree, maxDepthSubtree, diameterVisitedSubtree] =
				findDiameter(
					neighbor,
					currentNode,
					neighborsMatrix,
					currentDepth + 1,
				);
			const temp = Math.min(maxDepth, maxDepthSubtree);
			maxDepth = Math.max(maxDepth, maxDepthSubtree);
			secondDepth = Math.max(temp, secondDepth);
			diameterOfVisitedNodes = Math.max(diameterOfVisitedNodes, diameterVisitedSubtree);
		}
		diameterWithThisNode = maxDepth + secondDepth;
		diameterOfVisitedNodes = Math.max(
			diameterOfVisitedNodes,
			diameterWithThisNode,
		);
		//console.log(
		//	currentNode, "depth",
		//	maxDepth, "diaNode",
		//	diameterWithThisNode, "diaVis",
		//	diameterOfVisitedNodes,
		//);
		return [diameterWithThisNode, maxDepth + 1, diameterOfVisitedNodes];
	};
	const [_diameter1, _a, diameter1] = neighbors1.length > 0
		? findDiameter(0, 0, neighbors1, 0)
		: [0, 0, 0];
	//console.log("---");
	const [_diameter2, _b, diameter2] = neighbors2.length > 0
		? findDiameter(0, 0, neighbors2, 0)
		: [0, 0, 0];

	return Math.max(
		diameter1,
		diameter2,
		Math.ceil(diameter1 / 2) + Math.ceil(diameter2 / 2) + 1,
	);
}

let edges1: number[][], edges2: number[][];
//edges1 = [[0, 1], [0, 2], [0, 3]], edges2 = [[0, 1]];
//console.log(minimumDiameterAfterMerge(edges1, edges2)); // Output: 3
//
//edges1 = [[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [3, 6], [2, 7]],
//	edges2 = [[0, 1], [0, 2], [0, 3], [2, 4], [2, 5], [3, 6], [2, 7]];
//console.log(minimumDiameterAfterMerge(edges1, edges2)); // Output: 5
//
//edges1 = [], edges2 = [];
//console.log(minimumDiameterAfterMerge(edges1, edges2)); // 1

//edges1 = [[1, 0], [1, 2], [1, 3]],
//	edges2 = [[3, 0], [2, 5], [4, 2], [4, 6], [3, 4], [1, 3], [1, 7]];
//console.log(minimumDiameterAfterMerge(edges1, edges2)); // 5

edges1 = [
	[60, 3],
	[41, 7],
	[46, 8],
	[64, 9],
	[28, 10],
	[20, 14],
	[28, 15],
	[67, 18],
	[90, 21],
	[32, 22],
	[19, 24],
	[75, 25],
	[32, 27],
	[75, 30],
	[29, 32],
	[45, 33],
	[64, 35],
	[46, 36],
	[63, 38],
	[34, 39],
	[19, 34],
	[12, 42],
	[41, 43],
	[70, 45],
	[75, 46],
	[85, 48],
	[20, 49],
	[17, 54],
	[1, 17],
	[4, 56],
	[69, 4],
	[6, 57],
	[52, 58],
	[53, 52],
	[13, 61],
	[85, 13],
	[80, 62],
	[66, 67],
	[28, 68],
	[1, 69],
	[78, 70],
	[41, 71],
	[6, 41],
	[80, 72],
	[74, 75],
	[23, 74],
	[64, 76],
	[92, 64],
	[60, 78],
	[23, 79],
	[29, 23],
	[1, 83],
	[40, 1],
	[19, 40],
	[47, 84],
	[44, 47],
	[63, 44],
	[65, 63],
	[82, 86],
	[5, 87],
	[53, 5],
	[88, 53],
	[65, 89],
	[77, 65],
	[59, 77],
	[66, 59],
	[26, 66],
	[16, 26],
	[20, 16],
	[81, 90],
	[55, 81],
	[2, 55],
	[88, 2],
	[28, 88],
	[37, 28],
	[31, 37],
	[19, 31],
	[85, 19],
	[12, 85],
	[11, 12],
	[50, 11],
	[50, 91],
	[51, 50],
	[6, 51],
	[82, 6],
	[20, 82],
	[80, 20],
	[29, 80],
	[0, 29],
	[73, 0],
	[60, 73],
	[60, 92],
];
edges2 = [
	[32, 4],
	[5, 6],
	[23, 7],
	[5, 8],
	[16, 5],
	[9, 10],
	[26, 9],
	[3, 12],
	[0, 15],
	[30, 16],
	[17, 18],
	[22, 20],
	[22, 21],
	[0, 22],
	[17, 26],
	[14, 17],
	[3, 27],
	[19, 3],
	[11, 19],
	[1, 11],
	[13, 1],
	[23, 28],
	[25, 29],
	[14, 25],
	[13, 14],
	[32, 13],
	[2, 30],
	[24, 2],
	[0, 24],
	[23, 0],
	[31, 23],
	[31, 32],
];
console.log(minimumDiameterAfterMerge(edges1, edges2)); // 27
writeUndirectedGraph("01", edges1);
writeUndirectedGraph("02", edges2);
