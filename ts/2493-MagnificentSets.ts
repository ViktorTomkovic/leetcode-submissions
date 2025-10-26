import { expect } from "jsr:@std/expect";
function magnificentSets(n: number, edges: number[][]): number {
	const nodes = new Array(n).fill(null).map((_, i) => i + 1);
	n = n + 1;
	const outvertices: number[][] = Array.from({ length: n }, () => new Array(0));
	for (const [from, to] of edges) {
		outvertices[from].push(to);
		outvertices[to].push(from);
	}
	let kGroup = 0;
	for (let k = 1; k < n; k++) {
		const color = new Array(n).fill(0);
		let group = 1;
		//console.log(nodes);
		for (const i of nodes) {
			//console.log(color);
			if (color[i] > 0) {
				continue;
			}
			let cLayer = [i];
			let nLayer = [];
			color[i] = group;
			group++;
			let groupFreeze = false;
			while (cLayer.length > 0) {
				//console.log(cLayer);
				for (const node of cLayer) {
					const neighbors = outvertices[node].filter((v) => color[v] == 0);
					//console.log(neighbors);
					for (const nei of neighbors) {
						if (color[nei] > 0 && group - color[nei] > 1) {
							//console.log(group, nei, color);
							return -1;
						}
						if (color[nei] == 0) {
							if (!groupFreeze) {
								groupFreeze = true;
								//group++;
							}
							nLayer.push(nei);
							color[nei] = group;
						}
					}
				}
				cLayer = nLayer;
				nLayer = [];
				if (groupFreeze) {
					group++;
				}
				if (cLayer.length > 0) {
					groupFreeze = false;
				}
			}
		}
		for (let i = 1; i < n; i++) {
			if (outvertices[i].some((v) => color[v] == color[i])) {
				return -1;
			}
		}
		kGroup = Math.max(kGroup, group);
		const element = nodes.shift()!;
		nodes.push(element);
	}
	return kGroup - 1;
}

Deno.test("leet1", () => {
	const n = 6, edges = [[1, 2], [1, 4], [1, 5], [2, 6], [2, 3], [4, 6]];
	const output = 4;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet2", () => {
	const n = 3, edges = [[1, 2], [2, 3], [3, 1]];
	const output = -1;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet3", () => {
	const n = 92,
		edges = [
			[67, 29],
			[13, 29],
			[77, 29],
			[36, 29],
			[82, 29],
			[54, 29],
			[57, 29],
			[53, 29],
			[68, 29],
			[26, 29],
			[21, 29],
			[46, 29],
			[41, 29],
			[45, 29],
			[56, 29],
			[88, 29],
			[2, 29],
			[7, 29],
			[5, 29],
			[16, 29],
			[37, 29],
			[50, 29],
			[79, 29],
			[91, 29],
			[48, 29],
			[87, 29],
			[25, 29],
			[80, 29],
			[71, 29],
			[9, 29],
			[78, 29],
			[33, 29],
			[4, 29],
			[44, 29],
			[72, 29],
			[65, 29],
			[61, 29],
		];
	const output = 57;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet4a", () => {
	const n = 5, edges = [[1, 2]];
	const output = 5;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet4b", () => {
	const n = 5, edges = [[1, 2], [3, 2], [4, 2], [5, 2]];
	const output = 3;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet4c", () => {
	const n = 3, edges = [[1, 2], [3, 2]];
	const output = 3;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet4d", () => {
	const n = 6, edges = [[1, 2], [3, 2], [4, 2], [5, 2], [6, 2]];
	const output = 3;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet4e", () => {
	const n = 7, edges = [[1, 2], [3, 2], [4, 2], [5, 2], [6, 2]];
	const output = 4;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});

Deno.test("leet5", () => {
	const n = 430,
		edges = [
			[316, 360],
			[236, 101],
			[236, 100],
			[282, 102],
			[193, 176],
			[253, 60],
			[372, 42],
			[223, 214],
			[62, 113],
			[257, 374],
			[74, 289],
			[368, 405],
			[200, 302],
			[259, 212],
			[281, 101],
			[91, 167],
			[109, 268],
			[194, 121],
			[93, 412],
			[11, 139],
			[308, 324],
			[11, 409],
			[366, 110],
			[366, 390],
			[236, 34],
			[282, 240],
			[379, 199],
			[93, 394],
			[87, 288],
			[141, 28],
			[76, 49],
			[146, 204],
			[172, 3],
			[20, 140],
			[59, 240],
			[203, 374],
			[26, 152],
			[429, 49],
			[59, 289],
			[74, 312],
			[387, 217],
			[47, 4],
			[427, 19],
			[130, 408],
			[242, 101],
			[429, 247],
			[76, 1],
			[248, 134],
			[35, 358],
			[342, 337],
			[347, 337],
			[106, 303],
			[276, 67],
			[239, 355],
			[129, 284],
			[291, 386],
			[263, 329],
			[256, 152],
			[321, 114],
			[279, 394],
			[118, 228],
			[53, 44],
			[237, 104],
			[210, 155],
			[344, 111],
			[291, 245],
			[6, 400],
			[90, 114],
			[137, 428],
			[69, 251],
			[256, 32],
			[50, 362],
			[401, 254],
			[156, 214],
			[37, 192],
			[146, 8],
			[194, 176],
			[395, 140],
			[208, 107],
			[18, 103],
			[366, 135],
			[88, 317],
			[90, 294],
			[335, 331],
			[326, 306],
			[258, 155],
			[210, 3],
			[185, 411],
			[175, 33],
			[64, 167],
			[2, 125],
			[88, 371],
			[413, 275],
			[263, 312],
			[397, 142],
			[90, 134],
			[93, 81],
			[90, 139],
			[263, 396],
			[257, 273],
			[338, 303],
			[18, 169],
			[195, 44],
			[232, 382],
			[36, 86],
			[290, 128],
			[359, 180],
			[258, 280],
			[50, 302],
			[151, 430],
			[381, 84],
			[239, 81],
			[313, 115],
			[45, 331],
			[185, 408],
			[53, 270],
			[363, 251],
			[41, 404],
			[315, 337],
			[71, 168],
			[210, 170],
			[146, 3],
			[322, 135],
			[76, 383],
			[41, 67],
			[315, 399],
			[424, 105],
			[83, 417],
			[88, 67],
			[189, 399],
			[203, 214],
			[384, 336],
			[147, 219],
			[145, 298],
			[290, 272],
			[342, 170],
			[185, 3],
			[424, 65],
			[198, 340],
			[209, 332],
			[357, 97],
			[175, 103],
			[147, 181],
			[195, 131],
			[22, 188],
			[80, 350],
			[27, 360],
			[112, 268],
			[194, 346],
			[309, 288],
			[118, 402],
			[315, 419],
			[353, 299],
			[368, 345],
			[379, 46],
			[378, 204],
			[185, 33],
			[112, 238],
			[365, 296],
			[300, 174],
			[137, 216],
			[87, 358],
			[59, 179],
			[93, 92],
			[429, 270],
			[41, 243],
			[248, 81],
			[413, 101],
			[74, 235],
			[300, 408],
			[129, 360],
		];
	const output = 393;
	const result = magnificentSets(n, edges);
	expect(result).toEqual(output);
});
