/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
	const timeToMins = (timeString) => {
		return 60 * (Number(timeString.substring(0, 2))) + Number(timeString.substring(3));
	};
	var times = timePoints.map(tp => timeToMins(tp)).sort((a, b) => a - b);
	times.push(times[0] + 60 * 24);
	let minDiff = Number.MAX_SAFE_INTEGER;
	for (let i = 1; i < times.length; i++) {
		if (times[i] - times[i - 1] < minDiff) {
			minDiff = times[i] - times[i - 1];
		}
	}
	return minDiff;
};

var timePoints = ["23:59", "00:00"];
console.log(findMinDifference(timePoints));

var timePoints = ["00:00", "23:59", "00:00"];
console.log(findMinDifference(timePoints));


