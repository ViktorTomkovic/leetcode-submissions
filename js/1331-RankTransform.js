/**
* @param {number[]} arr
* @return {number[]}
*/
var arrayRankTransform = function(arr) {
	let orders = Array.from(new Array(arr.length).keys());
	orders.sort((a, b) => arr[a] - arr[b]);
	let currentRank = 1;
	let ranks = new Array(arr.length);
	ranks[orders[0]] = 1;
	let prev;
	let curr = arr[orders[0]];
	for (let i = 1; i < orders.length; i++) {
		prev = curr;
		curr = arr[orders[i]];
		if (prev !== curr) {
			currentRank++;
		}
		ranks[orders[i]] = currentRank;
	}
	return ranks;
};

var arr = [40, 10, 20, 30, 20];
console.log(arrayRankTransform(arr));

// Nice solution!
//var arrayRankTransform = function(arr) {
//var map = new Map();
//[...new Set(arr)].sort((a, b) => a - b).map((x, i) => map.set(x, i + 1));
//return arr.map((x) => map.get(x));
//};
