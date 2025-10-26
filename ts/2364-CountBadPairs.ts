import { expect } from "jsr:@std/expect";
function countBadPairs(nums: number[]): number {
	const oneHand = new Map<number, number>();
	for (const [i, num] of nums.entries()) {
		const distance = num - i;
		if (!oneHand.has(distance)) {
			oneHand.set(distance, 0);
		}
		oneHand.set(distance, oneHand.get(distance)! + 1);
	}
	let same = 0;
	for (const [_key, value] of oneHand) {
		same += value * (value - 1) / 2;
	}
	const different = nums.length * (nums.length - 1) / 2;
	return different - same;
}

Deno.test("Example 1", () => {
	const nums = [4, 1, 3, 3];
	const output = 5;
	const result = countBadPairs(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const nums = [1, 2, 3, 4, 5];
	const output = 0;
	const result = countBadPairs(nums);
	expect(result).toEqual(output);
});
