#!/usr/bin/env node

/**
* @param {number} millis
* @return {Promise}
*/
async function sleep(millis) {
	return new Promise((res) => setTimeout(res, millis));
}

async function main() {
	console.time();
	await sleep(1000);
	console.timeEnd();
}

// POSIX compliant apps should report an exit status
main()
	.then(() => {
		process.exit(0);
	})
	.catch(err => {
		console.error(err); // Writes to stderr
		process.exit(1);
	});
