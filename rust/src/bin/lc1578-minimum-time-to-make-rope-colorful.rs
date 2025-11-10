struct Solution {}
impl Solution {
    pub fn min_cost(colors: String, needed_time: Vec<i32>) -> i32 {
        let chars: Vec<char> = colors.chars().collect();
        let n = chars.len();
        let mut i: usize = 0;
        let mut result = 0;

        while i < n {
            let mut j = i;
            let mut max = 0;
            let mut sum = 0;
            while (j < n) && (chars[j] == chars[i]) {
                max = std::cmp::max(max, needed_time[j]);
                sum += needed_time[j];
                j += 1;
            }
            result += sum - max;
            i = j;
        }
        result
    }
}
fn main () {
    assert_eq!(3, Solution::min_cost(String::from("abaac"), vec![1,2,3,4,5]));
    println!("Hello, World!");
}
