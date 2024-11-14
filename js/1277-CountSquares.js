/**
* @param {number[][]} matrix
* @return {number}
*/
var countSquares = function(matrix) {
	const rows = matrix.length;
	const columns = matrix[0].length;

	const dp = Array(columns).fill(0);
	/* diagonal is a previous "up" value */
	let diagonal = 0;
	let result = 0;
	const debug = [...Array(rows)].map(() => Array(columns).fill(0));
	for (let i = 0; i < rows; i++) {
		diagonal = 0;
		for (let j = 0; j < columns; j++) {
			if (matrix[i][j] == 0) { 
				dp[j] = 0;
				continue;
			}
			const left = (j > 0) ? dp[j-1] : 0;
			const up = (i > 0) ? dp[j] : 0;
			const count = Math.min(left, up, diagonal) + 1;
			dp[j] = count;
			result += count;
			debug[i][j] = count;
			diagonal = up;
		}
	}
	return result;
};

var matrix =
	[
		[0, 1, 1, 1],
		[1, 1, 1, 1],
		[0, 1, 1, 1]
	];
console.log(countSquares(matrix));
var matrix = [
	[1, 0, 1],
	[1, 1, 0],
	[1, 1, 0]
];
console.log(countSquares(matrix));
