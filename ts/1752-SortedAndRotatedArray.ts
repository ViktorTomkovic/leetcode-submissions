import { expect } from "jsr:@std/expect";
function check(nums: number[]): boolean {
	let decreasingIndex = -1;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] < nums[i-1]) {
			if (decreasingIndex > 0) return false;
			decreasingIndex = i;
		}
	}
	return decreasingIndex == -1 ? true : nums[0] >= nums[nums.length-1];
}

Deno.test("Example 1:", () => {
	const nums = [3, 4, 5, 1, 2];
	const output = true;
	const result = check(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 2:", () => {
	const nums = [2, 1, 3, 4];
	const output = false;
	const result = check(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 3:", () => {
	const nums = [1, 2, 3];
	const output = true;
	const result = check(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 4:", () => {
	const nums = [1, 1, 1];
	const output = true;
	const result = check(nums);
	expect(result).toEqual(output);
});
