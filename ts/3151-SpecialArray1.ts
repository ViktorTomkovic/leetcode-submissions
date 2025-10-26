import { expect } from "jsr:@std/expect";
function isArraySpecial(nums: number[]): boolean {
	for (let i = 1; i < nums.length; i++) {
		if ((nums[i] & 1) == (nums[i-1] & 1)) {
			return false;
		}
	}
	return true;
};

Deno.test("Example 1", () => {
	const nums = [1];
	const output = true;
	const result = isArraySpecial(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const nums = [2,1,4];
	const output = true;
	const result = isArraySpecial(nums);
	expect(result).toEqual(output);
});

Deno.test("Example 3", () => {
	const nums = [4,3,1,6];
	const output = false;
	const result = isArraySpecial(nums);
	expect(result).toEqual(output);
});

