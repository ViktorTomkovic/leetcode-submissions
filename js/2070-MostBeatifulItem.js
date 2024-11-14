/**
* @param {number[][]} items
* @param {number[]} queries
* @return {number[]}
*/
var maximumBeauty = function(items, queries) {
	items.push([0, 0]);
	items.push([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
	items.sort((a, b) => {
		if (a[0] == b[0]) {
			return a[1] - b[1];
		}
		return a[0] - b[0];
	});
	for (let i = 1; i < items.length; i++) {
		items[i][1] = Math.max(items[i - 1][1], items[i][1]);
	};
	console.log(items);
	const maxBueatyForPrice = (query, left, right) => {
		// console.log(query, left, right);
		let index = Math.floor((left + right) / 2);
		if (items[index][0] <= query && query < items[index + 1][0]) {
			return items[index][1];
		} else if (items[index][0] > query) {
			return maxBueatyForPrice(query, left, index);
		} else {
			return maxBueatyForPrice(query, index, right);
		}
	};
	const result = new Array(queries);
	for (let i = 0; i < queries.length; i++) {
		result[i] = maxBueatyForPrice(queries[i], 0, items.length - 1);
	}
	return result;
};

var items, queries;

//items = [[1, 2], [3, 2], [2, 4], [5, 6], [3, 5]], queries = [1, 2, 3, 4, 5, 6]; // output: [2,4,5,5,6,6]
//console.log(maximumBeauty(items, queries));
//
//items = [[1, 2], [1, 2], [1, 3], [1, 4]], queries = [1]; // output: [4]
//console.log(maximumBeauty(items, queries));
//
//items = [[10, 1000]], queries = [5]; // output: [0]
//console.log(maximumBeauty(items, queries));

items = [[193, 732], [781, 962], [864, 954], [749, 627], [136, 746], [478, 548], [640, 908], [210, 799], [567, 715], [914, 388], [487, 853], [533, 554], [247, 919], [958, 150], [193, 523], [176, 656], [395, 469], [763, 821], [542, 946], [701, 676]];
queries = [885, 1445, 1580, 1309, 205, 1788, 1214, 1404, 572, 1170, 989, 265, 153, 151, 1479, 1180, 875, 276, 1584];
console.log(maximumBeauty(items, queries));
// [962,962,962,962,746,962,962,962,946,962,962,919,746,746,962,962,962,919,962]
