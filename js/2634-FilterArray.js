/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
    let filteredArr = new Array();
    for (let i = 0; i<arr.length; i++) {
        if (Boolean(fn(arr[i], i))) {
            filteredArr.push(arr[i]);
        }
    }
    return filteredArr;
};
