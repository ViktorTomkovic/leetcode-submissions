/**
* @param {number[]} ratings
* @return {number}
*/
var candy = function(ratings) {
	let output = new Array(ratings.length);
	output[0] = 1;
	for (let i = 1; i < output.length; i++) {
		if (ratings[i] > ratings[i - 1]) {
			output[i] = output[i - 1] + 1;
		} else {
			output[i] = 1;
		}
	};
	let postfix = 1;
	for (let i = output.length - 2; i >= 0; i--) {
		if (ratings[i] > ratings[i + 1]) {
			postfix++;
		} else {
			postfix = 1;
		};
		output[i] = Math.max(output[i], postfix);
	};
	return output.reduce((acc, val) => acc + val, 0);
};

var ratings = [1,0,2];
console.log(candy(ratings));

var ratings = [1,2,2];
console.log(candy(ratings));

