
var RandomizedSet = function() {
	/**
	 * @type {Map<number, number>}
	 * @description Value -> Position
	 */
	this.positions = new Map();
	/**
	 * @type {Map<number, number>}
	 * @description Position -> Value
	 */
	this.values = new Map();
	this.storedValues = 0;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
	const result = this.positions.has(val);
	if (!result) {
		this.positions.set(val, this.storedValues);
		this.values.set(this.storedValues, val);
		this.storedValues++;
	}
	return !result;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
	const result = this.positions.has(val);
	if (result) {
		const position = this.positions.get(val);
		this.positions.delete(val);
		this.values.delete(position);
		/* real life implementation would have some reduction of this.storedValues here
		if (this.positions.size < this.storedValues / 2) {};
		*/
	};
	return result;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
	const rn = Math.floor(Math.random() * this.positions.size);
	let iterator = this.values.values();
	let result = null;
	for (let i = 0; i <= rn; i++) {
		result = iterator.next();
	}
	
	return result.value;
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
