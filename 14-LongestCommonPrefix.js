/**
* @param {string[]} strs
* @return {string}
*/
var longestCommonPrefix = function(strs) {
	strs.sort();
	for (let i = 0; i < strs[0].length; i++) {
		if (strs[0][i] != strs[strs.length-1][i]) {
			return strs[0].slice(0, i);
		}
	}
	return strs[0];
};
var longestCommonPrefix2 = function(strs) {
	let index = strs[0].length;
	for (let str of strs) {
		index = Math.min(index, str.length);
		for (let i = 0; i < index; i++) {
			if (strs[0][i] != str[i]) {
				index = i;
				continue;
			}
		}
	}
	return strs[0].slice(0, index);
};

var strs = ["flower", "flow", "flight"]
console.log(longestCommonPrefix(strs));

var strs = ["dog", "racecar", "car"]
console.log(longestCommonPrefix(strs));
