function convert(s: string, numRows: number): string {
	if (numRows == 1 || numRows >= s.length) return s;
	const rows = new Array(numRows).fill("");
	numRows--;
	const period = numRows << 1;
	for (let i = 0; i < s.length; i++) {
		const row = numRows - Math.abs(numRows - (i % period));
		rows[row] += s[i];
	}
	//console.log(rows);
	return rows.join("");
}

let s, numRows;
s = "PAYPALISHIRING", numRows = 3; // "PAHNAPLSIIGYIR"
console.log(convert(s, numRows));

s = "PAYPALISHIRING", numRows = 4; // "PINALSIGYAHRPI"
console.log(convert(s, numRows));

s = "A", numRows = 1; // "A"
console.log(convert(s, numRows));
