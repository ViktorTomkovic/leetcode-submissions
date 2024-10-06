/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
	const buckets = new Uint16Array(citations.length + 1);
	for (let i = 0; i< buckets.length; i++) {
		buckets[i] = 0;
	}
	for (let i = 0; i< citations.length; i++) {
		citations[i] > citations.length ? buckets[citations.length]++ : buckets[citations[i]]++;
	}
	let sum = 0;
	let i = buckets.length - 1;
	do {
		sum += buckets[i];
		if (sum >= i) {
			break;
		}
		i--;
	} while (i >= 0);
	return i;
};

var a = [3, 0, 6, 1, 5];
console.log(hIndex(a));

var a = [0];
console.log(hIndex(a));

var a = [1];
console.log(hIndex(a));

var a = [1,3,1];
console.log(hIndex(a));

