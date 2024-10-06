/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function(words) {
	class PrefixNode {
		score = 0;
		children = new Map();
	}
	/**
	 * @param {PrefixNode} node
	 * @param {string} word
	 */
	function insert(node, word) {
		for (let i = 0; i < word.length; i++) {
			if (!node.children.has(word[i])) {
				node.children.set(word[i], new PrefixNode());
			}
			node = node.children.get(word[i]);
			node.score++;
		}
	}
	/**
	 * @param {PrefixNode} node
	 * @param {string} prefix
	 */
	function countScore(node, prefix) {
		let result = 0;
		let i = 0;
		while ((i < prefix.length) && (node !== undefined)) {
			node = node.children.get(prefix[i]);
			result += node.score;
			i++;
		}
		return result;
	}
	/**
	 * @param {PrefixNode} node
	 * @param {object[]} buffer
	 */
	//const print = (node, buffer) => {
	//	buffer.push(node.score);
	//	for (const [letter, child] of node.children.entries()) {
	//		buffer.push(letter);
	//		print(child, buffer);
	//	}
	//}
	let result = new Uint16Array(words.length);
	let root = new PrefixNode();
	for (let i = 0; i < words.length; i++) 
		insert(root, words[i]);
	
	//let buffer = [];
	//print(root, buffer);
	//console.log(buffer);
	for (let i = 0; i < words.length; i++) 
		result[i] = (countScore(root, words[i]));
	

	return result;
};

var words = ["abc", "ab", "bc", "b"];
console.log(sumPrefixScores(words));

var words = ["abcd"];
console.log(sumPrefixScores(words));
//import { lw, pw } from "2416-longInput";
var a1 = performance.now()
//console.log(sumPrefixScores(lw));
var a2 = performance.now();
console.log(a2 - a1);
//var words = ["bfiaaaaifb","aaaaooaaaa"];
//console.log(sumPrefixScores(words));

var a1 = performance.now()
//console.log(sumPrefixScores(pw));
var a2 = performance.now();
console.log(a2 - a1);
