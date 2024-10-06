
var AllOne = class {
	constructor() {
		/** @type {Map<string, number>} */
		this.keys = new Map();
		/** @type {Map<number, Set<string>} */
		this.counts = new Map();
		/** @type {number} */
		this.min = 0;
		/** @type {number} */
		this.max = 0;
	}
	/**
	 * @param {string} key
	 * @return {void}
	 */
	inc(key) {
		if (this.keys.has(key)) {
			let value = this.keys.get(key);
			this.keys.set(key, value + 1);
			let bin = this.counts.get(value);
			if (bin == undefined) {
				bin = new Set();
			}
			bin.delete(key);
			if (bin.size == 0) {
				this.counts.delete(value);
				if (value == this.min) {
					this.min++;
				}
			}
			let bin2 = this.counts.get(value + 1);
			if (bin2 === undefined) {
				bin2 = new Set();
			}
			bin2.add(key);
			this.counts.set(value + 1, bin2);
			if (value == this.max) {
				this.max++;
			}
		} else {
			this.keys.set(key, 1);
			let bin = this.counts.get(1);
			if (bin === undefined) {
				bin = new Set();
				if (this.max == 0) {
					this.max = 1;
				}
			}
			if (this.min !== 1) {
				this.min = 1;
			}
			bin.add(key);
			this.counts.set(1, bin);
		}
	}
	/**
	 * @param {string} key
	 * @return {void}
	 */
	dec(key) {
		// it is "guaranteed" that key exists in the data structure..
		let value = this.keys.get(key);
		let bin = this.counts.get(value);
		bin.delete(key);
		if (bin.size == 0) {
			this.counts.delete(value);
			if (value === this.max) {
				this.max--;
			}
			if (value === this.min) {
				this.min--;
			}
			if (this.min === 0) {
				if (this.max != 0) {
					// O(n) :(
					this.min = Number.MAX_SAFE_INTEGER;
					for (let argh of this.counts.keys()) {
						this.min = Math.min(this.min, argh);
					}
				}
			}
		} else {
			this.counts.set(value, bin);
		}
		if (value > 1) {
			this.keys.set(key, value - 1);
			let bin1 = this.counts.get(value - 1);
			if (bin1 === undefined) {
				bin1 = new Set();
			}
			bin1.add(key);
			this.counts.set(value - 1, bin1);
			if (value === this.min) {
				this.min--;
			}
		} else {
			this.keys.delete(key);
		}
	}
	/**
	 * @return {string}
	 */
	getMaxKey() {
		if (this.max == 0) return "";
		let bin = this.counts.get(this.max);
		return bin.values().next().value;
	}
	/**
	 * @return {string}
	 */
	getMinKey() {
		if (this.min == 0) return "";
		let bin = this.counts.get(this.min);
		return bin.values().next().value;
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
//var commands = ["AllOne","inc","inc","inc","inc","inc","inc","dec", "dec","getMinKey","dec","getMaxKey","getMinKey"];
//var params = [[],["a"],["b"],["b"],["c"],["c"],["c"],["b"],["b"],[],["a"],[],[]];
var commands = ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "dec", "dec", "getMinKey", "inc", "getMinKey"];
var params = [[], ["hello"], ["hello"], [], [], ["hello"], ["hello"], [], ["hello"], []];
var executor = new CommandExecutor().addContructor("AllOne").addMethods(["inc", "dec", "getMaxKey", "getMinKey"]);
var output = executor.execute(commands, params);
console.log(output);

