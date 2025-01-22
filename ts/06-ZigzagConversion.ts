function convert(s: string, numRows: number): string {
	if (numRows == 1) return s;
	class ConvertedPosition {
		row: number;
		column: number;
		originalIndex: number;
		constructor(row: number, column: number, originalIndex: number) {
			this.row = row;
			this.column = column;
			this.originalIndex = originalIndex;
		}
	}
	let goingDown = true;
	let row = -1;
	let column = 0;
	const positions = new Array<ConvertedPosition>(s.length);
	for (let i = 0; i < s.length; i++) {
		if (row >= numRows - 1) {
			goingDown = false;
		}
		if (row <= 0) {
			goingDown = true;
		}
		if (goingDown) {
			row++;
		} else {
			row--;
			column++;
		}
		positions[i] = new ConvertedPosition(row, column, i);
	}
	//console.log(positions);
	positions.sort((a, b) => {
		if (a.row == b.row) {
			return a.column - b.column;
		}
		return a.row - b.row;
	});
	//console.log(positions);
	return positions.map((v) => s[v.originalIndex]).join("");
}

let s, numRows;
s = "PAYPALISHIRING", numRows = 3; // "PAHNAPLSIIGYIR"
console.log(convert(s, numRows));

s = "PAYPALISHIRING", numRows = 4; // "PINALSIGYAHRPI"
console.log(convert(s, numRows));

s = "A", numRows = 1; // "A"
console.log(convert(s, numRows));
