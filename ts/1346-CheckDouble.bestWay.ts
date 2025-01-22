function checkIfExist(arr: number[]): boolean {
	const set = new Set<number>();
	for (const a of arr) {
		if (set.has(a / 2) || set.has(a * 2)) return true;
		set.add(a);
	}
	return false;
}

let arr;
arr = [10, 2, 5, 3];
console.log(checkIfExist(arr));

arr = [3, 1, 7, 11];
console.log(checkIfExist(arr));

arr = [-2, 0, 10, -19, 4, 6, -8];
console.log(checkIfExist(arr));

arr = [0, 0];
console.log(checkIfExist(arr));
