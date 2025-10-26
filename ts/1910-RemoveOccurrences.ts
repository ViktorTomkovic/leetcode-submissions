import { expect } from "jsr:@std/expect";
function removeOccurrences(s: string, part: string): string {
	const d = part.length;
	let index = s.indexOf(part);
	while (index != -1) {
		s = s.slice(0, index) + s.slice(index + d);
		index = s.indexOf(part);
	}
	return s;
}

//do {
//	s = s.replace(part, "");
//} while (s.includes(part));

Deno.test("Example 1", () => {
	const s = "daabcbaabcbc", part = "abc";
	const output = "dab";
	const result = removeOccurrences(s, part);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const s = "axxxxyyyyb", part = "xy";
	const output = "ab";
	const result = removeOccurrences(s, part);
	expect(result).toEqual(output);
});
