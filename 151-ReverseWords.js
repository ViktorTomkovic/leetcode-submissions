/**
* @param {string} s
* @return {string}
*/
var reverseWords = function(s) {
	return s.trim().split(/\s+/).reverse().join(" ");
};

var s = "  a good   example ";
console.log(reverseWords(s));

