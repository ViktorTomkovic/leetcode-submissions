import { expect } from "jsr:@std/expect";
function largestIsland(grid: number[][]): number {
	const rows = grid.length;
	const columns = grid[0].length;
	const origin: number[][][] = Array.from(
		{ length: rows },
		() => new Array(columns).fill(undefined),
	);
	const toHash = (row: number, col: number): number => row * 1000 + col;
	const color = (
		cRow: number,
		cCol: number,
		oRow: number,
		oCol: number,
	): number => {
		if (
			cRow < 0 || cRow >= rows || cCol < 0 || cCol >= columns ||
			grid[cRow][cCol] <= 0
		) {
			return 0;
		}
		grid[cRow][cCol] = -1;
		origin[cRow][cCol] = [oRow, oCol];
		let result = 1;
		result += color(cRow - 1, cCol, oRow, oCol);
		result += color(cRow + 1, cCol, oRow, oCol);
		result += color(cRow, cCol - 1, oRow, oCol);
		result += color(cRow, cCol + 1, oRow, oCol);
		return result;
	};
	let maxSize = 0;
	const sizes = new Map<number, number>();
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col++) {
			const size = color(row, col, row, col);
			if (size > 0) {
				sizes.set(toHash(row, col), size);
				maxSize = Math.max(maxSize, size);
			}
		}
	}
	const getSize = (row: number, col: number): [number, number] => {
		if (row < 0 || row >= rows || col < 0 || col >= columns) {
			return [-1, 0];
		}
		if (origin[row][col] == undefined) {
			return [-1, 0];
		}
		const [oRow, oCol] = origin[row][col];
		const originHash = toHash(oRow, oCol);
		const size = sizes.get(originHash) ?? 0;
		return [originHash, size];
	};
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < columns; col++) {
			if (grid[row][col] != 0) continue;
			const nei = new Map<number, number>();
			const [originHash1, oSize1] = getSize(row - 1, col);
			if (originHash1 != -1) nei.set(originHash1, oSize1);
			const [originHash2, oSize2] = getSize(row + 1, col);
			if (originHash2 != -1) nei.set(originHash2, oSize2);
			const [originHash3, oSize3] = getSize(row, col - 1);
			if (originHash3 != -1) nei.set(originHash3, oSize3);
			const [originHash4, oSize4] = getSize(row, col + 1);
			if (originHash4 != -1) nei.set(originHash4, oSize4);
			const vals = nei.values();
			let size = 0;
			for (const val of vals) size += val;
			maxSize = Math.max(size + 1, maxSize);
		}
	}
	return maxSize;
}

Deno.test("leet1", () => {
	const grid = [[1, 0], [0, 1]];
	const output = 3;
	const result = largestIsland(grid);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const grid = [[1, 1], [1, 0]];
	const output = 4;
	const result = largestIsland(grid);
	expect(result).toEqual(output);
});

Deno.test("leet3", () => {
	const grid = [[1, 1], [1, 1]];
	const output = 4;
	const result = largestIsland(grid);
	expect(result).toBe(output);
});
