/**
* @param {Promise} promise1
* @param {Promise} promise2
* @return {Promise}
*/
var addTwoPromises = async function(promise1, promise2) {
	return (await Promise.all([promise1, promise2])).reduce((acc, val) => acc + val, 0);
};
var addTwoPromises3 = async function(promise1, promise2) {
	const [result1, result2] = await Promise.all([promise1, promise2]);
	return result1 + result2;
};
var addTwoPromises2 = async function(promise1, promise2) {
	return await Promise.allSettled([promise1, promise2]).then(results => results.reduce((acc, val) => acc + val.value, 0));
};

addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log); // 4

/**
* addTwoPromises(Promise.resolve(2), Promise.resolve(2))
*   .then(console.log); // 4
*/

var promise1 = new Promise(resolve => setTimeout(() => resolve(2), 1000));
var promise2 = new Promise(resolve => setTimeout(() => resolve(5), 2000));
addTwoPromises(promise1, promise2).then(console.log);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition
