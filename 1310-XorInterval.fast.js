/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
	const result = new Array(queries.length);
	const prefix = new Array(arr.length);
	prefix[0] = arr[0];
	for (let i = 1; i < arr.length; i++) {
		prefix[i] = prefix[i - 1] ^ arr[i];
	}
	console.log(prefix);
	for (let i = 0; i < queries.length; i++) {
		result[i] = arr[queries[i][0]] ^ prefix[queries[i][0]] ^ prefix[queries[i][1]];
	}
	return result;
}


//Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
//Output: [2,7,14,8]
var arr = [1, 3, 4, 8], queries = [[0, 1], [1, 2], [0, 3], [3, 3]];
console.log(xorQueries(arr, queries));


