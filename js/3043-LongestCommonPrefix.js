/**
* @param {number[]} arr1
* @param {number[]} arr2
* @return {number}
*/
var longestCommonPrefix = function(arr1, arr2) {
	class PrefixTree {
		EMPTY = 0;
		nextIndex = 10;
		tree = new Array(10).fill(this.EMPTY);
		constructor() {
			this.stack = new Uint8ClampedArray(10);
			this.stackIndex = -1;
		}
		/**
		* @param {number} number
		* @returns {void}
		*/
		insert(number) {
			this.stackIndex = -1;
			while (number > 0) {
				this.stack[++(this.stackIndex)] = number % 10; // push()
				number = Math.trunc(number / 10);
			}
			let currentIndex = 0;
			let digit;
			while (this.stackIndex >= 0) {
				digit = this.stack[this.stackIndex--]; // pop()
				if (this.tree[currentIndex + digit] === this.EMPTY) {
					// insert a new tree node
					this.tree[currentIndex + digit] = this.nextIndex;
					this.nextIndex += 10;
					for (let i = 0; i < 10; i++) this.tree.push(this.EMPTY);
				}
				currentIndex = this.tree[currentIndex + digit];
			}
			return;
		}
		/**
		 * @param {number} number
		 * @returns {number}
		 */
		prefixLength(number) {
			this.stackIndex = -1;
			while (number > 0) {
				this.stack[++(this.stackIndex)] = number % 10; // push()
				number = Math.trunc(number / 10);
			}
			let currentIndex = 0;
			let result = 0;
			let digit = this.stack[this.stackIndex--]; // pop()
			while ((this.stackIndex >= -1) && (this.tree[currentIndex + digit] !== this.EMPTY)) {
				// move to next node in the tree
				currentIndex = this.tree[currentIndex + digit];
				// prepare next digit
				digit = this.stack[this.stackIndex--]; // pop()
				result++;
			}
			return result;
		}
	}

	let maxPrefix = Number.MIN_SAFE_INTEGER;
	let tree1 = new PrefixTree();
	for (let i = 0; i < arr1.length; i++) {
		tree1.insert(arr1[i]);
	}
	let tree2 = new PrefixTree();
	for (let i = 0; i < arr2.length; i++) {
		tree2.insert(arr2[i]);
	}
	for (let i = 0; i < arr1.length; i++) {
		maxPrefix = Math.max(maxPrefix, tree2.prefixLength(arr1[i]));
	}
	for (let i = 0; i < arr2.length; i++) {
		maxPrefix = Math.max(maxPrefix, tree1.prefixLength(arr2[i]));
	}

	//console.log(tree1.tree);
	//console.log(tree2.tree);
	return maxPrefix;
};

//var arr1 = [1, 10, 100], arr2 = [1000];
//console.log(longestCommonPrefix(arr1, arr2));
//
//var arr1 = [1, 2, 3], arr2 = [4, 4, 4];
//console.log(longestCommonPrefix(arr1, arr2));

var arr1 = [2457, 3730, 9253], arr2 = [1390, 4307, 1677, 4197];
console.log(longestCommonPrefix(arr1, arr2));

var arr1 = [13,27,45], arr2 = [21,27,48];
console.log(longestCommonPrefix(arr1, arr2));


