import { expect } from "jsr:@std/expect";
function maxAscendingSum(nums: number[]): number {
	let maxSum = 0;
	let l = 0;
	for (let r = 1; r < nums.length; r++) {
		if (nums[r - 1] >= nums[r]) {
			const sum = nums.slice(l, r).reduce((v, a) => v + a, 0);
			maxSum = Math.max(maxSum, sum);
			l = r;
		}
	}
	const sum = nums.slice(l, nums.length).reduce((v, a) => v + a, 0);
	maxSum = Math.max(maxSum, sum);
	return maxSum;
}

Deno.test("Example 4", () => {
	const nums = [3,6,10,1,8,9,9,8,9];
	const output = 19;
	const result = maxAscendingSum(nums);
	expect(result).toEqual(output);
});
