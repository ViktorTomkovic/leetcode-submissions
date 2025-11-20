//use std::collections::VecDeque;

impl Solution {
    pub fn number_of_substrings(s: String) -> i32 {
        let chars: Vec<char> = s.chars().collect();
        let n = chars.len();
        let mut pre = vec![-1i32; n + 1];
        for i in 0..n {
            if i == 0 || chars[i - 1] == '0' {
                pre[i + 1] = i as i32;
            } else {
                pre[i + 1] = pre[i];
            };
        }

        let mut result = 0i32;
        for i in 1..=n {
            let mut zeroes = if chars[i - 1] == '0' { 1 } else { 0 };
            let mut j = i as i32;
            while j > 0 && (zeroes * zeroes) as usize <= n {
                let ones = (i as i32 - pre[j as usize]) - zeroes;
                if zeroes * zeroes <= ones {
                    result += std::cmp::min(j - pre[j as usize], ones - zeroes * zeroes + 1);
                }
                j = pre[j as usize];
                zeroes += 1;
            }
        }
        result
    }
}

// I am giving up. :-/ Apparently it was quite close to an optimal solution -
// just do checking backwards (i.e. right is fixed and left goes from right to
// zero), so it will skip adding and removing to next_zeroes.
// impl Solution {
//     pub fn number_of_substrings(s: String) -> i32 {
//         let n = s.len() as i32;
//         let mut next_zeroes: VecDeque<i32> = s
//             .char_indices()
//             .filter_map(|(i, c)| if c == '0' { Some(i as i32) } else { None })
//             .collect();
//         next_zeroes.push_back(n);
//
//         let mut result = 0;
//         let mut right = -1;
//         for left in 0..n {
//             next_zeroes.push_front(right);
//             // dbg!((left, &next_zeroes));
//             right = *next_zeroes.front().unwrap();
//             // dbg!(right);
//             while right < left {
//                 right = next_zeroes.pop_front().unwrap();
//                 // dbg!(right);
//             }
//             // dbg!(&next_zeroes);
//             let mut ones = right - left;
//             let mut zeroes = 0;
//             let mut prev_zero_index = left;
//             for &next_zero_index in &next_zeroes {
//                 ones += next_zero_index - prev_zero_index - 1;
//                 let square = zeroes * zeroes;
//                 if ones > square {
//                     dbg!((left, ones, zeroes, prev_zero_index, next_zero_index));
//                     result += dbg!(ones - square);
//                 }
//                 if square > (n - left) {
//                     break;
//                 }
//                 zeroes += 1;
//                 prev_zero_index = next_zero_index;
//             }
//         }
//         result as i32
//     }
// }

// impl SolutionSlow {
//     pub fn number_of_substrings(s: String) -> i32 {
//         let mut prefix_sum = Vec::new();
//         let mut sum = 0;
//         prefix_sum.push(0);
//         for c in s.chars() {
//             if c == '1' {
//                 sum += 1;
//             }
//             prefix_sum.push(sum);
//         }
//         let mut result = 0;
//         for i in 0..s.len() {
//             let max_length = s.len() - i;
//             for j in i..s.len() {
//                 let ones = prefix_sum[j + 1] - prefix_sum[i];
//                 // dbg!((ones, i, j));
//                 let zeroes = (j - i + 1) - ones;
//                 let needed = zeroes * zeroes;
//                 if needed > max_length {
//                     break;
//                 }
//                 // dbg!(ones * 100 + zeroes);
//                 if ones >= needed {
//                     result += 1;
//                     // dbg!(result);
//                 };
//             }
//         }
//         result
//     }
// }

struct Solution {}

pub fn main() {
    assert_eq!(5, Solution::number_of_substrings("00011".to_string()));
    assert_eq!(16, Solution::number_of_substrings("101101".to_string()));
    println!("Hello, World!");
}
