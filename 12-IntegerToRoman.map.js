/**
* @param {number} num
* @return {string}
*/
var intToRoman = function(num) {
	const u = new Map();
	u.set(0, "");
	u.set(1, "I");
	u.set(2, "II");
	u.set(3, "III");
	u.set(4, "IV");
	u.set(5, "V");
	u.set(6, "VI");
	u.set(7, "VII");
	u.set(8, "VIII");
	u.set(9, "IX");
	const d = new Map();
	d.set(0, "");
	d.set(1, "X");
	d.set(2, "XX");
	d.set(3, "XXX");
	d.set(4, "XL");
	d.set(5, "L");
	d.set(6, "LX");
	d.set(7, "LXX");
	d.set(8, "LXXX");
	d.set(9, "XC");
	const c = new Map();
	c.set(0, "");
	c.set(1, "C");
	c.set(2, "CC");
	c.set(3, "CCC");
	c.set(4, "CD");
	c.set(5, "D");
	c.set(6, "DC");
	c.set(7, "DCC");
	c.set(8, "DCCC");
	c.set(9, "CM");
	const m = new Map();
	m.set(0, "");
	m.set(1, "M");
	m.set(2, "MM");
	m.set(3, "MMM");
	let arr = [u, d, c, m];
	let result = "";
	let i = 0;
	while (num > 0) {
		result = arr[i].get(num % 10) + result;
		num = Math.floor(num / 10);
		i++;
	}
	return result;
};

var num = 3749;
console.log(intToRoman(num));

var num = 89;
console.log(intToRoman(num));

var num = 1994;
console.log(intToRoman(num));


