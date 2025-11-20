impl Solution {
    pub fn find_final_value(nums: Vec<i32>, original: i32) -> i32 {
        let mut current = original;
        let mut sorted = nums.clone();
        sorted.sort();
        for i in 0..sorted.len() {
            if sorted[i] == current {
                current *= 2;
            }
        }
        current
    }
}

struct Solution {}

pub fn main() {
    assert_eq!(24, Solution::find_final_value([5,3,6,1,12].to_vec(), 3));
    assert_eq!(4, Solution::find_final_value([2,7,9].to_vec(), 4));
    println!("Hello, World!");
}
