/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function(words) {
	const indices = Array.from(new Array(words.length).keys()).sort((a, b) => words[a].localeCompare(words[b]));

	// common prefix with previous words
	const commonPrefixes = new Array(words.length).fill(0);
	for (var i = 1; i < indices.length; i++) {
		const curr = words[indices[i]];
		const prev = words[indices[i - 1]];
		let j = 0;
		while (j < prev.length && j < curr.length && prev[j] == curr[j]) j++;
		commonPrefixes[indices[i]] = j;
	}

	// score is sum of this words' length and common prefixes with other words and common prefixes with previous words which are counted beforehand
	const scores = new Array(words.length).fill(0);
	for (var i = 0; i < indices.length; i++) {
		const curr = words[indices[i]];
		scores[indices[i]] += curr.length;
		let commonPrefix = curr.length;
		let j = i + 1;
		let next = words[indices[j]];
		while (commonPrefix > 0 && j < indices.length) {
			commonPrefix = Math.min(commonPrefix, commonPrefixes[indices[j]]);
			scores[indices[i]] += commonPrefix;
			scores[indices[j]] += commonPrefix;
			j = j + 1;
			next = words[indices[j]];
		}
	}


	return scores;
};

var words = ["abc", "ab", "bc", "b"];
console.log(sumPrefixScores(words));

var words = ["abcd"];
console.log(sumPrefixScores(words));
import { lw, pw } from "2416-longInput";
var a1 = performance.now()
console.log(sumPrefixScores(lw));
var a2 = performance.now();
console.log(a2 - a1);

var a1 = performance.now()
console.log(sumPrefixScores(pw));
var a2 = performance.now();
console.log(a2 - a1);
