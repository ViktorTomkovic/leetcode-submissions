struct Solution {}

impl Solution {
    pub fn number_of_beams(bank: Vec<String>) -> i32 {
        let mut result: i32 = 0;
        let filtered: Vec<i32> = bank
            .iter()
            .map(|s| s.chars().filter(|&c| c == '1').count())
            .filter(|a| *a > 0)
            .map(|a| i32::try_from(a).unwrap())
            .collect();

        // 1. try
        // for i in 1..filtered.len() {
        //     let sum = filtered[i] * filtered[i - 1];
        //     result += sum;
        // }
        // 2. try
        // result += filtered
        //     .windows(2)
        //     .map(|w| w[0] * w[1])
        //     .fold(0, |acc, e| acc + e);
        // 3. try
        let sum: i32 = filtered.windows(2).map(|w| w[0] * w[1]).sum();
        result += sum;
        result
    }
}

fn main() {
    let bank: Vec<String> = ["011001", "000000", "010100", "001000"]
        .map(|a| a.into())
        .to_vec();
    let res = Solution::number_of_beams(bank);
    println!("{}", res);
    for i in 0..1 {
        println!("{}", i);
    }
}
