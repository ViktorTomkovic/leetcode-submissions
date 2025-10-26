import { expect } from "jsr:@std/expect";

function queryResults(limit: number, queries: number[][]): number[] {
	const colors = new Array(limit+1);
	const colorMap = new Map<number, number>();
	const result: number[] = [];
	for (const [node, color] of queries) {
		const oldColor = colors[node];
		colors[node] = color;
		if (oldColor != undefined) {
			const oldColorCount = colorMap.get(oldColor)!;
			if (oldColorCount == 1) {
				colorMap.delete(oldColor);
			} else {
				colorMap.set(oldColor, oldColorCount - 1);
			}
		}
		const newColorCount = colorMap.get(color);
		if (newColorCount == undefined) {
			colorMap.set(color, 1);
		} else {
			colorMap.set(color, colorMap.get(color)! + 1);
		}
		result.push(colorMap.size);
	}
	return result;
}

Deno.test("Example 1", () => {
	const limit = 4, queries = [[1, 4], [2, 5], [1, 3], [3, 4]];
	const output = [1, 2, 2, 3];
	const result = queryResults(limit, queries);
	expect(result).toEqual(output);
});

Deno.test("Example 2", () => {
	const limit = 4, queries = [[0, 1], [1, 2], [2, 2], [3, 4], [4, 5]];
	const output = [1, 2, 2, 3, 4];
	const result = queryResults(limit, queries);
	expect(result).toEqual(output);
});
