function maxMatrixSum(matrix: number[][]): number {
	let min = Number.MAX_SAFE_INTEGER;
	let sum = 0;
	let sumNegative = 0;
	let containsZero = false;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] == 0) {
				containsZero = true;
			} else if (matrix[i][j] < 0) {
				sumNegative++;
				sum -= matrix[i][j];
				min = Math.min(min, -matrix[i][j]);
			} else {
				sum += matrix[i][j];
				min = Math.min(min, matrix[i][j]);
			}
		}
	}
	if (!containsZero && (sumNegative & 1)) {
		return sum - (min << 1);
	}
	return sum;
}

let matrix;
matrix = [[1, -1], [-1, 1]];
console.log(maxMatrixSum(matrix));

matrix = [[1, 2, 3], [-1, -2, -3], [1, 2, 3]];
console.log(maxMatrixSum(matrix));
