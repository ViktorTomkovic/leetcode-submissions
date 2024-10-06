/**
* @param {number} n
* @param {number} k
* @return {number}
*/
var findKthNumber = function(n, k) {
	var step = 1;
	var number = 1;
	//var numbers = new Array();
	while (step < k) {
		//numbers.push(number);
		if (number * 10 <= n) {
			step++;
			number = 10 * number;
		} else {
			while (number == n || number % 10 == 9) {
				number = Math.floor(number / 10);
			}
			step++;
			number++;
		}
	}
	//console.log(...numbers);
	return number;
};

//Input: n = 13, k = 2
//Output: 10
console.log(findKthNumber(13, 2));
//Input: n = 1, k = 1
//Output: 1
console.log(findKthNumber(1, 1));
console.log(findKthNumber(136, 40));
console.log(findKthNumber(1692778, 1545580));
console.log(findKthNumber(719885387, 209989719));
