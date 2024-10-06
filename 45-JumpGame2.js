var jump = function(nums) {
	if (nums.length == 1) {
		return 0;
	}
	let a = new Array(nums.length).fill(null);
	a[0] = 0;
	let nn = 1;
	for (let i = 0; i < nums.length; i++) {
		console.log(a);
		let curMin = a[i] + 1;
		let reach = i + 1 + nums[i];
		if (reach >= nums.length) {
			return curMin;
		}
		for (let j = nn; j < reach; j++) {
			a[j] = curMin;
		}
		nn = reach > nn ? reach : nn;
	}
	return a[nums.length - 1];
};

var a = [2, 3, 1, 1, 4];
console.log(jump(a));

var a = [2, 2, 1, 1, 4];
console.log(jump(a));

var a = [0];
console.log(jump(a));

var a = [3, 1, 1, 1, 1];
console.log(jump(a));

