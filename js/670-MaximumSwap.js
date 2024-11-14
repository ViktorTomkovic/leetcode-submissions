/**
* @param {number} num
* @return {number}
*/
var maximumSwap = function(num) {
	const max = (currentMax, arr, i, j) => {
		const x = arr[i];
		const y = arr[j];
		arr[i] = y;
		arr[j] = x;
		const newNumber = arr.reduce((n, d) => n * 10 + d, 0);
		const result = Math.max(currentMax, newNumber);
		arr[i] = x;
		arr[j] = y;
		return result;
	}
	if (num < 10) return num;
	let maxNumber = num;
	let arr = [];
	while (num > 0) {
		arr.push(num % 10);
		num = Math.floor(num / 10);
	}
	arr.reverse();

	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			maxNumber = max(maxNumber, arr, i, j);
		}
	}
	return maxNumber;
};

var num = 10;
console.log(maximumSwap(num));

var num = 2736;
console.log(maximumSwap(num));

var num = 9973;
console.log(maximumSwap(num));

var num = 279973;
console.log(maximumSwap(num));
