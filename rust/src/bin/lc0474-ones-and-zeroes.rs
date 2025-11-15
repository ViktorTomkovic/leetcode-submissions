// This is complete misunderstanding
// impl Solution {
//     pub fn find_max_form(strs: Vec<String>, m: i32, n: i32) -> i32 {
//         let mut copy = strs.clone();
//         copy.sort();
//         copy.dedup();
//         copy.iter()
//             .filter(|&str| {
//                 let (zeroes, ones) = str.chars().fold((0, 0), |(zeroes, ones), val| match val {
//                     '0' => (zeroes + 1, ones),
//                     '1' => (zeroes, ones + 1),
//                     _ => (zeroes, ones),
//                 });
//                 (zeroes <= m) && (ones <= n)
//             })
//             .count() as i32
//     }
// }

impl Solution {
    pub fn find_max_form(strs: Vec<String>, m: i32, n: i32) -> i32 {
        let mut rucksack = [[0i32; 101]; 101];
        for str in strs {
            let zeroes = str.chars().filter(|&c| c == '0').count() as usize;
            let ones = str.len() - zeroes;
            for i in (zeroes..101).rev() {
                for j in (ones..101).rev() {
                    rucksack[i][j] =
                        std::cmp::max(rucksack[i][j], rucksack[i - zeroes][j - ones] + 1);
                };
            };
        };
        rucksack[m as usize][n as usize]
    }
}

struct Solution {}

macro_rules! vec_of_strings {
    ($($x:expr),*) => (vec![$($x.to_string()),*]);
}

pub fn main() {
    let strs = vec_of_strings!["10", "0001", "111001", "1", "0"];
    assert_eq!(4, Solution::find_max_form(strs, 5, 3));
    let strs = vec_of_strings!["10", "1", "0"];
    assert_eq!(2, Solution::find_max_form(strs, 1, 1));
    let strs = vec_of_strings!["10", "0001", "111001", "1", "0", "0"];
    assert_eq!(4, Solution::find_max_form(strs, 5, 3));
    println!("Hello, World!");
}
