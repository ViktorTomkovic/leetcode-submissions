import { expect } from "jsr:@std/expect";
import { MinPriorityQueue } from "npm:@datastructures-js/priority-queue@5.4.0";
function highestPeak(isWater: number[][]): number[][] {
	const rows = isWater.length;
	const columns = isWater[0].length;
	const pq = new MinPriorityQueue<[number, number]>();
	const height = Array.from({ length: rows }, () => new Array(columns).fill(0));
	const visited = Array.from(
		{ length: rows },
		() => new Array(columns).fill(false),
	);
	const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
			if (isWater[row][column] == 1) {
				pq.enqueue([row, column], 0);
				height[row][column] = 0;
			}
		}
	}
	while (!pq.isEmpty()) {
		const { element: [cRow, cCol], priority: cHei } = pq.dequeue();
		if (visited[cRow][cCol]) continue;
		height[cRow][cCol] = cHei;
		visited[cRow][cCol] = true;
		for (const [dRow, dCol] of dirs) {
			const [nRow, nCol] = [cRow + dRow, cCol + dCol];
			if (
				0 <= nRow && nRow < rows && 0 <= nCol && nCol < columns &&
				visited[nRow][nCol] == false
			) {
				pq.enqueue([nRow, nCol], cHei + 1);
			}
		}
	}
	return height;
}

Deno.test("leet1", () => {
	const isWater = [[0, 1], [0, 0]];
	const output = [[1, 0], [2, 1]];
	const result = highestPeak(isWater);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const isWater = [[0, 0, 1], [1, 0, 0], [0, 0, 0]];
	const output = [[1, 1, 0], [0, 1, 1], [1, 2, 2]];
	const result = highestPeak(isWater);
	expect(result).toEqual(output);
});

//Deno.test("leet3", () => {
//	const grid = [[1, 3, 1, 15], [1, 3, 3, 1]];
//	const output = 7;
//	const result = highestPeak(grid);
//	expect(result).toBe(output);
//});
