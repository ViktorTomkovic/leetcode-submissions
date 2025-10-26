import { expect } from "jsr:@std/expect";
function tupleSameProduct(nums: number[]): number {
	const products = [];
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			products.push(nums[i] * nums[j]);
		}
	}
	products.sort((a, b) => a - b);
	const frequency = products.reduce(
		(acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
		new Map<number, number>(),
	);


	const same = frequency.values().reduce((a,c) => a + (c * (c-1) / 2), 0);

	return same * 8;
}

Deno.test("Example 1", () => {
	const nums = [2, 3, 4, 6];
	const output = 8;
	const result = tupleSameProduct(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const nums = [1, 2, 4, 5, 10];
	const output = 16;
	const result = tupleSameProduct(nums);
	expect(result).toEqual(output);
});
