import { expect } from "jsr:@std/expect";
function longestMonotonicSubarray(nums: number[]): number {
	let leftUp = 0;
	let leftDown = 0;
	let maxUp = 0;
	let maxDown = 0;
	for (let right = 1; right < nums.length; right++) {
		if (nums[right - 1] <= nums[right]) {
			maxDown = Math.max(maxDown, right - leftDown);
			leftDown = right;
		}
		if (nums[right - 1] >= nums[right]) {
			maxUp = Math.max(maxUp, right - leftUp);
			leftUp = right;
		}
	}
	maxDown = Math.max(maxDown, nums.length - leftDown);
	maxUp = Math.max(maxUp, nums.length - leftUp);
	return Math.max(maxDown, maxUp);
}

Deno.test("Example 1", () => {
	const nums = [1, 4, 3, 3, 2];
	const output = 2;
	const result = longestMonotonicSubarray(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const nums = [3, 3, 3];
	const output = 1;
	const result = longestMonotonicSubarray(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 3", () => {
	const nums = [3, 2, 1];
	const output = 3;
	const result = longestMonotonicSubarray(nums);
	expect(result).toEqual(output);
});
