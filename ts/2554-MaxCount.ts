function maxCount(banned: number[], n: number, maxSum: number): number {
	let count = 0;
	let sum = 0;
	let currentNumber = 1;
	const banned2 = new Set<number>();
	for (const b of banned) banned2.add(b);
	while (currentNumber <= n) {
		if (!banned2.has(currentNumber)) {
			count++; // can be put after if statement
			sum += currentNumber;
			if (sum > maxSum) {
				count--;
				break;
			}
		}
		currentNumber++;
	}
	return count;
}

let banned, n, maxSum;
banned = [1, 6, 5], n = 5, maxSum = 6;
console.log(maxCount(banned, n, maxSum)); // 2

banned = [1, 2, 3, 4, 5, 6, 7], n = 8, maxSum = 1;
console.log(maxCount(banned, n, maxSum)); // 0

banned = [11], n = 7, maxSum = 50;
console.log(maxCount(banned, n, maxSum)); // 7
