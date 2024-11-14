/**
* Definition for a binary tree node.
*/
class TreeNode {
	constructor(val, left, right) {
		this.val = (val === undefined ? 0 : val);
		this.left = (left === undefined ? null : left);
		this.right = (right === undefined ? null : right);
	}
}

/**
* @param {TreeNode} nodeFromTree1
* @param {TreeNode} nodeFromTree2
* @return {boolean}
*/
var flipEquiv = function(nodeFromTree1, nodeFromTree2) {
	// ifs can be written as: (n1 == null && n2 == null) => true, (n1 == null || n2 == null || n1.val != n2.val) => false
	if (nodeFromTree1 == null && nodeFromTree2 == null) {
		return true;
	}
	if (nodeFromTree1 != null && nodeFromTree2 != null) {
		if (nodeFromTree1.val != nodeFromTree2.val) {
			return false;
		}
		// doable in two ors (cases 1 and 2 are the same)
		// case 1
		return (flipEquiv(nodeFromTree1.left,nodeFromTree2.left) && flipEquiv(nodeFromTree1.right, nodeFromTree2.right))
			// case 2
			|| (flipEquiv(nodeFromTree1.left, nodeFromTree2.right) && flipEquiv(nodeFromTree1.right, nodeFromTree2.left))
			// case 2
			|| (flipEquiv(nodeFromTree1.right, nodeFromTree2.left) && flipEquiv(nodeFromTree1.left, nodeFromTree2.right))
			// case 1
			|| (flipEquiv(nodeFromTree1.right, nodeFromTree2.right) && flipEquiv(nodeFromTree1.left, nodeFromTree2.left));
	}
	// one of nodes is null
	return false;


};

