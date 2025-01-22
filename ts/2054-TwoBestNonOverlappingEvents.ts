function maxTwoEvents(
	events: Array<[start: number, end: number, value: number]>,
): number {
	const enum TimeType {
		Start,
		End,
	}
	const timeEvents = new Array<[time: number, type: TimeType, value: number]>();
	for (const [start, end, value] of events) {
		timeEvents.push([start, TimeType.Start, value]);
		timeEvents.push([end, TimeType.End, value]);
	}
	timeEvents.sort((a, b) => {
		if (a[0] == b[0]) {
			return a[1] - b[1];
		}
		return a[0] - b[0];
	});
	let maxValue = 0;
	let currentMaxEnded = 0;
	for (const [, timeType, value] of timeEvents) {
		if (timeType == TimeType.Start) {
			maxValue = Math.max(maxValue, currentMaxEnded + value);
		} else {
			currentMaxEnded = Math.max(currentMaxEnded, value);
		}
	}
	return maxValue;
}

let events: Array<[start: number, end: number, value: number]>;
events = [[1, 3, 2], [4, 5, 2], [2, 4, 3]];
console.log(maxTwoEvents(events)); // 4

events = [[1, 3, 2], [4, 5, 2], [1, 5, 5]];
console.log(maxTwoEvents(events)); // 5

events = [[1, 5, 3], [1, 5, 1], [6, 6, 5]];
console.log(maxTwoEvents(events)); // 8
