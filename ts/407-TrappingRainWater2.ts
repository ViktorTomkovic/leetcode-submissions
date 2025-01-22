import { expect } from "jsr:@std/expect";
import { MinPriorityQueue } from "npm:@datastructures-js/priority-queue@5.4.0";
function trapRainWater(heightMap: number[][]): number {
	const rows = heightMap.length;
	const columns = heightMap[0].length;
	const visited: boolean[][] = Array.from(
		{ length: rows },
		() => new Array(columns).fill(false),
	);

	const pq = new MinPriorityQueue<[number, number]>();
	for (let row = 0; row < rows; row++) {
		visited[row][0] = true;
		visited[row][columns - 1] = true;

		pq.enqueue([row, 0], heightMap[row][0]);
		pq.enqueue([row, columns - 1], heightMap[row][columns - 1]);
	}
	for (let column = 0; column < columns; column++) {
		visited[0][column] = true;
		visited[rows - 1][column] = true;

		pq.enqueue([0, column], heightMap[0][column]);
		pq.enqueue([rows - 1, column], heightMap[rows - 1][column]);
	}
	let caughtWater = 0;
	const dRow = [1, -1, 0, 0];
	const dCol = [0, 0, 1, -1];
	while (!pq.isEmpty()) {
		const { priority: cHeight, element: [cRow, cCol] } = pq.dequeue();
		for (let i = 0; i < 4; i++) {
			const nRow = cRow + dRow[i];
			const nCol = cCol + dCol[i];
			if (
				0 <= nRow && nRow < rows && 0 <= nCol && nCol < columns &&
				!visited[nRow][nCol]
			) {
				caughtWater += Math.max(0, cHeight - heightMap[nRow][nCol]);
				pq.enqueue([nRow, nCol], Math.max(cHeight, heightMap[nRow][nCol]));
				visited[nRow][nCol] = true;
			}
		}
	}
	return caughtWater;
}

Deno.test("leet1", () => {
	const heightMap: number[][] = [
		[1, 4, 3, 1, 3, 2],
		[3, 2, 1, 3, 2, 4],
		[2, 3, 3, 2, 3, 1],
	];
	const output = 4;
	const result = trapRainWater(heightMap);
	expect(result).toBe(output);
});

Deno.test("leet2", () => {
	const heightMap = [
		[3, 3, 3, 3, 3],
		[3, 2, 2, 2, 3],
		[3, 2, 1, 2, 3],
		[3, 2, 2, 2, 3],
		[3, 3, 3, 3, 3],
	];
	const output = 10;
	const result = trapRainWater(heightMap);
	expect(result).toBe(output);
});

//Deno.test({
//name: "read file test",
//permissions: { read: true },
//fn: () => {
//	const data = Deno.readTextFileSync("./somefile.txt");
//	assertEquals(data, "expected content");
//},
//});
