function leftmostBuildingQueries(
	heights: number[],
	queries: number[][],
): number[] {
	type HeightIndexPair = { height: number; index: number };
	// query a_i, b_i where a_i < b_i is at unprocessedQueries[b_i] = [...,a_i,...]
	const unprocessedQueries: number[][][] = Array.from(
		{ length: heights.length },
		() => [],
	);
	const result: number[] = new Array(queries.length).fill(-1);
	for (let [i, [a, b]] of queries.entries()) {
		if (a == b) {
			result[i] = a;
			continue;
		}
		if (a > b) [a, b] = [b, a];
		if (heights[a] < heights[b]) result[i] = b;
		else unprocessedQueries[b].push([a, i]);
	}
	const getLastBiggerThan = (
		element: number,
		searchedArray: HeightIndexPair[],
	): HeightIndexPair | undefined => {
		if (searchedArray.length == 0) return undefined;
		//console.log("2.", element, monostack);
		let left = 0;
		let right = searchedArray.length - 1;
		let middle = Math.ceil((left + right) / 2);
		let middleValue = searchedArray[middle];
		while (left != right) {
			if (middleValue.height > element) {
				left = middle;
			} else {
				right = middle - 1;
			}
			middle = Math.ceil((left + right) / 2);
			middleValue = searchedArray[middle];
		}
		//console.log("3.", element, middleValue);
		if (middleValue.height > element) {
			return middleValue;
		} else {
			return undefined;
		}
	};
	const monostack: HeightIndexPair[] = [];
	//console.log("===============");
	//console.log("h", heights);
	for (let i = heights.length - 1; i >= 0; i--) {
		const height = heights[i];
		while (monostack.length > 0 && monostack.at(-1)!.height <= height) {
			monostack.pop();
		}
		monostack.push({ height: height, index: i });
		for (const [a, queryIndex] of unprocessedQueries[i]) {
			//console.log("1.", i, "****");
			//console.log(a, i, "->", heights[a], heights[i], "q_i", queryIndex);
			//console.log("1.", a, queryIndex, queries, i, heights, monostack);
			const firstEqualOrHigherBuilding = getLastBiggerThan(
				heights[a],
				monostack,
			);
			result[queryIndex] = firstEqualOrHigherBuilding?.index ?? -1;
		}
	}
	return result;
}

let heights, queries;
heights = [6, 4, 8, 5, 2, 7],
	queries = [[0, 1], [0, 3], [2, 4], [3, 4], [2, 2]];
console.log(leftmostBuildingQueries(heights, queries)); // Output: [2,5,-1,5,2]

heights = [5, 3, 8, 2, 6, 1, 4, 6],
	queries = [[0, 7], [3, 5], [5, 2], [3, 0], [1, 6]];
console.log(leftmostBuildingQueries(heights, queries)); // Output: [7,6,-1,4,6]

heights = [1, 2, 1, 2, 1, 2];
queries = [
	[0, 0],
	[0, 1],
	[0, 2],
	[0, 3],
	[0, 4],
	[0, 5],
	[1, 0],
	[1, 1],
	[1, 2],
	[1, 3],
	[1, 4],
	[1, 5],
	[2, 0],
	[2, 1],
	[2, 2],
	[2, 3],
	[2, 4],
	[2, 5],
	[3, 0],
	[3, 1],
	[3, 2],
	[3, 3],
	[3, 4],
	[3, 5],
	[4, 0],
	[4, 1],
	[4, 2],
	[4, 3],
	[4, 4],
	[4, 5],
	[5, 0],
	[5, 1],
	[5, 2],
	[5, 3],
	[5, 4],
	[5, 5],
];
// Output: [0,1,3,3,5,5,1,1,-1,-1,-1,-1,3,-1,2,3,5,5,3,-1,3,3,-1,-1,5,-1,5,-1,4,5,5,-1,5,-1,5,5]
console.log(leftmostBuildingQueries(heights, queries));

type HeightIndexPair = { height: number; index: number };

const findInAscending = <TSearching, TSearched>(
	searchingFor: TSearching,
	searchedArray: Array<TSearched>,
	leftIndex: number,
	rightIndex: number,
	isSearchingOnLeftSide: (
		searching: TSearching,
		searched: TSearched,
	) => boolean,
): TSearched | undefined => {
	let middleIndex = (leftIndex + rightIndex) >> 1;
	let middleValue = searchedArray[middleIndex];
	let isOnTheLeft = isSearchingOnLeftSide(searchingFor, middleValue);
	do {
		if (isOnTheLeft) {
			rightIndex = middleIndex;
		} else {
			leftIndex = middleIndex + 1;
		}
		middleIndex = (leftIndex + rightIndex) >> 1;
		middleValue = searchedArray[middleIndex];
		isOnTheLeft = isSearchingOnLeftSide(searchingFor, middleValue);
	} while (leftIndex != rightIndex);
	const isInbounds = isSearchingOnLeftSide(
		searchingFor,
		searchedArray[leftIndex],
	);
	if (isInbounds) {
		return searchedArray[leftIndex];
	} else {
		return undefined;
	}
};

const findInAscending2 = <TSearching, TSearched>(
	searchingFor: TSearching,
	searchedArray: Array<TSearched>,
	leftIndex: number,
	rightIndex: number,
	isSearchingOnRightSide: (
		searching: TSearching,
		searched: TSearched,
	) => boolean,
): TSearched | undefined => {
	let middleIndex = Math.ceil((leftIndex + rightIndex) / 2);
	let middleValue = searchedArray[middleIndex];
	let isOnTheRight = isSearchingOnRightSide(searchingFor, middleValue);
	do {
		if (isOnTheRight) {
			leftIndex = middleIndex;
		} else {
			rightIndex = middleIndex - 1;
		}
		middleIndex = Math.ceil((leftIndex + rightIndex) / 2);
		middleValue = searchedArray[middleIndex];
		isOnTheRight = isSearchingOnRightSide(searchingFor, middleValue);
	} while (leftIndex != rightIndex);
	const isInbounds = isSearchingOnRightSide(
		searchingFor,
		searchedArray[leftIndex],
	);
	if (isInbounds) {
		return searchedArray[leftIndex];
	} else {
		return undefined;
	}
};

let heights2 = [1, 3, 3, 4, 6, 6, 6, 7, 10];
let monostack = heights2.map<HeightIndexPair>((v, i) => {
	return {
		height: v,
		index: i,
	};
});
const comparatorLEq = (
	height: number,
	heightIndexPair: HeightIndexPair,
): boolean => {
	return height <= heightIndexPair.height;
};
const comparatorL = (
	height: number,
	heightIndexPair: HeightIndexPair,
): boolean => {
	return height < heightIndexPair.height;
};
const comparatorG = (
	height: number,
	heightIndexPair: HeightIndexPair,
): boolean => {
	return height > heightIndexPair.height;
};
const comparatorGEq = (
	height: number,
	heightIndexPair: HeightIndexPair,
): boolean => {
	return height >= heightIndexPair.height;
};
//console.log(
//	findInAscending2(8, monostack, 0, monostack.length - 1, comparatorGEq),
//);
//console.log(
//	findInAscending2(11, monostack, 0, monostack.length - 1, comparatorGEq),
//);
//console.log(
//	findInAscending2(10, monostack, 0, monostack.length - 1, comparatorGEq),
//);
//console.log(
//	findInAscending2(0, monostack, 0, monostack.length - 1, comparatorGEq),
//);
//console.log(
//	findInAscending2(6, monostack, 0, monostack.length - 1, comparatorGEq),
//);
//console.log("---");
//console.log(
//	findInAscending2(8, monostack, 0, monostack.length - 1, comparatorG),
//);
//console.log(
//	findInAscending2(11, monostack, 0, monostack.length - 1, comparatorG),
//);
//console.log(
//	findInAscending2(10, monostack, 0, monostack.length - 1, comparatorG),
//);
//console.log(
//	findInAscending2(0, monostack, 0, monostack.length - 1, comparatorG),
//);
//console.log(
//	findInAscending2(1, monostack, 0, monostack.length - 1, comparatorG),
//);
//console.log(
//	findInAscending2(6, monostack, 0, monostack.length - 1, comparatorG),
//);
//console.log(findFirstEqualOrHigher(8, monostack, 0, monostack.length - 1, comparatorLEq));
//console.log(findFirstEqualOrHigher(11, monostack, 0, monostack.length - 1, comparatorLEq));
//console.log(findFirstEqualOrHigher(10, monostack, 0, monostack.length - 1, comparatorLEq));
//console.log(findFirstEqualOrHigher(0, monostack, 0, monostack.length - 1, comparatorLEq));
//console.log(findFirstEqualOrHigher(8, monostack, 0, monostack.length - 1, comparatorL));
//console.log(findFirstEqualOrHigher(11, monostack, 0, monostack.length - 1, comparatorL));
//console.log(findFirstEqualOrHigher(10, monostack, 0, monostack.length - 1, comparatorL));
//console.log(findFirstEqualOrHigher(0, monostack, 0, monostack.length - 1, comparatorL));
//console.log(findFirstEqualOrHigher(1, monostack, 0, monostack.length - 1, comparatorL));
