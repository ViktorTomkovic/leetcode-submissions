/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
const canMakeSubsequence = function (str1, str2) {
	let j = 0;
	const isNearby = (a, b) => {
		return (a == b) || (a + 1 == b) || (a - b == 25);
	};
	for (let i = 0; i < str1.length; i++) {
		if (isNearby(str1.charCodeAt(i), str2.charCodeAt(j))) {
			j++;
			if (j >= str2.length) return true;
		}
	}
	return false;
};

let str1, str2;
str1 = "abc", str2 = "ad";
console.log(canMakeSubsequence(str1,str2)); // true

str1 = "zc", str2 = "ad";
console.log(canMakeSubsequence(str1,str2)); // true

str1 = "ab", str2 = "d";
console.log(canMakeSubsequence(str1,str2)); // false

