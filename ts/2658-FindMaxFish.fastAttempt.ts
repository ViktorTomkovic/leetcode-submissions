import { expect } from "jsr:@std/expect";


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
