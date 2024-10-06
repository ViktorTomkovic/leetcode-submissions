/**
* @param {Function} fn
* @param {number} t
* @return {Function}
*/
var timeLimitTry = function(fn, t) {
	return async function(...args) {
		// if we want to use throw/reject with setTimeout we still need to wrap it with Promise..
		return new Promise(async (resolve, reject) => {
			var timer = setTimeout(() => reject("Time Limit Exceeded"), t);
			try {
				resolve(await fn(...args));
			} catch (err) {
				reject(err);
			} finally {
				clearTimeout(timer);
			}
		});
	};
}

/**
* @param {Function} fn
* @param {number} t
* @return {Function}
*/
var timeLimitAsyncFunction = function(fn, t) {
	return async function(...args) {
		// this shows that async await syntax sugar is not expressive enough.. see timeLimitTry
		reject("tle");
		try {
			setTimeout(() => { throw new Error("Time Limit Exceeded"); }, t);
			return await fn(...args);
		} catch (tle) {
			return tle.message
		}
	}

	//return async function(...args) {
	//	return new Promise((_resolve, reject) => { setTimeout(() => reject("Time Limit Exceeded"), t); });
	//}
};
/**
* @param {Function} fn
* @param {number} t
* @return {Function}
*/
var timeLimit2 = function(fn, t) {
	return async function(...args) {
		return new Promise((resolve, reject) => {
			setTimeout(() => reject("Time Limit Exceeded", t), t);
			fn(...args).then(resolve).catch(reject);
		});
	}
};
/**
* @param {Function} fn
* @param {number} t
* @return {Function}
*/
var timeLimitOriginal = function(fn, t) {
	return async function(...args) {
		// Promise.race is causing the program to wait until all Promises are finished!
		return Promise.race([
			fn(...args),
			new Promise((_resolve, reject) => { setTimeout(() => reject("Time Limit Exceeded"), t); })
		]);
	}

	//return async function(...args) {
	//	return new Promise((_resolve, reject) => { setTimeout(() => reject("Time Limit Exceeded"), t); });
	//}
};


async function main() {
	//const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
	//limited(50).catch(console.log) // "Time Limit Exceeded" at t=100ms

	var fn = async (n) => {
		await new Promise(res => setTimeout(res, 10000));
		return n * n;
	}
	var inputs = [5]
	var t = 1500

	const timeLimit = timeLimitTry;
	const limited = timeLimit(fn, t)
	const start = performance.now()
	let result;
	try {
		const res = await limited(...inputs)
		result = { "resolved": res, "time": Math.floor(performance.now() - start) };
	} catch (err) {
		result = { "rejected": err, "time": Math.floor(performance.now() - start) };
	}
	console.log(result) // Output
}

main()
