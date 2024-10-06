/**
* @param {number} millis
* @return {Promise}
*/
async function sleep(millis) {
	return new Promise((res) => setTimeout(res, millis));
}

console.time();
await sleep(1000);
console.timeEnd();

