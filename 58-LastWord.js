/**
* @param {string} s
* @return {number}
*/
var lengthOfLastWord = function(s) {
	const trimmed = s.trim();
	return trimmed.substring(trimmed.lastIndexOf(" ") + 1);
};

console.log(lengthOfLastWord("   fly me   to   the moon  "));
