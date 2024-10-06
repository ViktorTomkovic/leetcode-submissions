var canCompleteCircuit = function(gas, cost) {
	let total = 0, cur = 0, start = 0
	for (let i = 0; i < gas.length; i++) {
		const net = gas[i] - cost[i]
		total += net
		cur += net
		if (cur < 0) {
			start = i + 1
			cur = 0
		}
	}
	// Observations I didn't make..
	// - Observation 1: one can only finish a journey if and only if `total` is non-negative
	// - Observation 2: if `total` is non-negative there has to be at least one station with a positive `net` (important for setting `start`
	return total < 0 ? -1 : start;
};

var gas = [1, 2, 3, 4, 5, 5, 3], cost = [2, 3, 4, 3, 9, 6, 2];
console.log(canCompleteCircuit(gas, cost));

