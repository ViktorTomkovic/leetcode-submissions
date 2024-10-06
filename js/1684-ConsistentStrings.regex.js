/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function(allowed, words) {
	/**
	 * @param {string} allowed
	 * @param {string} word
	 */
	const incIfConsistent = (sum, word) => {
		if (word.match('^[' + allowed + ']+$')) {
			sum++;
		}
		return sum;
	}
	return words.reduce(incIfConsistent, 0);
};

var allowed = "ab";
var words = ["ad","bd","aaab","baa","badab"];
console.log(countConsistentStrings(allowed, words));

