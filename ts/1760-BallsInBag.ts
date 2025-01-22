function minimumSize(nums: number[], maxOperations: number): number {
	nums.sort((a, b) => b - a);
	let minPenalty = nums[0];
	const canBeDivided = (
		nums: Array<number>,
		maxOperations: number,
		bucketSize: number,
	): boolean => {
		let operations = 0;
		for (let i = 0; i < nums.length; i++) {
			const additionalBuckets = Math.ceil((nums[i] - bucketSize) / bucketSize);
			operations += additionalBuckets;
			if (operations > maxOperations) {
				return false;
			}
			if (additionalBuckets == 0) {
				return true;
			}
		}
		return true;
	};
	let prevPenalty = minPenalty;
	let currentPenalty = minPenalty >> 1;
	while (prevPenalty >= currentPenalty) {
		//console.log(prevPenalty, currentPenalty);
		if (canBeDivided(nums, maxOperations, currentPenalty)) {
			minPenalty = currentPenalty;
			prevPenalty = currentPenalty;
			currentPenalty = currentPenalty >> 1;
		} else {
			if (prevPenalty == currentPenalty + 1) break;
			currentPenalty = (prevPenalty + currentPenalty) >> 1;
		}
	}

	return minPenalty;
}

let nums, maxOperations;
nums = [9], maxOperations = 2;
console.log(minimumSize(nums, maxOperations)); // 3

nums = [2, 4, 8, 2], maxOperations = 4;
console.log(minimumSize(nums, maxOperations)); // Output: 2
