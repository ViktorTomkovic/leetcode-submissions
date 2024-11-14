/**
* @param {string} s
* @return {number}
*/
var minLength = function(s) {
	let index = -1;
	do {
		index = s.indexOf("AB");
		if (index == -1) { index = s.indexOf("CD"); }
		if (index > -1) { s = s.slice(0, index) + s.slice(index + 2); }
	} while (s.length > 0 && index > -1);
	return s.length;
};

var s = "ACBBD"
console.log(minLength(s));

var s = "ABFCACDB"
console.log(minLength(s));

