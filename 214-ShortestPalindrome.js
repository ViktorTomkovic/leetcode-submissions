/**
* @param {string} s
* @return {string}
*/
var shortestPalindrome = function(s) {
	const isPalindrome = (palindrom) => {
		for (let i = 0; i < Math.ceil(palindrom.length / 2); i++) {
			if (palindrom[i] != palindrom[palindrom.length - 1 - i]) {
				return false;
			}
		}
	}
	function reverse(s) {
		for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
		return o;
	}

	const n = s.length - 1;
	const charCode = "a".charCodeAt(0) - 1;
	const prime = 9372735957019;
	let leftHash = 0;
	let rightHash = leftHash;
	let base = 31;
	let rightBase = 1;
	let maxSubstring = -1;
	for (let i = 0; i <= n; i++) {
		//let s2 = s.substring(0, i + 1); let s3 = s.substring(n - i);
		leftHash = (leftHash * base) % prime + (s.charCodeAt(i) - charCode);
		rightHash = (rightHash + (s.charCodeAt(i) - charCode) * rightBase) % prime;
		if (leftHash == rightHash) {
			maxSubstring = i;
		}
		rightBase = (rightBase * base) % prime;
	}
	if (maxSubstring == -1) {
		return "";
	}
	let pre = s.substring(maxSubstring + 1);
	pre = reverse(pre);
	return pre + s;
};

var s = "aabababababaababaa";
//var s = "aacecaaa";
//Output: "aaacecaaa"
console.log(shortestPalindrome(s));

//var s = "abcd";
//Output: "dcbabcd"
//console.log(shortestPalindrome(s));


