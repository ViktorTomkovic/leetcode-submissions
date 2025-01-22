import { expect } from "jsr:@std/expect";
function firstCompleteIndex(arr: number[], mat: number[][]): number {
	const rows = mat.length;
	const columns = mat[0].length;
	const rowCount = new Array(rows).fill(0);
	const colCount = new Array(columns).fill(0);
	const map = new Array<[number, number]>(arr.length);
	for (let row = 0; row < rows; row++) {
		for (let column = 0; column < columns; column++) {
			map[mat[row][column]] = [row, column];
		}
	}
	for (let i = 0; i < arr.length; i++) {
		const [cRow, cCol] = map[arr[i]];
		if (++rowCount[cRow] == columns || ++colCount[cCol] == rows) {
			return i;
		}
	}
	return -1;
}

Deno.test("leet1", () => {
	const arr = [1, 3, 4, 2], mat = [[1, 4], [2, 3]];
	const output = 2;
	const result = firstCompleteIndex(arr, mat);
	expect(result).toBe(output);
});

Deno.test("leet2", () => {
	const arr = [2, 8, 7, 4, 1, 3, 5, 6, 9],
		mat = [[3, 2, 5], [1, 4, 6], [8, 7, 9]];
	const output = 3;
	const result = firstCompleteIndex(arr, mat);
	expect(result).toBe(output);
});

Deno.test("leet3", () => {
	const arr = [1, 4, 5, 2, 6, 3],
		mat = [[4, 3, 5], [1, 2, 6]];
	const output = 1;
	const result = firstCompleteIndex(arr, mat);
	expect(result).toBe(output);
});
