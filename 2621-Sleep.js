/**
* @param {number} millis
* @return {Promise}
*/
async function sleep(millis) {
	return new Promise((res) => setTimeout(res, millis));
}

//console.time();
//(async() => await sleep(1500))();
//console.timeEnd();
Promise.resolve().then(() => console.time()).then(() => sleep(1500)).then(() => console.timeEnd());
