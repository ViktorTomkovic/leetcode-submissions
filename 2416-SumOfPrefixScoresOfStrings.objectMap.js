/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function(words) {
	class PrefixNode {
		score = 0;
		children = {};
	}
	/**
	 * @param {PrefixNode} node
	 * @param {string} word
	 */
	function insert(node, word) {
		for (let i = 0; i < word.length; i++) {
			c = word[i];
			if (node.children[c] === undefined) {
				node.children[c] = new PrefixNode();
			}
			node = node.children[c];
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
		let c;
		while ((i <= prefix.length) && (node !== undefined)) {
			result += node.score;
			c = prefix[i];
			node = node.children[c];
			i++;
		}
		return result;
	}
	/**
	 * @param {PrefixNode} node
	 * @param {object[]} buffer
	 */
	const print = (node, buffer) => {
		if (node === undefined) {
			return;
		}
		for (const letter of Object.keys(node.children)) {
			let child = node.children[letter];
			if (child !== undefined) {
				buffer.push(letter);
				buffer.push(child.score);
			}
			print(child, buffer);
		}
	}
	let result = new Uint32Array(words.length);
	let root = new PrefixNode();
	for (let i = 0; i < words.length; i++)
		insert(root, words[i]);

	//let buffer = [];
	//print(root, buffer);
	//console.log(buffer);
	//console.log(buffer.filter((a) => !(a == 1000 || a == "p")));
	for (let i = 0; i < words.length; i++)
		result[i] = (countScore(root, words[i]));


	return result;
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
//var words = ["bfiaaaaifb","aaaaooaaaa"];
//console.log(sumPrefixScores(words));

var a1 = performance.now()
console.log(sumPrefixScores(pw));
var a2 = performance.now();
console.log(a2 - a1);
