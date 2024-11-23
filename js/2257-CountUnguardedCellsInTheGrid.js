/**
* @param {number} rows
* @param {number} rows
* @param {number[][]} guards
* @param {number[][]} walls
* @return {number}
*/
var countUnguarded = function(rows, cols, guards, walls) {
	const EMPTY = 0;
	const WALL = -3333333;
	const LEFT = 0;
	const RIGHT = 1;
	const UP = 2;
	const DOWN = 3;

	const grid = Array.from(Array(rows), () => Array(cols).fill(EMPTY));
	guards.forEach((guard, index) => grid[guard[0]][guard[1]] = -++index);
	walls.forEach((wall) => grid[wall[0]][wall[1]] = WALL);
	const fillWatch = (row, col, guardIndex, direction) => {
		if (row < 0 || row >= rows || col < 0 || col >= cols || ((grid[row][col] < 0) && (Math.abs(grid[row][col]) != Math.abs(guardIndex)))) {
			return;
		}
		if (grid[row][col] != guardIndex) {
			grid[row][col] = -guardIndex;
		}

		switch (direction) {
			case RIGHT:
				fillWatch(row, col + 1, guardIndex, RIGHT);
				break;
			case LEFT:
				fillWatch(row, col - 1, guardIndex, LEFT);
				break;
			case UP:
				fillWatch(row + 1, col, guardIndex, UP);
				break;
			case DOWN:
				fillWatch(row - 1, col, guardIndex, DOWN);
				break;
			default:
				break;
		}
	};
	guards.forEach((guard, index) => {
		index++;
		fillWatch(guard[0], guard[1], -index, LEFT);
		fillWatch(guard[0], guard[1], -index, RIGHT);
		fillWatch(guard[0], guard[1], -index, UP);
		fillWatch(guard[0], guard[1], -index, DOWN);
	});
	let count = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (grid[i][j] == 0) {
				count++;
			}
		}
	}
	return count;
};

var m, n, guards, walls;
m = 4, n = 6, guards = [[0, 0], [1, 1], [2, 3]], walls = [[0, 1], [2, 2], [1, 4]]; // 7
console.log(countUnguarded(m, n, guards, walls));

m = 3, n = 3, guards = [[1, 1]], walls = [[0, 1], [1, 0], [2, 1], [1, 2]]; // 4
console.log(countUnguarded(m, n, guards, walls));

