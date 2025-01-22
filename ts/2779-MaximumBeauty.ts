function maximumBeauty(nums: number[], k: number): number {
	const enum IntervalType {
		Beginning,
		End,
	}
	const nums2 = new Array<[number, IntervalType]>();
	for (const num of nums) {
		nums2.push([num-k, IntervalType.Beginning]);
		nums2.push([num+k, IntervalType.End]);
	}
	nums2.sort((a, b) => {
		if (a[0] == b[0]) return a[1] - b[1];
		return a[0] - b[0];
	});
	let currentBeauty = 0;
	let maxBeauty = 0;
	for (const [, intervalType] of nums2) {
		if (intervalType == IntervalType.Beginning) {
			currentBeauty++;
			maxBeauty = Math.max(maxBeauty, currentBeauty);
		} else {
			currentBeauty--;
		}
	}
	return maxBeauty;
}

let nums, k;
nums = [4, 6, 1, 2], k = 2;
console.log(maximumBeauty(nums, k)); // 3

nums = [1, 1, 1, 1], k = 10;
console.log(maximumBeauty(nums, k)); // 4

nums = [13,46,71], k = 29;
console.log(maximumBeauty(nums, k)); // 3

