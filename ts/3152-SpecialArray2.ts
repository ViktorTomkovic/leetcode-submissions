function isArraySpecial(nums: number[], queries: number[][]): boolean[] {
	const result = new Array<boolean>(0);
	const buckets = new Array<number>(nums.length);
	let currentBucket = 1;
	let parity = nums[0] & 1;
	buckets[0] = currentBucket;
	for (let i = 1; i < nums.length; i++) {
		const newParity = nums[i] & 1;
		if (newParity != parity) {
			currentBucket++;
		}
		buckets[i] = currentBucket;
		parity = newParity;
	}

	for (const [qBeginning, qEnd] of queries) {
		result.push((buckets[qEnd] - buckets[qBeginning]) == (qEnd - qBeginning));
	}
	
	return result;
}

let nums, queries;
nums = [3, 4, 1, 2, 6], queries = [[0, 4]];
console.log(isArraySpecial(nums, queries)); // [false]

nums = [4, 3, 1, 6], queries = [[0, 2], [2, 3]];
console.log(isArraySpecial(nums, queries)); // [false,true]

//nums = [3,4,1,2,6], queries = [[0,4]];
//console.log(isArraySpecial(nums = [3,4,1,2,6], queries = [[0,4]])) //  [false]

