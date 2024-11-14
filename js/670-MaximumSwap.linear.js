/**
* @param {number} num
* @return {number}
*/
var maximumSwap = function(num) {
	if (num < 10) return num;
	if (num < 100) {
		const a = Math.floor(num / 10) % 10;
		const b = num % 10;
		return Math.max(10 * a + b, 10 * b + a);
	}
	let arr = [];
	const origNum = num;
	while (num > 0) {
		arr.push(num % 10);
		num = Math.floor(num / 10);
	}
	let lastDigit = new Array(arr.length).fill(arr.length);
	for (let i = arr.length - 1; i >= 0; i--) {
		lastDigit[arr[i]] = i;
	}
	for (let i = arr.length - 1; i >= 0; i--) {
		for (let j = 9; j > 0; j--) {
			if (j > arr[i] && lastDigit[j] < i) {
				const x = lastDigit[j];
				const y = arr[i];
				arr[i] = j;
				arr[x] = y;
				return arr.reduceRight((n, d) => n * 10 + d, 0);
			}
		}
	}
	return origNum;
};

var a = performance.now();
var num = 10;
console.log(maximumSwap(num));

var num = 7;
console.log(maximumSwap(num));

var num = 37;
console.log(maximumSwap(num));

var num = 87;
console.log(maximumSwap(num));

var num = 2736;
console.log(maximumSwap(num));

var num = 9973;
console.log(maximumSwap(num));

var num = 98368;
console.log(maximumSwap(num)); // 98863

var num = 279973;
console.log(maximumSwap(num));
/*
for (let i = 0; i < 100; i++) {
var num = 279973;
console.log(maximumSwap(num));
}
*/
var b = performance.now();
console.log(b - a);
