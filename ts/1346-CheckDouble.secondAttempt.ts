function checkIfExist(arr: number[]): boolean {
	const first = arr.indexOf(0);
	const last = arr.lastIndexOf(0);
	if (first != last) {
		return true;
	}
	const set = new Set<number>();
	for (const a of arr) {
		set.add(a * 2);
	}
	set.delete(0);
	for (const a of arr) {
		if (set.has(a)) return true;
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
