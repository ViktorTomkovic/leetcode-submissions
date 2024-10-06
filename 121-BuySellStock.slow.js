/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
	const n = prices.length;
	let max = 0;
	let oneDay = new Array(n-1).fill(0);
	for (let i = 0; i < n - 1; i++) {
		oneDay[i] = prices[i + 1] - prices[i];
	}
	max = Math.max(max, ...oneDay);
	let nextDay = oneDay.slice();

	for (var i = 1; i < n - 1; i++) {
		for (var j = 0; j < n - i - 1; j++) {
			nextDay[j] = nextDay[j] + oneDay[j + i];
		}
		nextDay = nextDay.slice(0, nextDay.length - 1);
		// console.log(nextDay);
		max = Math.max(max, ...nextDay);
	}
	return max;
};

var prices = [];

prices = [1, 2];
console.log(maxProfit(prices));

prices = [1, 4, 3, 4, 2];
console.log(maxProfit(prices));

