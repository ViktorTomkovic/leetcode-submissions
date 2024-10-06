/**
* @param {string[]} words
* @return {number[]}
*/
var sumPrefixScores = function(words) {
	const wordCount = words.length;
	const sortedIndices = Array.from(Array(wordCount).keys())
		.sort((a, b) => words[a].localeCompare(words[b]));

	const commonPrefixLengths = calculateCommonPrefixLengths(words, sortedIndices);
	const scores = calculateScores(words, sortedIndices, commonPrefixLengths);
	return scores;
};

/**
* @param {string[]} words
* @param {number[]} sortedIndices
* @return {number[]}
*/
function calculateCommonPrefixLengths(words, sortedIndices) {
	const commonPrefixLengths = new Array(words.length).fill(0);
	for (let i = 1; i < words.length; i++) {
		const prevWord = words[sortedIndices[i - 1]];
		const currWord = words[sortedIndices[i]];
		let commonLength = 0;
		while (commonLength < prevWord.length &&
			commonLength < currWord.length &&
			prevWord[commonLength] === currWord[commonLength]) {
			commonLength++;
		}
		commonPrefixLengths[i] = commonLength;
	}
	return commonPrefixLengths;
}

/**
* @param {string[]} words
* @param {number[]} sortedIndices
* @param {number[]} commonPrefixLengths
* @return {number[]}
*/
function calculateScores(words, sortedIndices, commonPrefixLengths) {
	const scores = new Array(words.length).fill(0);
	for (let i = 0; i < sortedIndices.length; i++) {
		const wordIndex = sortedIndices[i];
		const wordLength = words[wordIndex].length;
		scores[wordIndex] += wordLength;
		let j = i + 1;
		let commonLength = wordLength;
		while (j < words.length) {
			commonLength = Math.min(commonLength, commonPrefixLengths[j]);
			if (commonLength === 0) {
				break;
			}
			scores[wordIndex] += commonLength;
			scores[sortedIndices[j]] += commonLength;
			j++;
		}
	}
	return scores;
}
//KDS Appraoch 1
//

var words = ["a", "abc", "ab", "bc", "b"];
console.log(sumPrefixScores(words));

