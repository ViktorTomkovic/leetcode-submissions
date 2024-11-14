/**
* @param {string[]} folder
* @return {string[]}
*/
var removeSubfolders = function(folder) {
	folder.sort()
	const result = [];
	result.push(folder[0]);
	for (let i = 1; i < folder.length; i++) {
		if (!folder[i].startsWith(result[result.length-1] + "/")) {
			result.push(folder[i]);
		}
	}
	return result;
}
var folder
folder = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
console.log(removeSubfolders(folder))

folder = ["/a", "/a/b/c", "/a/b/d"]
console.log(removeSubfolders(folder))

folder = ["/a/b/c", "/a/b/ca", "/a/b/d"]
console.log(removeSubfolders(folder))

