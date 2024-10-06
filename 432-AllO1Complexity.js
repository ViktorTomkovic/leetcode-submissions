class NNode {
	/** @type {number} */
	count = 0;
	/** @type {Set<string>} */
	keys = new Set();
	/** @type {NNode} */
	larger;
	/** @type {NNode} */
	smaller;
	constructor(count, key) {
		this.count = count;
		this.keys.add(key);
	}
}
var AllOne = class {
	constructor() {
		/** @type {NNode} */
		this.smallest;
		/** @type {NNode} */
		this.largest;
		/** @type {Map<string, NNode>} */
		this.keys = new Map();
	}
	/**
	 * @param {string} key
	 * @return {void}
	 */
	inc(key) {
		if (this.largest === undefined) {
			let onlyNode = new NNode(1, key);
			this.smallest = onlyNode;
			this.largest = onlyNode;
			this.keys.set(key, onlyNode);
			return;
		}
		let bin = this.keys.get(key);
		if (bin === undefined) {
			// Bin with count 1 exists
			if (this.smallest.count == 1) {
				this.smallest.keys.add(key);
				this.keys.set(key, this.smallest);
			} else {
				let oneBin = new NNode(1, key);
				this.smallest.smaller = oneBin;
				oneBin.larger = this.smallest;
				this.smallest = oneBin;
				this.keys.set(key, oneBin);
			}
		} else if (this.largest == bin) {
			let onlyKey = bin.keys.size == 1;
			if (onlyKey) {
				bin.count++;
			} else {
				let maxBin = new NNode(bin.count + 1, key);
				maxBin.smaller = this.largest;
				this.largest.keys.delete(key);
				this.largest.larger = maxBin;
				this.largest = maxBin;
				this.keys.set(key, maxBin);
			}
		} else {
			// In this branch we are not the largest key
			// Are we in a bin with only key?
			let onlyKey = bin.keys.size == 1;
			// Bin with next value (count+1) exists
			let nextExists = bin.larger.count == bin.count + 1;
			if (onlyKey) {
				if (!nextExists) {
					bin.count++;
				} else {
					// Only key + next exists
					if (this.smallest == bin) this.smallest = bin.larger;
					// Are we smallest?
					if (bin.smaller !== undefined) {
						// If not, link previous bin
						bin.smaller.larger = bin.larger;
					}
					this.keys.set(key, bin.larger);
					bin.larger.keys.add(key);
					bin = null;
				}
			} else {
				// Not only key
				bin.keys.delete(key);
				if (!nextExists) {
					let nextBin = new NNode(1, key);
					this.keys.set(key, nextBin);
					bin.larger.smaller = nextBin;
					nextBin.larger = bin.larger;
					bin.larger = nextBin;
					nextBin.smaller = bin;
				} else {
					this.keys.set(key, bin.larger);
					bin.larger.keys.add(key);
				}
			}
		}
	}
	/**
	 * @param {string} key
	 * @return {void}
	 */
	dec(key) {
		// it is "guaranteed" that key exists in the data structure..
		let bin = this.keys.get(key);
		if (bin === undefined) throw new Error("What the f!@# is wrong?!");
		if (this.smallest == this.largest && this.smallest == bin && bin.count == 1 && bin.keys.size == 1) {
			this.smallest = undefined;
			this.largest = undefined;
			this.keys.delete(key);
			return;
		}
		let onlyKey = bin.keys.size == 1;
		if (bin == this.smallest) {
			if (bin.count == 1) {
				bin.keys.delete(key);
				this.keys.delete(key);
				if (onlyKey) this.smallest = bin.larger;
			} else {
				if (onlyKey) {
					bin.count--;
				} else {
					let smallestNode = new NNode(bin.count - 1, key);
					this.smallest.smaller = smallestNode;
					this.smallest = smallestNode;
				}
			}
			return;
		}
		let prevExists = bin.smaller.count == bin.count - 1;
		if (onlyKey) {
			if (!prevExists) {
				bin.count--;
			} else {
				if (this.largest == bin) {
					this.largest = bin.smaller;
					bin.smaller.larger = undefined;
				}
				if (bin.larger !== undefined) {
					bin.larger.smaller = bin.smaller;
					bin.smaller.larger = bin.larger;
				}
				bin.smaller.keys.add(key);
				this.keys.set(key, bin.smaller);
				bin = null;
			}
		} else {
			bin.keys.delete(key);
			if (prevExists) {
				this.keys.set(key, bin.smaller);
			} else {
				if (bin.count == 1) {
					this.keys.delete(key);
				} else {
					let smallerNode = new NNode(bin.count - 1, key);
					if (bin.smaller !== undefined) {
						bin.smaller.larger = smallerNode;
					}
					smallerNode.smaller = bin.smaller;
					bin.smaller = smallerNode;
				}
			}
		}
	}
	/**
	 * @return {string}
	 */
	getMaxKey() {
		if (this.largest === undefined) return "";
		return this.largest.keys.values().next().value;
	}
	/**
	 * @return {string}
	 */
	getMinKey() {
		if (this.smallest === undefined) return "";
		return this.smallest.keys.values().next().value;
	}
};

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */

/**
 * Defines what to return for a given input.
 * @callback ReturnFn
 * @param {object} input parameter
 * @returns {object} output
 */

class MethodCommand {
	/** @type {string} */
	name;
}
class ConstructorCommand {
	/** @type {string} */
	name;
	/** @type {ReturnFn} */
	action;
}

class CommandExecutor {
	constructor() {
		/** @type {ConstructorCommand[]} */
		this.constructors = [];
		/** @type {MethodCommand[]} */
		this.methods = [];
		/** @type {object} */
		this.instance = undefined;
	}
	/**
	* Creates constructor with returning action being identity input params for constructor => return
	* @param {string} name constructor's name
	*/
	//addContructor(name) {
	//	this.constructors.push({ name: name, action: (...args) => args });
	//	return this;
	//}
	/**
	* @param {string} name constructor's name
	* @param {ReturnFn} rFn callback for return value
	*/
	addContructor(name, rFn) {
		if (rFn === undefined) rFn = (_args) => { return null; };
		this.constructors.push({ name: name, action: rFn });
		return this;
	}

	/**
	* Creates method
	* @param {string} name method's name
	*/
	addMethod(name) {
		this.methods.push({ name: name });
		return this;
	}

	/**
	* Creates method
	* @param {string[]} names method's names
	*/
	addMethods(names) {
		for (let name of names) {
			this.methods.push({ name: name });
		}
		return this;
	}

	/**
	* @param {string[]} inputs methods/constructors' names
	* @param {object[][]} parameters ith value is input for ith input call
	* @returns {object[]} ith value is output for ith input
	*/
	execute(inputs, parameters) {
		/** @type {object[][]} */
		var outputs = [];
		for (let i = 0; i < inputs.length; i++) {
			let input = inputs[i];
			let params = parameters[i];

			let constructor = this.constructors.find(value => value.name === input);
			if (constructor !== undefined) {
				this.instance = Reflect.construct(eval(constructor.name), params);
				let result = constructor.action(params);
				if (result === undefined) result = null;
				outputs.push(result);
			} else {
				let result = Reflect.apply(eval(this.constructors[0].name + ".prototype." + input), this.instance, params);
				if (result === undefined) result = null;
				outputs.push(result);
			}
		}
		return outputs;
	}

}

//var commands = ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"];
//var params = [[], ["hello"], ["hello"], [], [], ["leet"], [], []];
//var commands = ["AllOne", "inc", "inc", "inc", "inc", "inc", "dec", "dec", "getMaxKey", "getMinKey"];
//var params = [[], ["a"], ["b"], ["b"], ["b"], ["b"], ["b"], ["b"], [], []];
//var commands = ["AllOne", "inc", "inc", "inc", "inc", "inc", "inc", "dec", "dec", "getMinKey", "dec", "getMaxKey", "getMinKey"];
//var params = [[], ["a"], ["b"], ["b"], ["c"], ["c"], ["c"], ["b"], ["b"], [], ["a"], [], []];
//var commands = ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "dec", "dec", "getMinKey", "inc", "getMinKey"];
//var params = [[], ["hello"], ["hello"], [], [], ["hello"], ["hello"], [], ["hello"], []];
var commands = ["AllOne", "inc", "inc", "inc", "dec", "inc", "inc", "getMaxKey", "dec", "dec", "dec", "getMaxKey"];
var params = [[], ["hello"], ["world"], ["hello"], ["world"], ["hello"], ["leet"], [], ["hello"], ["hello"], ["hello"], []];
var executor = new CommandExecutor().addContructor("AllOne").addMethods(["inc", "dec", "getMaxKey", "getMinKey"]);
var output = executor.execute(commands, params);
console.log(output);

