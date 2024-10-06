class MyCalendarTwo {
	constructor() {
		this.validVs = []
		this.overlappingVs = []
	}
	/**
	 * @param {number} start
	 * @param {number} end
	 * @return {boolean}
	 */
	book(start, end) {
		for (const overlapping of this.overlappingVs) {
			if (overlapping.start < end && start < overlapping.end) {
				return false;
			}
		}

		for (const valid of this.validVs) {
			if (valid.start < end && start < valid.end) {
				let overlapping = {
					start: Math.max(valid.start, start),
					end: Math.min(valid.end, end),
				};
				this.overlappingVs.push(overlapping);
			}
		}
		this.validVs.push({ start: start, end: end });
		return true;
	}
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
//var inputs = ["MyCalendarTwo", "book", "book", "book", "book", "book", "book"];
//var parameters = [[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]];
//var inputs = ["MyCalendarTwo", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book"];
//var parameters = [[], [47, 50], [1, 10], [27, 36], [40, 47], [20, 27], [15, 23], [10, 18], [27, 36], [17, 25], [8, 17], [24, 33], [23, 28], [21, 27], [47, 50], [14, 21], [26, 32], [16, 21], [2, 7], [24, 33], [6, 13], [44, 50], [33, 39], [30, 36], [6, 15], [21, 27], [49, 50], [38, 45], [4, 12], [46, 50], [13, 21]];
var inputs = ["MyCalendarTwo", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book", "book"];
var parameters = [[], [5, 12], [42, 50], [4, 9], [33, 41], [2, 7], [16, 25], [7, 16], [6, 11], [13, 18], [38, 43], [49, 50], [6, 15], [5, 13], [35, 42], [19, 24], [46, 50], [39, 44], [28, 36], [28, 37], [20, 29], [41, 49], [11, 19], [41, 46], [28, 37], [17, 23], [22, 31], [4, 10], [31, 40], [4, 12], [19, 26]];

/**
	* @param {string[]} commands to be executed
	* @param {string[]} parameters supplied to executed commands
	* @returns {object[]} results of commands
	*/
function process(commands, parameters) {
	let outputs = [];
	let instance = null;
	for (let i = 0; i < commands.length; i++) {
		switch (commands[i]) {
			case "MyCalendarTwo":
				instance = Reflect.construct(MyCalendarTwo, parameters[i]);
				outputs.push([]);
				break;
			case "book":
				let result = Reflect.apply(MyCalendarTwo.prototype.book, instance, parameters[i]);
				outputs.push(result);
				break;
			default:
				break;
		}
	}
	return outputs;
}

console.log(process(inputs, parameters));

