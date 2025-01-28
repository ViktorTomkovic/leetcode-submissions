import { expect } from "jsr:@std/expect";
function lexicographicallySmallestArray(
	nums: number[],
	limit: number,
): number[] {
	const trans = nums.map((v, i) => [v, i]).sort(([a, _ia], [b, _ib]) => a - b);
	//console.log(trans);
	let left = 0;
	for (let right = 1; right < trans.length; right++) {
		if (trans[right - 1][0] + limit < trans[right][0]) {
			//console.log(trans[left][0], trans[right - 1][0]);
			const sortedIndeces = trans.slice(left, right).map(([_v, iv]) => iv)
				.sort((a, b) => a - b);
			for (let i = 0; i < right - left; i++) {
				trans[left + i][1] = sortedIndeces[i];
			}
			left = right;
		}
	}
	//console.log(trans);
	{
		const right = trans.length;
		//console.log(trans[left][0], trans[right - 1][0]);
		const sortedIndeces = trans.slice(left, right).map(([_v, iv]) => iv)
			.sort((a, b) => a - b);
		for (let i = 0; i < right - left; i++) {
			trans[left + i][1] = sortedIndeces[i];
		}
	}
	//console.log(trans);
	const result = new Array(nums.length);
	for (let i = 0; i < nums.length; i++) {
		const [v, ii] = trans[i];
		result[ii] = v;
	}
	return result;
}

Deno.test("leet1", () => {
	const nums = [1, 5, 3, 9, 8], limit = 2;
	const output = [1, 3, 5, 8, 9];
	const result = lexicographicallySmallestArray(nums, limit);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const nums = [1, 7, 6, 18, 2, 1], limit = 3;
	const output = [1, 6, 7, 18, 1, 2];
	const result = lexicographicallySmallestArray(nums, limit);
	expect(result).toEqual(output);
});

Deno.test("leet3", () => {
	const nums = [1, 7, 28, 19, 10], limit = 3;
	const output = [1, 7, 28, 19, 10];
	const result = lexicographicallySmallestArray(nums, limit);
	expect(result).toEqual(output);
});
