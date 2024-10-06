/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function(s1, s2) {
	let un1 = new Map();
	let un2 = new Map();
	let words = s1.split(' ');
	let words2 = s2.split(' ');
	for (let i = 0; i < words1.length; i++) {
		if (un1.has(words1[i])) {
			un1.set(words1[i], un1.get(words1[i] + 1));
		} else {
			un1.set(words1[i], 1);
		};
	};
	for (let i = 0; i < words2.length; i++) {
		if (un2.has(words2[i])) {
			un2.set(words2[i], un2.get(words1[i] + 1));
		} else {
			un2.set(words2[i], 1);
		};
	};

};
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

