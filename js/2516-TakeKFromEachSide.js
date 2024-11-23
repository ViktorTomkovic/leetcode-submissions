/**
* @param {string} s
* @param {number} k
* @return {number}
*/
var takeCharacters = function(s, k) {
	let counterLeft = { 'a': 0, 'b': 0, 'c': 0 };
	let counterRight = { 'a': 0, 'b': 0, 'c': 0 };
	const isTaken = () => {
		return ((counterLeft['a'] + counterRight['a']) >= k &&
			(counterLeft['b'] + counterRight['b']) >= k &&
			(counterLeft['c'] + counterRight['c']) >= k);
	}
	let isPossible = false;
	let left = 0;
	let right = s.length;
	for (; left < s.length; left++) {
		counterLeft[s[left]]++;
		if (isTaken()) {
			isPossible = true;
			break;
		}
	}
	if (!isPossible) {
		return -1;
	}
	let minCount = left + 1;
	//console.log(s.length);
	//console.log('=', left, right, counterLeft, counterRight, minCount);
	while (left >= 0 && right >= 0) {
		while (left >= 0 && isTaken()) {
			counterLeft[s[left]]--;
			left--;
		}
		const countLeft = (left + 1 + 1) + (s.length - right);
		minCount = Math.min(minCount, countLeft);
		//console.log('-', left, right, counterLeft, counterRight, countLeft, minCount);
		while (right >= 0 && !isTaken()) {
			right--;
			counterRight[s[right]]++;
		}
		const countRight = (left + 1) + (s.length - right);
		minCount = Math.min(minCount, countRight);
		//console.log('+', left, right, counterLeft, counterRight, countRight, minCount);
	}
	return minCount;
};

var s, k;
s = "aabaaaacaabc", k = 2;
console.log(takeCharacters(s, k));

s = "a", k = 1;
console.log(takeCharacters(s, k));

