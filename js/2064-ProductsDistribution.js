/**
* @param {number} n
* @param {number[]} quantities
* @return {number}
*/
var minimizedMaximum = function(n, quantities) {
	const canBeDistributed = (quantityPerStore) => {
		const storesNeeded = quantities.map(quantity => Math.ceil(quantity / quantityPerStore)).reduce((a, v) => a + v, 0);
		return storesNeeded <= n;
	}
	let left = 0;
	let right = Math.max.apply(null, quantities);
	let minQuantityPerStore = right;
	while (left <= right) {
		const mid = (left + right) >> 1;
		if (canBeDistributed(mid)) {
			minQuantityPerStore = mid;
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return minQuantityPerStore;
};

var n, quantities;
const start = performance.now();
n = 6, quantities = [11, 6];
console.log(minimizedMaximum(n, quantities));

n = 7, quantities = [15, 10, 10];
console.log(minimizedMaximum(n, quantities));

n = 1, quantities = [100000];
console.log(minimizedMaximum(n, quantities));

const end = performance.now();
console.log(end - start);

