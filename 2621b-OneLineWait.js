const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

console.time();
sleep(100).then(() => console.timeEnd());

