/**
* @param {number} maxSize
*/
class CustomStack {
	constructor(maxSize) {
		/** @type {number} */
		this.maxSize = maxSize;
		/**@type {number} */
		this.index = 0;
		/**@type {Uint32Array} */
		this.stack = new Uint32Array(this.maxSize + 1);
		/** @type {Uint32Array} */
		this.inc = new Uint32Array(this.maxSize + 1).fill(0);
	}
	/**
	* @param {number} x
	* @return {void}
	*/
	push(x) {
		if (this.index == this.maxSize) return;
		this.stack[++(this.index)] = x;
	}
	/**
	* @return {number}
	*/
	pop() {
		if (this.index == 0) return -1;
		this.inc[this.index-1] += this.inc[this.index];
		let result = this.stack[this.index] + this.inc[this.index];
		this.inc[this.index] = 0;
		this.index--;
		return result;
	}
	/**
	* @param {number} k
	* @param {number} val
	* @return {void}
	*/
	increment(k, val) {
		this.inc[Math.min(k, this.index)] += val;
	}
}




/** 
* Your CustomStack object will be instantiated and called as such:
* var obj = new CustomStack(maxSize)
* obj.push(x)
* var param_2 = obj.pop()
* obj.increment(k,val)
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
var commands = ["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"];
var params = [[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]];
var executor = new CommandExecutor().addContructor("CustomStack").addMethods(["push", "pop", "increment"]);
var output = executor.execute(commands, params);
console.log(output);


