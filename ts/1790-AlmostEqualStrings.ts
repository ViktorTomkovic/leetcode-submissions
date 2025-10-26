import { expect } from "jsr:@std/expect";

function areAlmostEqual(s1: string, s2: string): boolean {
	if (s1 == s2) return true;
	const n = s1.length;
	const swapStr = (str: string, first: number, last: number): string => {
		return str.slice(0, first) +
			str[last] +
			str.slice(first + 1, last) +
			str[first] +
			str.slice(last + 1);
	};
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (swapStr(s1, i, j) == s2) {
				return true;
			}
		}
	}
	return false;
}

Deno.test("Example 1", () => {
	const s1 = "bank", s2 = "kanb";
	const output = true;
	const result = areAlmostEqual(s1, s2);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const s1 = "attack", s2 = "defend";
	const output = false;
	const result = areAlmostEqual(s1, s2);
	expect(result).toEqual(output);
});

Deno.test("Example 3", () => {
	const s1 = "kelb", s2 = "kelb";
	const output = true;
	const result = areAlmostEqual(s1, s2);
	expect(result).toEqual(output);
});
