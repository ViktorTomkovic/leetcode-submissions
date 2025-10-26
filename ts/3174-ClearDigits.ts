import { expect } from "jsr:@std/expect";
function clearDigits(s: string): string {
	let i = 0;
	const code0 = "0".charCodeAt(0);
	const code9 = "9".charCodeAt(0);
	while (i < s.length) {
		if (code0 <= s.charCodeAt(i) && s.charCodeAt(i) <= code9) {
			console.log(i, s.slice(0, i-1), s.slice(i+1))
			s = s.slice(0, i - 1) + s.slice(i + 1);
			i -= 2;
		}
		i++;
	}
	return s;
};

Deno.test("Example 1", () => {
	const s = "abc";
	const output = "abc";
	const result = clearDigits(s);
	expect(result).toEqual(output);
});


Deno.test("Example 2", () => {
	const s = "cb34";
	const output = "";
	const result = clearDigits(s);
	expect(result).toEqual(output);
});

