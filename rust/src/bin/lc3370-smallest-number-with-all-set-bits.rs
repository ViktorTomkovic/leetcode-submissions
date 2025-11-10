struct Solution {}
impl Solution {
    pub fn smallest_number(n: i32) -> i32 {
        let ones = [1,3,7,15,31,63,127,255,511,1023];
        *(ones.iter().find(|&one| *one >= n).unwrap())
    }
}

fn main() {
    assert_eq!(15, Solution::smallest_number(10));
    assert_eq!(3, Solution::smallest_number(3));
    println!("Hello, world!");
}
