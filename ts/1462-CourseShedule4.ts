import { expect } from "jsr:@std/expect";
function checkIfPrerequisite(
	numCourses: number,
	prerequisites: number[][],
	queries: number[][],
): boolean[] {
	// Array.from({ length: n }, (_, index) => index);
	const isReachable = Array.from(
		{ length: numCourses },
		() => new Array(numCourses).fill(false),
	);
	for (const [from, to] of prerequisites) {
		isReachable[from][to] = true;
	}
	for (let inter = 0; inter < isReachable.length; inter++) {
		for (let from = 0; from < isReachable[0].length; from++) {
			for (let to = 0; to < isReachable[0].length; to++) {
				isReachable[from][to] = isReachable[from][to] ||
					(isReachable[from][inter] && isReachable[inter][to]);
			}
		}
	}
	const result = [];
	for (const [from, to] of queries) {
		result.push(isReachable[from][to]);
	}
	return result;
}

Deno.test("leet1", () => {
	const numCourses = 2, prerequisites = [[1, 0]], queries = [[0, 1], [1, 0]];
	const output = [false, true];
	const result = checkIfPrerequisite(numCourses, prerequisites, queries);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const numCourses = 2,
		prerequisites: number[][] = [],
		queries = [[1, 0], [0, 1]];
	const output = [false, false];
	const result = checkIfPrerequisite(numCourses, prerequisites, queries);
	expect(result).toEqual(output);
});

Deno.test("leet3", () => {
	const numCourses = 3,
		prerequisites = [[1, 2], [1, 0], [2, 0]],
		queries = [[1, 0], [1, 2]];
	const output = [true, true];
	const result = checkIfPrerequisite(numCourses, prerequisites, queries);
	expect(result).toEqual(output);
});

Deno.test("leet4", () => {
	const numCourses = 4,
		prerequisites = [[0, 1], [1, 2], [2, 3]],
		queries = [[0, 2], [0, 3]];
	const output = [true, true];
	const result = checkIfPrerequisite(numCourses, prerequisites, queries);
	expect(result).toEqual(output);
});
