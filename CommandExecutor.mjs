export class MethodCommand {
	/** @type {string} */
	name;
}
export class ConstructorCommand {
	/** @type {string} */
	name;
	/** @type {ReturnFn} */
	action;
}

export class CommandExecutor {
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
