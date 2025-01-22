function slidingPuzzle(board: number[][]): number {
	const finalState = "123450";
	const initialState: string = board.reduce(
		(acc, cur) => acc += cur.join(""),
		"",
	);
	if (initialState == finalState) return 0;
	const addNewState = (
		unvisitedStates: Set<string>,
		state: string,
		oldIndex: number,
		newIndex: number,
	) => {
		const result = new Set<string>();
		if (
			newIndex < 0 || newIndex >= initialState.length ||
			((newIndex == 3) && (oldIndex == 2)) || ((newIndex == 2) && (oldIndex == 3))
		) {
			return;
		}
		const lowerIndex = Math.min(oldIndex, newIndex);
		const upperIndex = Math.max(oldIndex, newIndex);
		const newState = state.substring(0, lowerIndex) + state.at(upperIndex) +
			state.substring(lowerIndex + 1, upperIndex) + state.at(lowerIndex) +
			state.substring(upperIndex + 1, state.length);
		if (!visitedStates.has(newState)) {
			unvisitedStates.add(newState);
		}
		return result;
	};
	const possibleStates = (state: string): Set<string> => {
		const unvisitedStates = new Set<string>();
		const zero = state.indexOf("0");
		addNewState(unvisitedStates, state, zero, zero + 1);
		addNewState(unvisitedStates, state, zero, zero - 1);
		addNewState(unvisitedStates, state, zero, zero + 3);
		addNewState(unvisitedStates, state, zero, zero - 3);
		return unvisitedStates;
	};
	//const pathMap = new Map<string, Array<string>>();
	const visitedStates = new Set<string>();
	let numberOfSteps = 1;
	visitedStates.add(initialState);
	//pathMap.set(initialState, new Array(0));
	let unvisitedStates = possibleStates(initialState);
	if (unvisitedStates.has(finalState)) return numberOfSteps;
	//unvisitedStates.forEach((value) =>
	//	pathMap.set(value, new Array(1).fill(initialState))
	//);
	while (!visitedStates.has(finalState) && (unvisitedStates.size > 0)) {
		//unvisitedStates.forEach((value) => console.log(value, pathMap.get(value)));
		unvisitedStates.forEach((value) => visitedStates.add(value));
		numberOfSteps++;
		const newUnvisitedStates = new Set<string>();
		for (const state of unvisitedStates) {
			const newPossibleStates = possibleStates(state);
			if (newPossibleStates.has(finalState)) {
				//console.log(finalState, state, pathMap.get(state));
				return numberOfSteps;
			}
			newPossibleStates.forEach((value) => newUnvisitedStates.add(value));
			//const statePath = pathMap.get(state);
			//newPossibleStates.forEach((newValue) => {
			//	const newPath = new Array((statePath?.length ?? 0) + 1);
			//	statePath?.forEach((value, index) => newPath[index] = value);
			//	newPath[newPath.length - 1] = state;
			//	pathMap.set(newValue, newPath);
			//});
		}
		unvisitedStates = newUnvisitedStates;
	}
	return -1;
}

let board;
board = [[1, 2, 3], [4, 0, 5]]; // 1
console.log(slidingPuzzle(board));

board = [[1, 2, 3], [5, 4, 0]]; // -1
console.log(slidingPuzzle(board));

board = [[4, 1, 2], [5, 0, 3]]; // 5
console.log(slidingPuzzle(board));

board = [[3, 2, 4], [1, 5, 0]]; // 14
console.log(slidingPuzzle(board));
