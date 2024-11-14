/**
* @param {number[]} robot
* @param {number[][]} factory
* @return {number}
*/
var minimumTotalDistance = function(robot, factory) {
	robot.sort((a, b) => a - b);
	factory.sort((a, b) => a[0] - b[0]);
	/** @type{Map<number, number>} */
	const minimumDistance = new Map();
	/** @type {number[]} */
	const ff = [];
	factory.forEach(f => { for (let i = 0; i < f[1]; i++) { ff.push(f[0]); } });
	const computeHash = (robotIndex, factoryIndex) => robotIndex * 100000 + factoryIndex;
	/** @param {number} robotIndex
	* @param {number} factoryIndex
	*/
	const md = (robotIndex, factoryIndex) => {
		if (factoryIndex == -1) {
			return robotIndex == -1 ? 0 : Number.POSITIVE_INFINITY;
		}
		if (robotIndex == -1) {
			return 0;
		}
		const hash = computeHash(robotIndex, factoryIndex);
		if (minimumDistance.has(hash)) {
			return minimumDistance.get(hash);
		}
		const distanceWhenFactoryNotChosen = md(robotIndex, factoryIndex - 1);
		const distanceWhenFactoryChosen = Math.abs(robot[robotIndex] - ff[factoryIndex]) + md(robotIndex - 1, factoryIndex - 1);
		const minDistance = Math.min(distanceWhenFactoryChosen, distanceWhenFactoryNotChosen);
		minimumDistance.set(hash, minDistance);
		return minDistance;
	}
	const result = md(robot.length - 1, ff.length - 1);
	return result;
};

var robot, factory;
//robot = [0, 4, 6], factory = [[2, 2], [6, 2]];
//console.log(minimumTotalDistance(robot, factory));
//
//robot = [1, -1], factory = [[-2, 1], [2, 1]];
//console.log(minimumTotalDistance(robot, factory));

robot = [9, 11, 99, 101], factory = [[10, 1], [7, 1], [14, 1], [100, 1], [96, 1], [103, 1]];
console.log(minimumTotalDistance(robot, factory));
