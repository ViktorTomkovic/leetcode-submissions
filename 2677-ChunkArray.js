/**
* @param {Array} arr
* @param {number} size
* @return {Array}
*/
var chunk = function(arr, size) {
	let result = []
	let index = 0
	let buffer = []
	let j = 0
	while (index < arr.length) {
		buffer[j] = arr[index]
		j = (j + 1) % size
		index++;
		if (j == 0) {
			result.push(buffer)
			buffer = []
		}
	}
	if (buffer.length > 0) {
		result.push(buffer)
	}
	return result
};

var arr = [1, 2, 3, 4, 5], size = 1
console.log(chunk(arr, size))
var arr = [1, 9, 6, 3, 2], size = 3
console.log(chunk(arr, size))
var arr = [8, 5, 3, 2, 6], size = 6
console.log(chunk(arr, size))
var arr = [], size = 1
console.log(chunk(arr, size))

/*
var chunk = function(arr, size) {
let result = [];
for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
}
return result;
};
*/
