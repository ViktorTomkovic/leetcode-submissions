/**
* @param {number[]} code
* @param {number} k
* @return {number[]}
*/
var decrypt = function(code, k) {
	if (k > 0) {
		const output = [];
		let sum = 0;
		for (let i = 1; i <= k; i++) {
			sum += code[i];
		}
		for (let i = 1; i <= code.length; i++) {
			output.push(sum);
			sum -= code[i];
			sum += code[(i + k) % code.length];
		}
		return output;
	} else if (k < 0) {
		const output = [];
		let sum = 0;
		for (let i = 1; i <= Math.abs(k); i++) {
			sum += code.at(-i);
		}
		for (let i = 0; i < code.length; i++) {
			output.push(sum);
			sum -= code.at(i + k);
			sum += code.at(i);
		}
		return output;
	} else {
		return code.map(() => 0);
	}
};

var code, k;
code = [5, 7, 1, 4], k = 3;
console.log(decrypt(code, k));

code = [1, 2, 3, 4], k = 0;
console.log(decrypt(code, k));

code = [2, 4, 9, 3], k = -2;
console.log(decrypt(code, k));

