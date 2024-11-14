/**
* @param {string} word
* @return {string}
*/
var compressedString = function(word) {
	let result = "";
	let index = 0;
	while (index < word.length) {
		let count = 1;
		while (index+count < word.length && word[index+count] == word[index] && count < 9) {
			count++;
		}
		result += count.toString() + word[index];
		index += count;
	}
	return result;
};

var word;
word = "abcde";
console.log(compressedString(word));

word = "aaaaaaaaaaaaaabb";
console.log(compressedString(word));
