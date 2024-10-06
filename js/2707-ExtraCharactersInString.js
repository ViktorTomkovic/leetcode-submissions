//var array = require("lodash/array");
//console.log(array.concat('asdf', 'fda'));
/**
* @param {string} s
* @param {string[]} dictionary
* @return {number}
*/
var minExtraChar = function(s, dictionary) {
	class PrefixNode {
		/** @type {Map} */
		children = new Map();
		/** @type {boolean} */
		isWord = false;
		/** @type {string} don't hate me.. */
		//word = undefined;
	};
	/**
	 * @param {PrefixNode} node of a prefix tree
	 * @param {string} word we want to insert
	 * @return {void}
	 */
	const insertWord = (node, word) => {
		for (let letter of word) {
			if (node.children.has(letter)) {
				node = node.children.get(letter);
			} else {
				var newNode = new PrefixNode();
				node.children.set(letter, newNode);
				node = newNode;
			}
		}
		node.isWord = true;
		//node.word = word;
	}
	/**
	 * @param {PrefixNode} node from which we output all words in subtree
	 * @param {array} buffer buffer of output words
	 */
	//const writeAllWords = (node, buffer) => {
	//	if (!node) return;
	//	if (node.isWord) buffer.push(node.word);
	//	for (child of node.children.values()) writeAllWords(child, buffer);
	//}
	let root = new PrefixNode();
	for (let word of dictionary) insertWord(root, word);
	//let buffer = new Array();
	//writeAllWords(root, buffer);
	let memoize = new Array(s.length + 1);
	memoize[s.length] = 0;
	/**
	 * @param {number} index computing for substring s[index:s.length]
	 * @return {number} min value of extra spaces
	 */
	const minExtraCharSubstring = (index) => {
		if (memoize[index] !== undefined) {
			return memoize[index];
		}
		let result = 1 + minExtraCharSubstring(index + 1)
		let node = root;
		for (let j = index; j < s.length; j++) {
			if (!node.children.has(s[j])) {
				break;
			}
			node = node.children.get(s[j]);
			if (node.isWord) {
				result = Math.min(result, minExtraCharSubstring(j + 1));
			}
		}
		memoize[index] = result;
		return memoize[index];
	}
	minExtraCharSubstring(0);
	//console.log(buffer);
	return memoize[0];
};

var s = "leetscode", dictionary = ["leet", "code", "leetcode"];
console.log(minExtraChar(s, dictionary));

var s = "sayhelloworld", dictionary = ["hello", "world"];
console.log(minExtraChar(s, dictionary));

