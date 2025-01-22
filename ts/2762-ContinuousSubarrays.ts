function continuousSubarrays(nums: number[]): number {
	// array value -> occurances
	const frequency = new Map<number, Array<number>>();
	const putOrAppend = (map: Map<number, Array<number>>, element: number, index: number) => {
		if (!map.has(element)) {
			map.set(element, new Array<number>(0));
		}
		map.get(element)?.push(index);
	}
	const sacredCondition = (a: number, b: number): boolean => {
		return Math.abs(a - b) <= 2;
	}
	let result: number = 0;
	let left = -1;
	for (let right = 0; right < nums.length; right++) {
		const cn = nums[right];
		putOrAppend(frequency, cn, right);
				//console.log(frequency)
		let size = 0;
		let newLeftIndex = left;
		for (const num of frequency.keys()) {
			if (!sacredCondition(cn, num)) {
				
			
				newLeftIndex = Math.max(newLeftIndex, ...frequency.get(num)!);
				frequency.delete(num);
			}
		}
				//newLeftIndex++;
				for (const num of frequency.keys()) {
						const arr = frequency.get(num)!;
						let ind = 0;
						while (arr[ind] < newLeftIndex) ind++;
						if (ind > 0) frequency.set(num, arr.slice(ind));
				}
				//console.log(frequency)
				//console.log(left, newLeftIndex, right, result)
		
		result += right - newLeftIndex;
				left = newLeftIndex;
	}
	return result;
}

let nums;
nums = [5, 4, 2, 4];
console.log(continuousSubarrays(nums)); // 8
nums = [1, 2, 3];
console.log(continuousSubarrays(nums)); // 6
nums = [65,66,67,66,66,65,64,65,65,64];
console.log(continuousSubarrays(nums)); // 43

