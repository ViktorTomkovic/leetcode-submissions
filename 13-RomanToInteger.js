/**
* @param {string} s
* @return {number}
*/
var romanToInt = function(s) {
	const singles = new Map();
	singles.set("I", 1);
	singles.set("V", 5);
	singles.set("X", 10);
	singles.set("L", 50);
	singles.set("C", 100);
	singles.set("D", 500);
	singles.set("M", 1000);
	const doubles = new Map();
	doubles.set("IV", 4);
	doubles.set("IX", 9);
	doubles.set("XL", 40);
	doubles.set("XC", 90);
	doubles.set("CD", 400);
	doubles.set("CM", 900);

	let result = 0;
	let i = 0;
	while (i < s.length - 1) {
		let doublet = s[i] + s[i + 1];
		if (doubles.has(doublet)) {
			result += doubles.get(doublet);
			i += 2;
		} else {
			result += singles.get(doublet[0]);
			i += 1;
		};
	}
	if (i == s.length -1) {
		result += singles.get(s[i]);
	}
	return result;
};

var s = "III";
console.log(romanToInt(s));

var s = "LVIII";
console.log(romanToInt(s));

var s = "MCMXCIV";
console.log(romanToInt(s));

