/**
* @param {number} n
* @param {number[]} quantities
* @return {number}
*/
var minimizedMaximum = function(n, quantities) {
	const canBeDistributed = (stores, quantityPerStore) => {
		for (let i = 0; i < quantities.length; i++) {
			stores -= Math.ceil(quantities[i] / quantityPerStore);
			if (stores < 0) return false;
		}
		return true;
	}
	let left = 0;
	let right = Math.max.apply(null, quantities);
	while (left <= right) {
		const mid = left + ((right - left) >> 1);
		if (canBeDistributed(n, mid)) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return left;
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

