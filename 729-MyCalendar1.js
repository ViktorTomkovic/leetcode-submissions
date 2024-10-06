class MyCalendar {
	constructor() {
		this.bookedIntervals = {
			start: Number.MAX_SAFE_INTEGER,
			end: Number.MAX_SAFE_INTEGER,
		};
	}
	/**
	 * @param {number} start
	 * @param {number} end
	 * @return {boolean}
	 */
	book(start, end) {
		let node = this.bookedIntervals;
		while (true) {
			if (start < node.end && node.start < end) {
				return false;
			} else if (end <= node.start) {
				if (node.left === undefined) {
					node.left = { start: start, end: end };
					return true;
				} else {
					node = node.left;
				}
			} else /*if (node.end <= start)*/ {
				if (node.right === undefined) {
					node.right = { start: start, end: end };
					return true;
				} else {
					node = node.right;
				}
			}
		}
	}
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
//var inputs = ["MyCalendar", "book", "book", "book"];
//var parameters = [[], [10, 20], [15, 25], [20, 30]]
var inputs = ["MyCalendar", "book", "book", "book", "book", "book"]
var parameters = [[], [37, 50], [33, 50], [4, 17], [35, 48], [8, 25]]

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
			case "MyCalendar":
				instance = Reflect.construct(MyCalendar, parameters[i]);
				outputs.push([]);
				break;
			case "book":
				let result = Reflect.apply(MyCalendar.prototype.book, instance, parameters[i]);
				outputs.push(result);
				break;
			default:
				break;
		}
	}
	return outputs;
}

console.log(process(inputs, parameters));

