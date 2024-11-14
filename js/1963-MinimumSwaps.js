/**
* @param {string} s
* @return {number}
*/
var minSwaps = function(s) {
	let swaps = 0;
	let left = 0;
	let right = s.length - 1;
	let diff = 0;
	while (left < right) {
		diff = s[left] == "[" ? diff + 1 : diff - 1;
		if (diff == -1) {
			while (s[right] != "[") {
				right--;
			}
			diff = 1;
			swaps++;
		}
		left++;
	}
	return swaps;
};

var s = "][][";
console.log(minSwaps(s));

var s = "]]][[[";
console.log(minSwaps(s));

var s = "";
console.log(minSwaps(s));

var s = "][[]][][[][]";
console.log(minSwaps(s));

var s = "][";
console.log(minSwaps(s));

var s = "[[][][]]][";
console.log(minSwaps(s));

