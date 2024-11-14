/**
* @param {string} s
* @param {string} goal
* @return {boolean}
*/
var rotateString = function(s, goal) {
	for (let i = 0; i < s.length; i++) {
		if (s == goal) return true;
		s = s.slice(1) + s[0];
	}
	return false;
};

/*
var rotateString2 = function(s, goal) {
	let string = s + s;
	return goal.length === s.length && string.includes(goal)
};
*/

var s, goal;
s = "abcde", goal = "cdeab";
console.log(rotateString(s, goal));

s = "abcde", goal = "abced";
console.log(rotateString(s, goal));

