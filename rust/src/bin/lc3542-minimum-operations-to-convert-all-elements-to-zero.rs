impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let mut stack = Vec::<i32>::new();
        let mut result = 0i32;
        for num in nums {
            while stack.last().map_or(false, |&last| num < last) {
                stack.pop();
                result += 1;
            }
            if num == 0 {
                continue;
            }
            while stack.last().map_or(false, |&last| num == last) {
                stack.pop();
            }
            stack.push(num);
        }
        // dbg!(&stack);
        result + stack.len() as i32
    }
}

struct Solution {}

pub fn main() {
    assert_eq!(1, Solution::min_operations(vec![0, 2]));
    assert_eq!(3, Solution::min_operations(vec![3, 1, 2, 1]));
    assert_eq!(4, Solution::min_operations(vec![1, 2, 1, 2, 1, 2]));
    println!("Hello, World!");
}
