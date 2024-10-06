/**
* @param {string} s1
* @param {string} s2
* @return {boolean}
*/
var checkInclusion = function(s1, s2) {
	const A = "a".charCodeAt(0);
	const swl = s1.length;
	/**
	* @param {Array<number>} a
	* @returns {boolean}
	*/
	const isZeroDiff = (arr) => {
		for (let i = 0; i < 26; i++) {
			if (arr[i] != 0) return false;
		}
		return true;
	}
	let diff = new Array(26).fill(0);
	for (let i = 0; i < s1.length; i++) {
		diff[s1.charCodeAt(i) - A]--;
	}
	for (let i = 0; i < s1.length; i++) {
		diff[s2.charCodeAt(i) - A]++;
	}
	if (isZeroDiff(diff)) return true;
	let index = swl;
	while (index < s2.length) {
		diff[s2.charCodeAt(index) - A]++;
		diff[s2.charCodeAt(index - swl) - A]--;
		if (isZeroDiff(diff)) return true;
		index++;
	}
	return false;
};

var s1 = "adc", s2 = "dcda";
console.log(checkInclusion(s1, s2));

var s1 = "ab", s2 = "eidbaooo";
console.log(checkInclusion(s1, s2));

var s1 = "ab", s2 = "eidboaoo";
console.log(checkInclusion(s1, s2));

