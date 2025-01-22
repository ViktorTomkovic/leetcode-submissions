function finalPrices(prices: number[]): number[] {
	for (let i = 0; i < prices.length; i++) {
		let discount = 0;
		for (let j = i+1; j<prices.length; j++) {
			if (prices[j] <= prices[i]) {
				discount = prices[j];
				break;
			}
		}
		prices[i] -= discount;
	}
	return prices;
};

let prices;
prices = [8,4,6,2,3];
console.log(finalPrices(prices)); // [4,2,4,2,3]
prices = [1,2,3,4,5]
console.log(finalPrices(prices)); // [1,2,3,4,5]
prices = [10,1,1,6]
console.log(finalPrices(prices)); // [9,0,1,6]
