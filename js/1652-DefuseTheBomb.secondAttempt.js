/**
* @param {number[]} code
* @param {number} k
* @return {number[]}
*/
var decrypt = function(code, k) {
	const output = [];
	let sum = 0;
	const sign = Math.sign(k);
	const J = Math.min(0, k);
	for (let i = J; i < Math.max(0, k); i++) {
		sum += code.at(i);
	}
	for (let i = 0 + J; i < code.length + J; i++) {
		output.push(sum);
		sum -= code.at(i);
		sum += code.at(i + k);
	}
	return output;
};

var code, k;
code = [5, 7, 1, 4], k = 3;
console.log(decrypt(code, k));

code = [1, 2, 3, 4], k = 0;
console.log(decrypt(code, k));

code = [2, 4, 9, 3], k = -2;
console.log(decrypt(code, k));

