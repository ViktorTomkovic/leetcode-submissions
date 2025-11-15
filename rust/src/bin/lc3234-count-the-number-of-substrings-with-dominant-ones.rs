impl Solution {
    pub fn number_of_substrings(s: String) -> i32 {
        let mut prefix_sum = Vec::new();
        let mut sum = 0;
        prefix_sum.push(0);
        for c in s.chars() {
            if c == '1' {
                sum += 1;
            }
            prefix_sum.push(sum);
        }
        let mut result = 0;
        for i in 0..s.len() {
            for j in i..s.len() {
                let ones = prefix_sum[j + 1] - prefix_sum[i];
                // dbg!((ones, i, j));
                let zeroes = (j - i + 1) - ones;
                // dbg!(ones * 100 + zeroes);
                if ones >= (zeroes * zeroes) {
                    result += 1;
                    // dbg!(result);
                };
            }
        }
        result
    }
}

struct Solution {}

pub fn main() {
    assert_eq!(5, Solution::number_of_substrings("00011".to_string()));
    assert_eq!(16, Solution::number_of_substrings("101101".to_string()));
    println!("Hello, World!");
}
