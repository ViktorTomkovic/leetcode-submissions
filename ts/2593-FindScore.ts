function findScore(nums: number[]): number {
	const indexes = Array.from(nums.keys()).toSorted((a,b) => {
		if (nums[a] == nums[b]) {
			return a-b;
		}
		return nums[a] - nums[b];
	});
	//console.log(indexes);
	const marked = new Array(nums.length).fill(false);
	let score = 0;
	for (let i = 0; i < indexes.length; i++) {
		//console.log(marked);
		const index = indexes[i];
		if (marked[index]) continue;
		if (index > 0) marked[index-1] = true;
		if (index < indexes.length - 1) marked[index+1] = true;
		marked[index] = true;
		score += nums[index];
	}
	return score;
};

let nums;
nums = [2,1,3,4,5,2];
console.log(findScore(nums)); // 7

nums = [2,3,5,1,3,2];
console.log(findScore(nums)); // 5
