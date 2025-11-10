struct Solution {}

impl Solution {
    pub fn get_sneaky_numbers(nums: Vec<i32>) -> Vec<i32> {
        let mut frequency = [0; 100];
        nums.iter().for_each(|x| frequency[(*x) as usize] += 1);
        frequency
            .iter()
            .enumerate()
            .filter(|&(_, &element)| element == 2)
            .map(|(index, _)| index as i32)
            .collect()
    }
}

fn main() {
    assert_eq!(vec![0, 1], Solution::get_sneaky_numbers(vec![0, 1, 1, 0]));
    assert_eq!(
        vec![2, 3],
        Solution::get_sneaky_numbers(vec![0, 3, 2, 1, 3, 2])
    );
    assert_eq!(
        vec![4, 5],
        Solution::get_sneaky_numbers(vec![7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2])
    );
    println!("Hello, world!");
}
