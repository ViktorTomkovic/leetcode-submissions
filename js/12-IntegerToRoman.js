/**
* @param {number} num
* @return {string}
*/
var intToRoman = function(num) {
	const m = ["", "M", "MM", "MMM", "MB", "B", "BM", "BMM", "BMMM", "MQ"];
	const c = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
	const d = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
	const u = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
	return m[Math.floor(num / 1000) % 10] +
		c[Math.floor(num / 100) % 10] +
		d[Math.floor(num / 10) % 10] +
		u[num % 10];
};

var num = 3749;
console.log(intToRoman(num));

var num = 89;
console.log(intToRoman(num));

var num = 1994;
console.log(intToRoman(num));


