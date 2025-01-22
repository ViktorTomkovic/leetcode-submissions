function maxChunksToSorted(arr: number[]): number {
	const diff = arr.map((v, i) => v - i);
	let r = 0;
	let segmentCount = 0;
	do {
		let maxRight = Math.max(r + diff[r], r);
		for (let l = r; l <= maxRight; l++) {
			maxRight = Math.max(l + diff[l], maxRight);
		}
		r = maxRight + 1;
		segmentCount++;
	} while (r < diff.length);
	return segmentCount;
};

let arr;
arr = [4,3,2,1,0]
console.log(maxChunksToSorted(arr)); // Output: 1

arr = [1,0,2,3,4]
console.log(maxChunksToSorted(arr)); // Output: 4

