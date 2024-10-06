var TimeLimitedCache = function() {
	this.cache = new Map();
	this.timers = new Map();
};

/** 
* @param {number} key
* @param {number} value
* @param {number} duration time until expiration in ms
* @return {boolean} if un-expired key already existed
*/
TimeLimitedCache.prototype.set = function(key, value, duration) {
	let result = this.timers.has(key);
	if (result) {
		clearTimeout(this.timers.get(key));
	}
	let handler = () => {
		this.timers.delete(key);
		this.cache.delete(key);
	};
	let timerId = setTimeout(handler, duration);
	this.timers.set(key, timerId);
	this.cache.set(key, value);
	return result;
};

/** 
* @param {number} key
* @return {number} value associated with key
*/
TimeLimitedCache.prototype.get = function(key) {
	return this.cache.get(key) ?? -1;
};

/** 
* @return {number} count of non-expired keys
*/
TimeLimitedCache.prototype.count = function() {
	return this.cache.size;
};


const timeLimitedCache = new TimeLimitedCache()
console.log(timeLimitedCache.count()) // 1
console.log(timeLimitedCache.get(1)) // 42
console.log(timeLimitedCache.set(1, 42, 1000)); // false
console.log(timeLimitedCache.get(1)) // 42
console.log(timeLimitedCache.count()) // 1
//
//var TimeLimitedCache = class {
//	constructor() {
//		this.cache = new Map();
//		this.timers = new Map();
//	}
//	/**
//	 *	* @param {number} key
//	 *		* @param {number} value
//	 *			* @param {number} duration time until expiration in ms
//	 *				* @return {boolean} if un-expired key already existed
//	 *					*/
//	set(key, value, duration) {
//		let result = this.timers.has(key);
//		if (result) {
//			clearTimeout(this.timers.get(key));
//		}
//		let handler = () => {
//			this.timers.delete(key);
//			this.cache.delete(key);
//		};
//		let timerId = setTimeout(handler, duration);
//		this.timers.set(key, timerId);
//		this.cache.set(key, value);
//		return result;
//	}
//	/**
//	 *	* @param {number} key
//	 *		* @return {number} value associated with key
//	 *			*/
//	get(key) {
//		return this.cache.get(key) ?? -1;
//	}
//	/**
//	 *	* @return {number} count of non-expired keys
//	 *		*/
//	count() {
//		return this.cache.size;
//	}
//};
//
