function strStr(haystack: string, needle: string): number {
	return haystack.indexOf(needle);
};

let haystack, needle;
haystack = "sadbutsad", needle = "sad"; // 0
console.log(strStr(haystack,needle));

haystack = "leetcode", needle = "leeto"; // -1
console.log(strStr(haystack,needle));

