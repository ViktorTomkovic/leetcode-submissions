function maxMatrixSum(matrix: number[][]): number {
const { absSum, negCount, min } = matrix.reduce((acc, row) => {
		const { absSum, negCount, min } = row.reduce((acc, num) => ({
				absSum: acc.absSum + Math.abs(num),
				negCount: acc.negCount + (num < 0 ? 1 : 0),
				min: Math.min(acc.min, Math.abs(num))
		}), { absSum: 0, negCount: 0, min: Infinity });

		return {
				absSum: acc.absSum + absSum,
				negCount: acc.negCount + negCount,
				min: Math.min(acc.min, min)
		}
}, { absSum: 0, negCount: 0, min: Infinity })

	// this works because min = 0 in case of 0 existing in matrix
return (negCount % 2 === 0) ? absSum : absSum - (2 * min);
};

let matrix;
//matrix = [[1, -1], [-1, 1]];
//console.log(maxMatrixSum(matrix));
//
//matrix = [[1, 2, 3], [-1, -2, -3], [1, 2, 3]];
//console.log(maxMatrixSum(matrix));

matrix = [[-1, 0]];
console.log(maxMatrixSum(matrix));

