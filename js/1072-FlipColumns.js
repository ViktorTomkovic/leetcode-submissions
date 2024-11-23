/**
* @param {number[][]} matrix
* @return {number}
*/
var maxEqualRowsAfterFlips = function(matrix) {
	let counter = {};
	for (let i = 0; i < matrix.length; i++) {
		if (matrix[i][0] == 1) {
			for (let j = 0; j < matrix[i].length; j++) {
				matrix[i][j] ^= 1;
			}
		}
		matrix[i] = matrix[i].join('');
		counter[matrix[i]] = (counter[matrix[i]] || 0) + 1;
	}
	return Math.max.apply(null, Object.values(counter));
};

var matrix;
matrix = [[0, 1], [1, 1]]; // 1
console.log(maxEqualRowsAfterFlips(matrix));

matrix = [[0, 1], [1, 0]]; // 2
console.log(maxEqualRowsAfterFlips(matrix));

matrix = [[0, 0, 0], [0, 0, 1], [1, 1, 0]]; // 2
console.log(maxEqualRowsAfterFlips(matrix));

