/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
	let profit = 0;
	let min = prices[0];
	for (let i = 0; i < prices.length; i++) {
		if (prices[i] < min) {
			min = prices[i];
		} else {
			profit = Math.max(profit, prices[i] - min);
		}
	}
	return profit;
};

var prices = [];

prices = [1, 2];
console.log(maxProfit(prices));

prices = [1, 4, 3, 4, 2];
console.log(maxProfit(prices));

