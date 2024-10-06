/**
* @param {number} n
* @return {number[]}
*/
var lexicalOrder = function(n) {
	let result = [];
	let number = 1;
	while (result.length < n) {
		result.push(number);
		if (number * 10 <= n) {
			number *= 10;
		} else {
			// if number % 10 == 9 go back
			while (number == n || number % 10 == 9) {
				number = Math.floor(number / 10);
			}
			// else
			number += 1;
		}
	}
	return result;
};

console.log(lexicalOrder(13));
console.log(lexicalOrder(1));
console.log(lexicalOrder(26));
console.log(...lexicalOrder(136));
console.log(...lexicalOrder(3210));

