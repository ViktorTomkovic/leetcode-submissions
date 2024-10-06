/**
* @param {number[]} skill
* @return {number}
*/
var dividePlayers = function(skill) {
	let sum = 0;
	const frequency = new Array(1001).fill(0);
	let i = 0; // don't do this if you are sane
	// for (i = 0; i < skill.length; i++) {}
	for (i = 0; i < skill.length; i++) { sum += skill[i]; frequency[skill[i]]++; }
	const pairSkill = sum / (skill.length / 2);
	const halfSkill = pairSkill / 2;
	for (i = 0; i < pairSkill - 1000; i++) if (frequency[i] > 0) return -1;
	for (i = pairSkill + 1; i < 1001; i++) if (frequency[i] > 0) return -1;
	let chemistry = 0;
	for (let i = Math.max(1, pairSkill - 1000); i < halfSkill; i++) {
		if (frequency[i] != frequency[pairSkill - i]) return -1;
		chemistry += frequency[i] * (i * (pairSkill - i));
	}
	if ((pairSkill & 1) == 0) {
		chemistry += (frequency[halfSkill] / 2) * (halfSkill * halfSkill);
	}
	return chemistry;
};

var skill = [2, 2, 2, 2]
console.log(dividePlayers(skill));
var skill = [5,3,7,1]
console.log(dividePlayers(skill));
//var skill = [3, 2, 5, 1, 3, 4]
//console.log(dividePlayers(skill));

//Input: skill = [3,2,5,1,3,4]
//Output: 22
//Explanation:
//Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
//The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.

//var skill = [3, 4]
//console.log(dividePlayers(skill));
//
//var skill = [1, 1, 3, 4]
//console.log(dividePlayers(skill));
//
//var skill = [1, 1000]
//console.log(dividePlayers(skill));
