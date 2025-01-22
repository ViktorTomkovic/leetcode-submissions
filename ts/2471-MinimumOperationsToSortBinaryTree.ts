import { makeArray, makeIndeces, makeTree, TreeNode } from "./TreeNodeUtils.ts";
//import { Deque } from "npm:@datastructures-js/deque@1.0.4";

function minimumOperations(root: TreeNode | null): number {
	const levels: number[][] = [];
	let prevLevel: TreeNode[] = [];
	prevLevel.push(root!);
	let nextLevel: TreeNode[] = [];
	while (prevLevel.length > 0) {
		for (const node of prevLevel) {
			if (node.left != null) {
				nextLevel.push(node.left);
			}
			if (node.right != null) {
				nextLevel.push(node.right);
			}
		}
		levels.push(prevLevel.map((node) => node.val));
		prevLevel = nextLevel;
		nextLevel = [];
	}

	let swaps = 0;
	for (const level of levels) {
		//console.log(level.join("-"));
		const levelN = level.length;
		const sortedLevel = Array.from(level);
		sortedLevel.sort((a, b) => a - b);
		const destinationMap = new Map<number, number>();
		for (const [index, value] of sortedLevel.entries()) {
			destinationMap.set(index, value);
		}
		const levelMap = new Map<number, number>();
		for (const [index, value] of level.entries()) {
			levelMap.set(value, index);
		}
		//console.log(levelMap, destinationMap);
		for (let i = 0; i < levelN; i++) {
			const currentValue = level[i];
			const neededValue = destinationMap.get(i)!;
			if (neededValue != currentValue) {
				//console.log(level);
				const swapIndex = levelMap.get(neededValue)!;
				levelMap.set(neededValue, i);
				levelMap.set(currentValue, swapIndex);
				level[i] = neededValue;
				level[swapIndex] = currentValue;
				swaps++;
				//console.log(level);
			}
		}
	}

	return swaps;
}

let root;
root = [1, 4, 3, 7, 6, 8, 5, null, null, null, null, 9, null, 10];
console.log(minimumOperations(makeTree(root))); // Output: 3

root = [1, 3, 2, 7, 6, 5, 4];
console.log(minimumOperations(makeTree(root))); // Output: 3

root = [1, 2, 3, 4, 5, 6];
console.log(minimumOperations(makeTree(root))); // Output: 0

root = [
	332,
	463,
	103,
	417,
	150,
	409,
	41,
	135,
	129,
	117,
	474,
	263,
	null,
	328,
	456,
	347,
	167,
	383,
	null,
	null,
	422,
	493,
	489,
	275,
	72,
	null,
	null,
	425,
	89,
	null,
	null,
	162,
	18,
	null,
	null,
	null,
	null,
	363,
	290,
	106,
	260,
	468,
	null,
	null,
	null,
	432,
	null,
	323,
	null,
	null,
	null,
	null,
	null,
	null,
	36,
	null,
	null,
	302,
	190,
	null,
	280,
	null,
	null,
	null,
	null,
	488,
	null,
	null,
	null,
	null,
	446,
	null,
	null,
	null,
	null,
	null,
	75,
];
console.log(minimumOperations(makeTree(root))); // 24

//145-67
//228-150

[
	10000,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	null,
	null,
	20,
	21,
	22,
	23,
	24,
	null,
	null,
	27,
	28,
	null,
	null,
	31,
	32,
	null,
	null,
	null,
	null,
	37,
	38,
	39,
	40,
	41,
	null,
	null,
	null,
	45,
	null,
	47,
	null,
	null,
	null,
	null,
	null,
	null,
	54,
	null,
	null,
	55,
	56,
	null,
	58,
	null,
	null,
	null,
	null,
	63,
	null,
	null,
	null,
	null,
	68,
	null,
	null,
	null,
	null,
	null,
	74,
];
