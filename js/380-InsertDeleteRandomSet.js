var RandomizedSet = class {
	constructor() {
		/**
		 * @type {Map<number, number>}
		 * @description Value -> Position
		 */
		this.positions = new Map();
		this.values = new Int32Array();
	}
	/**
	 * @param {number} val
	 * @return {boolean}
	 */
	insert(val) {
		if (this.positions.has(val)) {
			return false;
		}
		this.positions.set(val, this.values.length);
		this.values.push(val);
		return true;
	}
	/**
	 * @param {number} val
	 * @return {boolean}
	 */
	remove(val) {
		if (!this.positions.has(val)) {
			return false;
		}
		const position = this.positions.get(val);
		const temp = this.values[this.values.length - 1];
		this.values[position] = temp;
		this.positions.set(temp, position);
		this.positions.delete(val);
		this.values.pop(); // Assuming this is O*(1)
		return true;
	}
	/**
	 * @return {number}
	 */
	getRandom() {
		return this.values[Math.floor(Math.random() * this.values.length)];
	}
};
/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
