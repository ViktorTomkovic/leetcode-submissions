/**
* @param {string} expression
* @return {number[]}
*/
var diffWaysToCompute = function(expression) {
	const operationFn = (p) => {
		switch (p) {
			case "+":
				return (a, b) => a + b;
			case "-":
				return (a, b) => a - b;
			case "*":
				return (a, b) => a * b;
			default:
				console.error("unknown operation");
				break;
		}
	};
	let values = expression.split(/([\+\-\*])/);
	//console.log(...values);
	var numbers = values.filter((_value, index) => !(index & 1)).map(n => Number(n));
	//console.log(...numbers, numbers.length);
	var operators = values.filter((_value, index) => (index & 1));
	//console.log(...operators);
	/**
	 * @param {number} left index of unparsed operators
	 * @param {number} right index of unparsed operators
	 * @returns {Array<number>} all possible bracketing of interval (left,right)
	 */
	const compute = (left, right) => {
		let result = new Array();
		//console.log(left, right, ...result);
		if (left == right) {
			//console.log(left, right, "=", numbers[left]);
			result.push(numbers[left]);
		}
		for (let i = left; i < right; i++) {
			//console.log(left, "<=", i, "<=", right);
			let num1 = compute(left, i);
			let num2 = compute(i + 1, right);
			//console.log(left, right, operators[i], num1, num2);
			let operation = operationFn(operators[i]);
			for (let n1 of num1) {
				for (let n2 of num2) {
					result.push(operation(n1, n2));
				}
			}
		};
		return result;
	};
	return compute(0, operators.length);
};

//var expression = "2-1-1";
//console.log(diffWaysToCompute(expression));

var expression = "3";
console.log(diffWaysToCompute(expression));

var expression = "2*3-4*5";
console.log(diffWaysToCompute(expression));

//var expression = "20-0*47";
//console.log(diffWaysToCompute(expression));
//
