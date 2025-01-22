function maximumBeauty(nums: number[], k: number): number {
	const time = new Array(Math.max.apply(null, nums) + 2 * k + 2).fill(0);
	for (const num of nums) {
		time[num]++;
		time[num + 2 * k + 1]--;
	}

	let currentBeauty = 0;
	let maxBeauty = 0;
	for (const instance of time) {
		currentBeauty += instance;
		maxBeauty = Math.max(maxBeauty, currentBeauty);
	}
	return maxBeauty;
}

let nums, k;
nums = [4, 6, 1, 2], k = 2;
console.log(maximumBeauty(nums, k)); // 3

nums = [1, 1, 1, 1], k = 10;
console.log(maximumBeauty(nums, k)); // 4

nums = [13, 46, 71], k = 29;
console.log(maximumBeauty(nums, k)); // 3
