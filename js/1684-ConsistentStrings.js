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
		for (let i = 0; i < word.length; i++) {
			let c = word[i];
			if (!allowed.includes(c)) {
				return sum;
			}
		}
		return sum + 1;
	}
	return words.reduce(incIfConsistent, 0);
};

var allowed = "ab", words = ["ad","bd","aaab","baa","badab"];
console.log(countConsistentStrings(allowed, words));

allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"];
console.log(countConsistentStrings(allowed, words));

allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"];
console.log(countConsistentStrings(allowed, words));


