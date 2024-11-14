/**
* @param {string} s
* @return {number}
*/
var minimumSteps = function(s) {
	let zeroCount = 0;
	for (let i = 0; i < s.length; i++) if (s[i] == "0") zeroCount++;
	if (zeroCount == 0 || zeroCount == s.length) return 0;
	let l = s.indexOf("1");
	let r = l + 1;
	let swaps = 0;
	while (l < zeroCount && r < s.length) {
		// could be rewritten as counting only "1" - so it's not two pointer algorithm but one for-loop..
		if (s[r] == "0") {
			swaps += r - l;
			l++;
		}
		r++;
	}
	return swaps;
};

var s = "101";
console.log(minimumSteps(s));

var s = "100";
console.log(minimumSteps(s));

var s = "0111";
console.log(minimumSteps(s));

var s = "010101000101";
console.log(minimumSteps(s));

