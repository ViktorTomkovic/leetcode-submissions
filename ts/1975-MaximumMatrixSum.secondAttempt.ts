function maxMatrixSum(matrix: number[][]): number {
	let min = Number.MAX_SAFE_INTEGER;
	let sum = 0;
	let sumNegative = 0;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			sumNegative += Number(matrix[i][j] < 0);
			sum += Math.abs(matrix[i][j]);
			min = Math.min(min, Math.abs(matrix[i][j]));
		}
	}
	sum -= (sumNegative & 1) * (min << 1);
	return sum;
}

let matrix;
matrix = [[1, -1], [-1, 1]];
console.log(maxMatrixSum(matrix));

matrix = [[1, 2, 3], [-1, -2, -3], [1, 2, 3]];
console.log(maxMatrixSum(matrix));

matrix = [[0, -1]];
console.log(maxMatrixSum(matrix));

