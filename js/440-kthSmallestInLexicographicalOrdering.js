/**
* @param {number} n
* @param {number} k
* @return {number}
*/
var findKthNumber = function(n, k) {
	const countBelow = (currentNumber) => {
		let cn = 10 * currentNumber;
		let rn = 10 * (currentNumber + 1);
		let count = 0;
		while (cn <= n) {
			rn = Math.min(rn, n + 1);
			count += rn - cn;
			cn *= 10;
			rn *= 10;
		};
		return count;
	}
	var step = 1;
	var number = 1;
	//var numbers = new Array();
	while (step < k) {
		var stepsBelow = countBelow(number);
		//numbers.push([number, stepsBelow, step]);
		if (step + stepsBelow >= k) {
			// go down - kth element is down there
			number *= 10;
		} else {
			// go right - kth element is not below
			number++;
			step += stepsBelow;
		}
		// we made a step
		step++;
	}
	//console.log(...numbers);
	return number;
};

//Input: n = 13, k = 2
//Output: 10
console.log(findKthNumber(13, 2));
console.log(findKthNumber(100, 3));
//Input: n = 1, k = 1
//Output: 1
console.log(findKthNumber(1, 1));
console.log(findKthNumber(136, 40));
console.log(findKthNumber(1692778, 1545580));
console.log(findKthNumber(719885387, 209989719));
