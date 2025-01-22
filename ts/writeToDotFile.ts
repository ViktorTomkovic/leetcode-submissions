export const writeUndirectedGraph = (name: string, edges: number[][]): void => {
	const result: string[] = [];
	result.push('graph "' + name + '" {');
	result.push('graph [fontname = "DejaVu Sans Mono"];');
	result.push('node [fontname = "DejaVu Sans Mono"];');
	result.push('edge [fontname = "DejaVu Sans Mono"];');

	const formattedEdges = edges.toSorted((e1, e2) => {
		if (e1[0] == e2[0]) {
			return e1[1] < e2[1] ? -1 : 1;
		}
		return e1[0] < e2[0] ? -1 : 1;
	}).map((edge) => '"' + edge[0] + '" -- "' + edge[1] + '"');
	result.push(...formattedEdges);
	result.push("}");

	Deno.writeFileSync(
		"./" + name + ".dot",
		new TextEncoder().encode(result.join("\n")),
	);
};
