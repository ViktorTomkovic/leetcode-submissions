function maximumLength(s: string): number {
	let result = -1;
	//console.log(s.length);
	for (let i = 0; i < s.length; i++) {
		for (let j = i + 1; j < s.length; j++) {
			//console.log(i, j);
			const sub = s.slice(i, j);
			let isSpecial = true;
			for (let k = 0; k < sub.length; k++) {
				if (sub[k] != sub[0]) {
					isSpecial = false;
					break;
				}
			}
			if (!isSpecial) break;
			let matchCount = 0;
			for (let k = i; k < s.length - sub.length + 1; k++) {
				const maybe = s.slice(k, k + sub.length);
				//console.log(sub, maybe, k, k + sub.length);
				if (sub == maybe) {
					matchCount++;
				}
			}
			if (matchCount >= 3) {
				result = Math.max(result, sub.length);
				//console.log(sub);
			}
		}
	}
	return result;
}

//console.log(maximumLength("aaaa")); // 2
//console.log(maximumLength("asdfjkl")); // -1
//console.log(maximumLength("abaslada")); // 1
console.log(
	maximumLength("cccerrrecdcdccedecdcccddeeeddcdcddedccdceeedccecde"),
); // 2
