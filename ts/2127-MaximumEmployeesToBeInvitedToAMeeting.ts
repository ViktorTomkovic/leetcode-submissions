import { expect } from "jsr:@std/expect";
function maximumInvitations(favorite: number[]): number {
	const indegree = new Array(favorite.length).fill(0);
	for (let i = 0; i < favorite.length; i++) {
		indegree[favorite[i]]++;
	}
	const q: number[] = [];
	for (let i = 0; i < indegree.length; i++) {
		if (indegree[i] == 0) {
			q.push(i);
		}
	}
	const depth = new Array(favorite.length).fill(1);
	while (q.length > 0) {
		const c = q.shift()!;
		const next = favorite[c];
		depth[next] = Math.max(depth[next], depth[c] + 1);
		indegree[next]--;
		if (indegree[next] == 0) {
			q.push(next);
		}
	}
	let longestCycle = 0;
	let twoCycle = 0;
	for (let i = 0; i < favorite.length; i++) {
		if (indegree[i] != 0) {
			let currentCycle = 0;
			let c = i;
			while (indegree[c] != 0) {
				indegree[c] = 0; // Mark as visited
				c = favorite[c];
				currentCycle++;
			}
			if (currentCycle == 2) {
				twoCycle += depth[i] + depth[favorite[i]];
			} else {
				longestCycle = Math.max(longestCycle, currentCycle);
			}
		}
	}
	return Math.max(longestCycle, twoCycle);
}

Deno.test("leet1", () => {
	const favorite = [2, 2, 1, 2];
	const output = 3;
	const result = maximumInvitations(favorite);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const favorite = [3, 0, 1, 4, 1];
	const output = 4;
	const result = maximumInvitations(favorite);
	expect(result).toEqual(output);
});

Deno.test("leet3", () => {
	const favorite = [1, 2, 0];
	const output = 3;
	const result = maximumInvitations(favorite);
	expect(result).toEqual(output);
});

Deno.test("leet4", () => {
	const favorite = [1, 0, 0, 2, 1, 4, 7, 8, 9, 6, 7, 10, 8];
	const output = 6;
	const result = maximumInvitations(favorite);
	expect(result).toEqual(output);
});
