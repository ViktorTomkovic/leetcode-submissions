/**
* @param {number} n
* @param {number} k
* @return {character}
*/
var findKthBit = function(n, k) {
	const findBit = (level, index) => {
		if (level == 1) {
			return false;
		}
		const middle = 1 << (level - 1);
		if (index == middle) {
			return true;
		}
		if (index < middle) {
			return findBit(level - 1, index);
		}
		const end = 1 << level;
		return !findBit(level, end - index);
	}
	return String(+findBit(n, k));
};

var n = 3, k = 1;
console.log(findKthBit(n, k));

var n = 4, k = 11;
console.log(findKthBit(n, k));

