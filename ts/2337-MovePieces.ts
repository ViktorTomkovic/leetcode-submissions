import { start1, target1 } from "./2337-LongInputs.ts";
function canChange2(start: string, target: string): boolean {
	const NOT_FOUND = -47;
	const n = start.length;
	let state = start;
	const swap = (i: number, j: number): void => {
		state = state.slice(0, i) + state[j] + state.slice(i + 1, j) + state[i] +
			state.slice(j + 1, n);
	};
	const indexOfFurthestL = (startingIndex: number): number => {
		let furthestL: number = NOT_FOUND;
		for (let index = startingIndex; index >= 0; index--) {
			if (
				target[index] == "R" || (state[index] != "_" && index != startingIndex)
			) {
				break;
			}
			if (target[index] == "L") {
				furthestL = index;
			}
		}
		return furthestL;
	};
	const indexOfFurthestR = (startingIndex: number): number => {
		let furthestR: number = NOT_FOUND;
		for (let index = startingIndex; index < n; index++) {
			if (
				target[index] == "L" ||
				(state[index] != "_" && index != startingIndex)
			) {
				break;
			}
			if (target[index] == "R") {
				furthestR = index;
			}
		}
		return furthestR;
	};
	let sl = 0;
	let sr = 0;
	let tl = 0;
	let tr = 0;
	for (let i = 0; i < n; i++) {
		if (start[i] == "L") sl++;
		if (start[i] == "R") sr++;
		if (target[i] == "L") tl++;
		if (target[i] == "R") tr++;
	}
	if (sl != tl || sr != tr) return false;
	//console.log(target);
	for (let i = 0; i < n; i++) {
		if (state[i] == "L") {
			//console.log("-", state);
			const l = indexOfFurthestL(i);
			if (l == NOT_FOUND) {
				return false;
			}
			if (l != i) {
				swap(l, i);
			}
			//console.log("+", state);
		}
	}
	for (let i = n - 1; i >= 0; i--) {
		if (state[i] == "R") {
			//console.log("-", state);
			const r = indexOfFurthestR(i);
			if (r == NOT_FOUND) {
				return false;
			}
			if (i != r) {
				swap(i, r);
			}
			//console.log("+", state);
		}
	}
	return state == target;
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
console.log(canChange(start, target)); // false

const timerStart = Date.now();
console.log(canChange(start1, target1));
console.log(Date.now() - timerStart);

function canChange(start: string, target: string): boolean {
	const enum Piece {
		Empty,
		Left,
		Right,
	}
	const _arrayComparator = (arr1: Array<Piece>, arr2: Array<Piece>): number => {
		for (let i = 0; i < arr1.length; i++) {
			const diff = arr1[i] - arr2[i];
			if (diff != 0) {
				return diff;
			}
		}
		return 0;
	};
	const convertToArray = (input: string): Array<Piece> => {
		const result = new Array<Piece>(input.length);
		for (let index = 0; index < input.length; index++) {
			switch (input[index]) {
				case "_":
					result[index] = Piece.Empty;
					break;
				case "L":
					result[index] = Piece.Left;
					break;
				case "R":
					result[index] = Piece.Right;
					break;
				default:
					result[index] = Piece.Empty;
					break;
			}
		}
		return result;
	};
	const state = convertToArray(start);
	const final = convertToArray(target);

	const NOT_FOUND = -47;
	const n = start.length;
	const indexOfFurthestL = (startingIndex: number): number => {
		let furthestL: number = NOT_FOUND;
		for (let index = startingIndex; index >= 0; index--) {
			if (
				final[index] == Piece.Right ||
				(state[index] != Piece.Empty && index != startingIndex)
			) {
				break;
			}
			if (final[index] == Piece.Left) {
				furthestL = index;
			}
		}
		if (furthestL != NOT_FOUND) {
			const temp = state[furthestL];
			state[furthestL] = Piece.Left;
			state[startingIndex] = temp;
		}
		return furthestL;
	};
	const indexOfFurthestR = (startingIndex: number): number => {
		let furthestR: number = NOT_FOUND;
		for (let index = startingIndex; index < n; index++) {
			if (
				final[index] == Piece.Left ||
				((state[index] != Piece.Empty) && (index != startingIndex))
			) {
				break;
			}
			if (final[index] == Piece.Right) {
				furthestR = index;
			}
		}
		if (furthestR != NOT_FOUND) {
			const temp = state[furthestR];
			state[furthestR] = Piece.Right;
			state[startingIndex] = temp;
		}
		return furthestR;
	};
	let sl = 0;
	let sr = 0;
	let tl = 0;
	let tr = 0;
	for (let i = 0; i < n; i++) {
		if (start[i] == "L") sl++;
		if (start[i] == "R") sr++;
		if (target[i] == "L") tl++;
		if (target[i] == "R") tr++;
	}
	if (sl != tl || sr != tr) return false;
	//console.log("*", final.join(""));
	for (let i = 0; i < n; i++) {
		if (state[i] == Piece.Left) {
			//console.log("-", state.join(""));
			indexOfFurthestL(i);
			//console.log("+", state.join(""));
		}
	}
	for (let i = n - 1; i >= 0; i--) {
		if (state[i] == Piece.Right) {
			//console.log("-", state.join(""));
			indexOfFurthestR(i);
			//console.log("+", state.join(""));
		}
	}
	return _arrayComparator(state, final) == 0;
}
