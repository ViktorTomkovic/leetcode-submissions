/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
	class IntervalNode {
		/**
		 * @type {number}
		 */
		xorValue;
		/**
		 * @type {number}
		 */
		leftBound;
		/**
		 * @type {number}
		 */
		rightBound;
		/**
		 * @type {?IntervalNode}
		 */
		leftChild;
		/**
		 * @type {?IntervalNode}
		 */
		rightChild;
		/**
		 * @param {number} xorValue
		 * @param {number} leftBound
		 * @param {number} rightBound
		 * @param {?IntervalNode} leftChild
		 * @param {?IntervalNode} rightChild
		 */
		constructor(xorValue, leftBound, rightBound, leftChild, rightChild) {
			this.xorValue = xorValue;
			this.leftBound = leftBound;
			this.rightBound = rightBound;
			this.leftChild = leftChild;
			this.rightChild = rightChild;
		}
	};
	/**
	 * @param {number} left left boundary (included)
	 * @param {number} right right boundary (excluded)
	 * @returns {IntervalNode} root of the tree for interval [left, right)
	 */
	const CreateTree = (left, right) => {
		if (left >= right) {
			throw new Error('Creating of tree went wrong: ' + left + ' ' + right + ' ' + arr.length);
		}
		if (left + 1 == right) {
			//		console.log(arr[left], left, right);
			return new IntervalNode(arr[left], left, right);
		}
		/*
		if (left + 2 == right) {
			//		console.log(arr[left], arr[left+1], arr[left] ^ arr[left+1], left, right);
			return new IntervalNode(arr[left] ^ arr[left + 1], left, right);
		}
		*/
		let divider = Math.floor((left + right) / 2);
		let leftSide = CreateTree(left, divider);
		let rightSide = CreateTree(divider, right);
		//		console.log(leftSide.xorValue, rightSide.xorValue, leftSide.xorValue ^ rightSide.xorValue, left, right);
		return new IntervalNode(leftSide.xorValue ^ rightSide.xorValue, left, right, leftSide, rightSide);
	};
	/**
	 * @param {IntervalNode} root root of the queried tree
	 * @param {number} queryLeft left boundary of the query (included)
	 * @param {number} queryRight right boundary of the query (excluded)
	 */
	const QueryTree = (root, queryLeft, queryRight) => {
		if (!root) {
		// console.log('Null:');
			return 0;
		}
		if ((queryRight <= root.leftBound) || (root.rightBound <= queryLeft)) {
		// console.log('Outside:' + root.xorValue + ' ' + root.leftBound + ' ' + root.rightBound);
			return 0;
		}
		if ((queryLeft <= root.leftBound) && (root.rightBound <= queryRight)) {
		// console.log('Inside:' + root.xorValue + ' ' + root.leftBound + ' ' + root.rightBound);
			return root.xorValue;
		}
		// console.log('Down:' + root.xorValue + ' ' + root.leftBound + ' ' + root.rightBound);
		return QueryTree(root.leftChild, queryLeft, queryRight) ^ QueryTree(root.rightChild, queryLeft, queryRight);
	};
	let intervalTree = CreateTree(0, arr.length);
	return queries.map((value) => QueryTree(intervalTree, value[0], value[1] + 1));
};


//Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
//Output: [2,7,14,8]
var arr = [1, 3, 4, 8], queries = [[0, 1], [1, 2], [0, 3], [3, 3]];
console.log(xorQueries(arr, queries));


