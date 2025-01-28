import { expect } from "jsr:@std/expect";
function findMaxFish(grid: number[][]): number {
	const rows = grid.length;
	const cols = grid[0].length;
	const dr = [1, -1, 0, 0];
	const dc = [0, 0, 1, -1];
	const dfs = (cr: number, cc: number, sum: number): number => {
		if (!(0 <= cr && cr < rows && 0 <= cc && cc < cols && grid[cr][cc] != 0)) {
			return 0;
		}
		sum += grid[cr][cc];
		grid[cr][cc] = 0;
		for (let k = 0; k < 4; k++) {
			const nr = cr + dr[k];
			const nc = cc + dc[k];
			sum += dfs(nr, nc, 0);
		}
		return sum;
	};
	let maxFish = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] != 0) {
				const currentFish = dfs(i, j, 0);
				maxFish = Math.max(maxFish, currentFish);
			}
		}
	}
	return maxFish;
}

Deno.test("leet1", () => {
	const grid = [[0, 2, 1, 0], [4, 0, 0, 3], [1, 0, 0, 4], [0, 3, 2, 0]];
	const output = 7;
	const result = findMaxFish(grid);
	expect(result).toBe(output);
});

Deno.test("leet2", () => {
	const grid = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]];
	const output = 1;
	const result = findMaxFish(grid);
	expect(result).toBe(output);
});

//Deno.test("leet3", () => {
//	const arr = [1, 4, 5, 2, 6, 3],
//		mat = [[4, 3, 5], [1, 2, 6]];
//	const output = 1;
//	const result = findMaxFish(grid);
//	expect(result).toBe(output);
//});
