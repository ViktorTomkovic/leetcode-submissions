class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

const makeArray = (root: TreeNode): Array<number> => {
	const queue = new Array<TreeNode>();
	queue.push(root);
	let index = 0;
	while (index < queue.length) {
		const current = queue[index];
		if (current.left != null) {
			queue.push(current.left);
		}
		if (current.right != null) {
			queue.push(current.right);
		}
		index++;
	}
	return queue.map((node) => node.val);
};

const makeTreeArray = (root: Array<number | null>): (TreeNode | null)[] => {
	const prep = root.map((value) => value == null ? null : new TreeNode(value));
	let prevLevel: (TreeNode | null)[] = [];
	let nextLevel: (TreeNode | null)[] = [];
	for (let i = 0; i < root.length; i++) {

		if (prep[i] != null) {
			if ((2 * i + 1) < root.length) {
				prep[i]!.left = prep[2 * i + 1];
			}
			if ((2 * i + 2) < root.length) {
				prep[i]!.right = prep[2 * i + 2];
			}
		}
	}
	return prep;
};

const makeTreeArray2 = (root: Array<number | null>): (TreeNode | null)[] => {
	const prep = root.map((value) => value == null ? null : new TreeNode(value));
	let prevLevel: (TreeNode | null)[] = [];
	let nextLevel: (TreeNode | null)[] = [];
	prevLevel.push(prep[0]);
	let nextLeft = 1;
	let nextRight = -1;
	while (nextLeft < prep.length) {
		prevLevel = prevLevel.filter(node => node != null);
		nextRight = nextLeft + 2*prevLevel.length;
		nextLevel = prep.slice(nextLeft, nextRight);
		for (const i of prevLevel.keys()) {
			prevLevel[i]!.left = nextLevel[i*2];
			prevLevel[i]!.right = nextLevel[i*2+1];
		}
		nextLeft = nextRight;
		prevLevel = nextLevel;
	}
	return prep;
};

const makeTree = (root: Array<number | null>): TreeNode | null => {
	const prep = makeTreeArray2(root);
	return prep[0];
};

const makeIndeces = (
	target: number,
	base: number = 2,
	currentExponent: number = 0,
): Array<number> => {
	const left = base ** currentExponent;
	const right = Math.min(target, base ** (currentExponent + 1) - 1);
	if (currentExponent == 0) {
		const result = new Array<number>(0);
		result.push(1);
		result.push(...makeIndeces(target, base, currentExponent + 1));
		return result;
	}
	if (target < left) {
		return new Array<number>(0);
	}
	if (currentExponent % 2 == 0) {
		const result = new Array<number>(0);
		for (let i = left; i <= right; i++) result.push(i);
		result.push(...makeIndeces(target, base, currentExponent + 1));
		return result;
	} else {
		const result = new Array<number>(0);
		for (let i = right; i >= left; i--) result.push(i);
		result.push(...makeIndeces(target, base, currentExponent + 1));
		return result;
	}
};

export { makeArray, makeIndeces, makeTree, makeTreeArray, TreeNode };
