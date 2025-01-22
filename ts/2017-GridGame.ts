import { expect } from "jsr:@std/expect";
function gridGame(grid: number[][]): number {
	const n = grid[0].length;
	if (n == 1) {
		return 0;
	}
	const postfix = new Array(n);
	const prefix = new Array(n);
	postfix[n - 1] = grid[0][n - 1];
	prefix[0] = grid[1][0];
	for (let i = 1; i < n - 1; i++) {
		postfix[n - 1 - i] = grid[0][n - 1 - i] + postfix[n - i];
		prefix[i] = grid[1][i] + prefix[i - 1];
	}
	postfix[0] = grid[0][0] + postfix[1];
	prefix[n - 1] = grid[1][n - 1] + prefix[n - 2];
	let minimum = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < n; i++) {
		const current = Math.max((postfix[i + 1] ?? 0), (prefix[i - 1] ?? 0));
		minimum = Math.min(minimum, current);
	}
	return minimum;
}

Deno.test("leet1", () => {
	const grid = [[2, 5, 4], [1, 5, 1]];
	const output = 4;
	const result = gridGame(grid);
	expect(result).toBe(output);
});

Deno.test("leet2", () => {
	const grid = [[3, 3, 1], [8, 5, 2]];
	const output = 4;
	const result = gridGame(grid);
	expect(result).toBe(output);
});

Deno.test("leet3", () => {
	const grid = [[1, 3, 1, 15], [1, 3, 3, 1]];
	const output = 7;
	const result = gridGame(grid);
	expect(result).toBe(output);
});
