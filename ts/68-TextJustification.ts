function fullJustify(words: string[], maxWidth: number): string[] {
	const lines = new Array<Array<string>>();
	let line = new Array<string>();
	let currentSpace = 0;
	const createSpace = (length: number): string => {
		let result = "";
		for (let i = 0; i < length; i++) {
			result += " ";
		}
		return result;
	};
	while (words.length) {
		const word = words.shift()!;
		currentSpace += word.length;
		if (currentSpace > maxWidth) {
			// justify full
			const currentWordCount = line.length >> 1;
			currentSpace -= word.length + currentWordCount;
			const spaces = maxWidth - currentSpace;
			if (currentWordCount > 1) {
				const space = Math.floor(spaces / (currentWordCount - 1));
				const space1 = spaces % (currentWordCount - 1);
				let counter = 0;
				line.pop();
				for (let i = 1; i < line.length; i = i + 2) {
					if (counter < space1) {
						line[i] = createSpace(space + 1);
						counter++;
					} else {
						line[i] = createSpace(space);
					}
				}
			} else {
				line[1] = createSpace(spaces);
			}
			// end of justify full
			lines.push(line);
			line = new Array<string>();
			line.push(word);
			line.push(" ");
			currentSpace = word.length;
		} else {
			line.push(word);
			line.push(" ");
		}
		currentSpace++;
	}
	// justify left
	currentSpace--;
	line.pop();
	line.push(createSpace(maxWidth - currentSpace));
	// end of justify left
	lines.push(line);
	return lines.map((line) => line.join(""));
}

let words, maxWidth;
//words = ["This", "is", "an", "example", "of", "text", "justification."],
//	maxWidth = 16;
//console.log(fullJustify(words, maxWidth));
//
//words = ["What", "must", "be", "acknowledgment", "shall", "be"], maxWidth = 16;
//console.log(fullJustify(words, maxWidth));
//
//words = [
//	"Science",
//	"is",
//	"what",
//	"we",
//	"understand",
//	"well",
//	"enough",
//	"to",
//	"explain",
//	"to",
//	"a",
//	"computer.",
//	"Art",
//	"is",
//	"everything",
//	"else",
//	"we",
//	"do",
//], maxWidth = 20;
//console.log(fullJustify(words, maxWidth));

words = [
	"ask",
	"not",
	"what",
	"your",
	"country",
	"can",
	"do",
	"for",
	"you",
	"ask",
	"what",
	"you",
	"can",
	"do",
	"for",
	"your",
	"country",
], maxWidth = 16;
console.log(fullJustify(words, maxWidth));
