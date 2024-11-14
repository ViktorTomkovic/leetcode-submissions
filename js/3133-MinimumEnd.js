/**
* @param {number} n
* @param {number} x
* @return {number}
*/
var minEnd = function(n, x) {
	n = n - 1;
	n = BigInt(n);
	x = BigInt(x);
	/** @param {BigInt} bit
	* @returns {BigInt}
	*/
	const mask = (bit) => 1n << bit;
	let nBit = 0n;
	let xBit = 0n;
	while (mask(nBit) <= n) {
		while ((mask(xBit) & x) > 0n) xBit++;
		console.log(...[n, x, nBit, xBit, mask(nBit), mask(xBit)]);
		x = x | (((n & mask(nBit)) >> nBit) << xBit);
		xBit++;
		nBit++;
	}
	return Number(x);
};

var n, x;
n = 6715154, x = 7193485;
console.log(minEnd(n, x));

n = 3, x = 2;
console.log(minEnd(n, x));

n = 3, x = 4;
console.log(minEnd(n, x));

n = 2, x = 7;
console.log(minEnd(n, x));

