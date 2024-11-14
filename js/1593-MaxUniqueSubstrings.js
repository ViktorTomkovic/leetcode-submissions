/**
* @param {string} s
* @return {number}
*/
var maxUniqueSplit = function(s) {
	let chosenSubstrings = [];
	/**
	 * @param {number} startingIndex starting index of substring s[i:length(s)]
	 * @returns {number} number of maximum number of split for substring s[i:length(s)]
	 */
	const maxSubstrings = (startingIndex) => {
		if (startingIndex >= s.length) {
			return 0;
		}
		let result = 0;
		for (let endingIndex = startingIndex + 1; endingIndex <= s.length; endingIndex++) {
			const chosenThisTime = s.substring(startingIndex, endingIndex);
			if (chosenSubstrings.some(substring => substring == chosenThisTime)) {
				continue;
			}
			chosenSubstrings.push(chosenThisTime);
			result = Math.max(result, 1 + maxSubstrings(endingIndex));
			chosenSubstrings.pop();
		}
		return result;
	}
	return maxSubstrings(0);
};

var s = "ababccc";
console.log(maxUniqueSplit(s));

var s = "aba";
console.log(maxUniqueSplit(s));

var s = "aa";
console.log(maxUniqueSplit(s));

var s = "abcaaaa";
console.log(maxUniqueSplit(s));

