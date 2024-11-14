/**
* @param {number[]} candidates
* @return {number}
*/
var largestCombination = function(candidates) {
	const bits = new Array(28).fill(0);
	for (const candidate of candidates) {
		let index = 0;
		let mask = 1;
		do {
			bits[index] += (candidate & mask) > 0;
			index++;
			mask = mask << 1;
		} while (mask <= candidate);
	}
	return Math.max(...bits);
};

var candidates;
candidates = [16, 17, 71, 62, 12, 24, 14];
console.log(largestCombination(candidates));

candidates = [8, 8];
console.log(largestCombination(candidates));
