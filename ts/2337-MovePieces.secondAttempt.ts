import { start1, target1, start2, target2 } from "./2337-LongInputs.ts";
function canChange(start: string, target: string): boolean {
	const n = start.length;
	let i = 0;
	let j = 0;
	//console.log(start);
	//console.log(target);
	//
	while (i < n || j < n) {
		while (i < n && start[i] == "_") i++;
		while (j < n && target[j] == "_") j++;
		//console.log(i, j);
		if (i >= n && j >= n) return true;
		if (i >= n || j >= n) return false;
		if (
			start[i] != target[j] ||
			start[i] == "L" && i < j ||
			start[i] == "R" && i > j
		) return false;
		i++;
		j++;
	}
	return true;
}

let start: string;
let target: string;
start = "_L__R__R_", target = "L______RR";
console.log(canChange(start, target)); // true

start = "R_L_", target = "__LR";
console.log(canChange(start, target)); // false

start = "_R", target = "R_";
console.log(canChange(start, target)); // false

start = "_L__R_RR_", target = "L______RR";
console.log(canChange(start, target)); // false

start = "_L__R__R_", target = "L_____RRR";
console.log(canChange(start, target)); // false

start = "__L__R__R__", target = "_L_____RR__";
console.log(canChange(start, target)); // true

const timerStart1 = Date.now();
console.log(canChange(start1, target1)); // true
console.log(Date.now() - timerStart1);

const timerStart2 = Date.now();
console.log(canChange(start2, target2)); // true
console.log(Date.now() - timerStart2);

