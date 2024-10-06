/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function(s) {
	console.log(s);

	const masks = { 'e': 1, 'a': 2, 'i': 4, 'o': 8, 'u': 16 };

	const bits = new Uint8Array(s.length);

	let prevBit = 0;
	for (let i = 0; i < s.length; i++) {
		let mask = masks[s[i]];
		if (mask != undefined) {
			prevBit ^= mask;
		}
		bits[i] = prevBit;
	}
//	console.log(bits);
	const firstLast = new Map();
	for (let i = 0; i < bits.length; i++) {
		const bit = bits[i];
		if (firstLast.has(bit)) {
			// setting new maximum
			firstLast.set(bit, [firstLast.get(bit)[0], i]);
		} else {
			firstLast.set(bit, [i, i]);
		};
	}
	if (firstLast.has(0)) {
		// edge case
		firstLast.set(0, [-1, firstLast.get(0)[1]]);
	}
//	console.log(firstLast);
	let maxDistance = Number.MIN_SAFE_INTEGER;
	let picked = undefined;
	firstLast.forEach((value, key) => {
//		console.log(value);
//		console.log(key);
		if (value[1] - value[0] > maxDistance) {
			maxDistance = value[1] - value[0];
			picked = key;
		};
	}
	);

	return maxDistance;
};

var s = "eleetminicoworoep";
console.log(findTheLongestSubstring(s));

var s = "leetcodeisgreat";
console.log(findTheLongestSubstring(s));

var s = "bcbcbc";
console.log(findTheLongestSubstring(s));

