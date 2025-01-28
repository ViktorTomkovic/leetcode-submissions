import { expect } from "jsr:@std/expect/expect";
function countServers(grid: number[][]): number {
	const rows = grid.length;
	const columns = grid[0].length;
	const toHash = (row: number, column: number) => row * 1000 + column;
	const union = <U>(set1: Set<U>, set2: Set<U>): Set<U> => {
		const result = new Set<U>();
		set1.forEach((e) => result.add(e));
		set2.forEach((e) => result.add(e));
		return result;
	};
	let totalSet = new Set<number>();
	for (let row = 0; row < rows; row++) {
		let rowCount = 0;
		const rowSet = new Set<number>();
		for (let column = 0; column < columns; column++) {
			if (grid[row][column] == 1) {
				rowCount++;
				rowSet.add(toHash(row, column));
			}
		}
		if (rowCount > 1) {
			totalSet = union(totalSet, rowSet);
		}
	}
	for (let column = 0; column < columns; column++) {
		let columnCount = 0;
		const columnSet = new Set<number>();
		for (let row = 0; row < rows; row++) {
			if (grid[row][column] == 1) {
				columnCount++;
				columnSet.add(toHash(row, column));
			}
		}
		if (columnCount > 1) {
			totalSet = union(totalSet, columnSet);
		}
	}
	return totalSet.size;
}

Deno.test("leet1", () => {
	const grid = [[1, 0], [0, 1]];
	const output = 0;
	const result = countServers(grid);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const grid = [[1, 0], [1, 1]];
	const output = 3;
	const result = countServers(grid);
	expect(result).toEqual(output);
});

Deno.test("leet3", () => {
	const grid = [[1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
	const output = 4;
	const result = countServers(grid);
	expect(result).toBe(output);
});
