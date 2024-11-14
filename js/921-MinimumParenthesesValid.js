/**
* @param {string} s
* @return {number}
*/
var minAddToMakeValid = function(s) {
	let count = 0;
	let open = 0;
	for (let i = 0; i < s.length; i++) {
		open = s[i] == "(" ? open + 1 : open - 1;
		if (open == -1) {
			count++;
			open = 0;
		}
	}
	return count + open;
};

var s = "())";
console.log(minAddToMakeValid(s));

var s = "(((";
console.log(minAddToMakeValid(s));

var s = ")(";
console.log(minAddToMakeValid(s));

var s = "()()())(";
console.log(minAddToMakeValid(s));

