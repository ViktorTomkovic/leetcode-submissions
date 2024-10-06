/**
* @param {number} n
* @return {number[]}
*/
var lexicalOrder = function(n) {
	let l = Math.floor(Math.log10(n));
	let result = new Array();
	let number = 1;
	let base = 1;
	const generate = (f) => {
		if (f > n) {
			return;
		}
		result.push(f);
		number = f;
		base = 1;
		for (let k = 0; k < l; k++) {
			number *= 10;
			base *= 10;
			for (let d = 0; d < base; d++) {
				if (number + d > n) {
					return;
				}
				result.push(number + d);
			}
		}
	}
	for (let f = 1; f <= 9; f++) {
		generate(f);
	}
	return result;
};

console.log(lexicalOrder(13));
console.log(lexicalOrder(1));
console.log(lexicalOrder(26));
console.log(...lexicalOrder(136));
console.log(...lexicalOrder(3210));

