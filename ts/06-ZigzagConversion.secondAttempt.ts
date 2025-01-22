function convert(s: string, numRows: number): string {
	if (numRows == 1) return s;
	const rows = new Array(numRows).fill("");
	rows[0] = s[0];
	for (let i = 1; i < s.length;) {
		for (let row = 1; row < numRows && i < s.length; row++) {
			rows[row] += s[i++];
		}
		for (let row = numRows - 2; row >= 0 && i < s.length; row--) {
			rows[row] += s[i++];
		}
	}
	return rows.join("");
}

let s, numRows;
s = "PAYPALISHIRING", numRows = 3; // "PAHNAPLSIIGYIR"
console.log(convert(s, numRows));

s = "PAYPALISHIRING", numRows = 4; // "PINALSIGYAHRPI"
console.log(convert(s, numRows));

s = "A", numRows = 1; // "A"
console.log(convert(s, numRows));
