/**
* @param {string[]} folder
* @return {string[]}
*/
var removeSubfolders = function(folder) {
	class PrefixNode {
		constructor() {
			this.nextLetter = {};
			/** @type {boolean} */
			this.isTerminal = false;
		}
	}
	/** @param {PrefixNode} root
	 * @param {string} sequence */
	const insert = (root, sequence) => {
		let currentNode = root;
		for (let i = 0; i < sequence.length; i++) {
			let child = currentNode[sequence[i]];
			if (child === undefined) {
				child = new PrefixNode();
				currentNode[sequence[i]] = child;
			}
			currentNode = child;
		}
		currentNode.isTerminal = true;
	}
	/**
	 * @param {TreeNode} node
	 * @param {string} currentSequence
	 * @param {string[]} result
	 */
	const nonSubfolders = (node, currentSequence, result) => {
		if (node.isTerminal) {
			result.push(currentSequence);
			return
		}
		Object.keys(node).forEach(key => nonSubfolders(node[key], currentSequence + "/" + key, result));
	}

	const root = new PrefixNode();
	for (const f of folder) {
		const ff = f.split("/").splice(1);
		insert(root, ff)
	}
	const res = [];
	nonSubfolders(root, "", res)
	return res;
};

var folder
folder = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
console.log(removeSubfolders(folder))

folder = ["/a", "/a/b/c", "/a/b/d"]
console.log(removeSubfolders(folder))

folder = ["/a/b/c", "/a/b/ca", "/a/b/d"]
console.log(removeSubfolders(folder))
