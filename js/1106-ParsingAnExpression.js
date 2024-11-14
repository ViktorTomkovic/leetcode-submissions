/**
* @param {string} expression
* @return {boolean}
*/
var parseBoolExpr = function(expression) {
	const yes = (...args) => args.reduce((a,v) => a && v, true);
	const maybe = (...args) => args.reduce((a,v) => a || v, false);
	const no = (arg) => !arg;
	const jsExpression = expression.replaceAll("&", "yes").replaceAll("|", "maybe").replaceAll("!", "no").replaceAll("t", "true").replaceAll("f", "false");
	return eval(jsExpression);
};

var expression = "&(|(f))";
console.log(parseBoolExpr(expression));

var expression = "t";
console.log(parseBoolExpr(expression));

var expression = "|(f,f,f,t)";
console.log(parseBoolExpr(expression));

var expression = "!(&(f,t))";
console.log(parseBoolExpr(expression));


