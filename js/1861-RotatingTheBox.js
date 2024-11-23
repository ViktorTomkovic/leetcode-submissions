/**
* @param {character[][]} box
* @return {character[][]}
*/
var rotateTheBox = function(box) {
	const STONE = "#";
	const OBSTACLE = "*";
	const EMPTY = ".";
	const rotated = Array.from({ length: box[0].length }, () => Array(box.length));
	for (let i = 0; i < box.length; i++) {
		for (let j = 0; j < box[0].length; j++) {
			rotated[j][box.length - 1 - i] = box[i][j];
		}
	}

	for (let i = rotated.length - 2; i >= 0; i--) {
		for (let j = rotated[0].length - 1; j >= 0; j--) {
			if (rotated[i][j] == STONE) {
				for (let k = i + 1; k < rotated.length; k++) {
					if (rotated[k][j] == EMPTY) {
						rotated[k][j] = STONE;
						rotated[k - 1][j] = EMPTY;
					} else {
						break;
					}
				}
			}
		}
	}
	return rotated;
};

var box;
box = [["#", ".", "#"]];
console.log(rotateTheBox(box));

box = [["#", ".", "*", "."], ["#", "#", "*", "."]];
console.log(rotateTheBox(box));

box = [["#", "#", "*", ".", "*", "."], ["#", "#", "#", "*", ".", "."], ["#", "#", "#", ".", "#", "."]];
console.log(rotateTheBox(box));

