function areSentencesSimilar(sentence1: string, sentence2: string): boolean {
	if (sentence1 === sentence2) return true;
	const words1 = sentence1.split(" ");
	const words2 = sentence2.split(" ");
	const shorter = Math.min(words1.length, words2.length);

	console.log(words1);
	console.log(words2);
	let leftBarrier: number;
	for (leftBarrier = 0;
		words1[leftBarrier] === words2[leftBarrier]
		&& leftBarrier < words1.length
		&& leftBarrier < words2.length;
		leftBarrier++) {
	}
	console.log(leftBarrier);
	let rightBarrier: number;
	for (rightBarrier = 0;
		leftBarrier + rightBarrier < shorter
		&& rightBarrier < words1.length
		&& rightBarrier < words2.length
		&& words1[words1.length - 1 - rightBarrier] === words2[words2.length - 1 - rightBarrier]
		;
		rightBarrier++) {
		console.log(words1[words1.length - 1 - rightBarrier], words2[words2.length - 1 - rightBarrier]);
	}
	console.log(rightBarrier);

	return shorter <= leftBarrier + rightBarrier;
};

var sentence1: string = "My name is Haley", sentence2 = "My Haley";
console.log(areSentencesSimilar(sentence1, sentence2));

var sentence1 = "of", sentence2 = "A lot of words";
console.log(areSentencesSimilar(sentence1, sentence2));

var sentence1 = "Eating right now", sentence2 = "Eating";
console.log(areSentencesSimilar(sentence1, sentence2));
