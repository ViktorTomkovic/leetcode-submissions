/**
 * @param {number[]} nums1 fist array
 * @param {number} m length of non-zero elements of the first array
 * @param {number[]} nums2 second array
 * @param {number} n length of the second array
 * @return {void} Do not return anything, modify nums1 in-place instead.
 **/
var merge = function(nums1, m, nums2, n) {
	var p1 = 0;
	var p2 = 0;
	var p3 = 0;
	var nums3 = nums1.slice(0, m);

	var currentNumber = Number.MIN_SAFE_INTEGER; // MIN_VALUE?
	while (p2 < n) {
		currentNumber = nums2[p2];
		while (p3 < m && nums3[p3] <= currentNumber) {
			nums1[p1] = nums3[p3];
			p1++;
			p3++;
		}
		nums1[p1] = currentNumber;
		p1++;
		p2++;
	}
	while (p3 < m) {
		nums1[p1] = nums3[p3];
		p1++;
		p3++;
	}
};

var nums1 = [2, 0];
var m = 1;
var nums2 = [1];
var n = 1;

merge(nums1, m, nums2, n);
console.log(nums1);
