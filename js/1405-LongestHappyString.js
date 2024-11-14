/**
* @param {number} a
* @param {number} b
* @param {number} c
* @return {string}
*/
var longestDiverseString = function(a, b, c) {
	const counts = [a, b, c];
	let letters = [0, 1, 2];
	let result = [];
	let i = 0;
	while (i < a + b + c) {
		letters = [0, 1, 2];
		letters.sort((letter1, letter2) => counts[letter2] - counts[letter1]);
		let candidate = letters[0];
		if (i > 1 && result[i - 1] == candidate && result[i - 2] == candidate) {
			if (counts[letters[1]] > 0) {
				candidate = letters[1];
			}
			else {
				break;
			}
		}
		result.push(candidate);
		counts[candidate]--;
		i++;
	}
	const A = "a".codePointAt(0);
	return result.reduce((str, currentValue) => str + String.fromCodePoint(A + currentValue), "");

};

var a = 1, b = 1, c = 7;
console.log(longestDiverseString(a, b, c));

var a = 7, b = 1, c = 0;
console.log(longestDiverseString(a, b, c));

