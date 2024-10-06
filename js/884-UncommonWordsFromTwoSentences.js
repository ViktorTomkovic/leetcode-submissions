/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function(s1, s2) {
	let un = new Map();
	let words = s1.split(" ");
	let words2 = s2.split(" ");
	for (let i = 0; i < words2.length; i++) {
		words.push(words2[i]);
	}
	for (let i = 0; i < words.length; i++) {
		if (un.has(words[i])) {
			un.set(words[i], un.get(words[i] + 1));
		} else {
			un.set(words[i], 1);
		};
	};

	let result = new Array();
	for (const [word, count] of un.entries()) {
		if (count == 1) {
			result.push(word);
		}
	};
	return result;
};
var s1 = "this apple is sweet", s2 = "this apple is sour";
console.log(uncommonFromSentences(s1, s2));
var s1 = "apple apple", s2 = "banana";
console.log(uncommonFromSentences(s1, s2));
/*
 884. Uncommon Words from Two Sentences

A sentence is a string of single-space separated words where each word consists only of lowercase letters.

A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Given two sentences s1 and s2, return a list of all the uncommon words. You may return the answer in any order.

 

Example 1:

Input: s1 = "this apple is sweet", s2 = "this apple is sour"

Output: ["sweet","sour"]

Explanation:

The word "sweet" appears only in s1, while the word "sour" appears only in s2.

Example 2:

Input: s1 = "apple apple", s2 = "banana"

Output: ["banana"]

 

Constraints:

		1 <= s1.length, s2.length <= 200
		s1 and s2 consist of lowercase English letters and spaces.
		s1 and s2 do not have leading or trailing spaces.
		All the words in s1 and s2 are separated by a single space.

 */

