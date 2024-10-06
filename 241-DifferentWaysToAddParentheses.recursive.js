/**
* @param {string} expression
* @return {number[]}
*/
var diffWaysToCompute = function(expression) {
	const operation = (p) => {
		switch (p) {
			case "+":
				return (a,b) => a+b;
			case "-":
				return (a,b) => a-b;
			case "*":
				return (a,b) => a*b;
			default:
				console.error("unknown operation");
				break;
		}
	};
	let values = expression.split(/([\+\-\*])/);
	console.log(...values);
	var numbers = values.filter((_value, index) => !(index & 1));
	//console.log(...numbers, numbers.length);
	var operators = values.filter((_value, index) => (index & 1));
	//console.log(...operators);
	var result = new Array();
	const compute = (left, right) => {
		if (left == right) {
			return numbers[left];
		}
		for (let i = left; i <= right; i++) {
			let num1 = compute(left, i);
			let num2 = compute(i+1, right);
			result.push(operation(operators(i))(num1,num2));
		};
	};
	compute(0, operators.length);
	return result;
};

//var expression = "2-1-1";
//console.log(diffWaysToCompute(expression));

var expression = "2*3-4*5";
console.log(diffWaysToCompute(expression));

//var expression = "20-0*47";
//console.log(diffWaysToCompute(expression));
