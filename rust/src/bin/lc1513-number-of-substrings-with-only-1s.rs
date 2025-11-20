impl Solution {
    pub fn num_sub(s: String) -> i32 {
        const MODULO: u64 = 1_000_000_007;
        let mut result: u64 = 0;
        let mut consecutive: u64 = 0;
        for c in s.chars() {
            if c == '0' {
                result += consecutive * (consecutive + 1) / 2;
                result %= MODULO;
                consecutive = 0;
            } else {
                consecutive += 1;
            };
        }
        result += consecutive * (consecutive + 1) / 2;
        result %= MODULO;
        result as i32
    }
}

impl Solution2 {
    pub fn num_sub(s: String) -> i32 {
        const MODULO: u64 = 1_000_000_007;
        let mut result: u64 = 0;
        let mut consecutive: u64 = 0;
        for c in s.chars() {
            result += ((c as u64).wrapping_sub('1' as u64))
                & ((consecutive * (consecutive + 1) / 2) % MODULO);
            consecutive = (('0' as u64).wrapping_sub(c as u64)) & (consecutive + 1);
        }
        result += consecutive * (consecutive + 1) / 2;
        result %= MODULO;
        result as i32
    }
}

struct Solution {}
struct Solution2 {}

pub fn main() {
    assert_eq!(9, Solution::num_sub("0110111".to_string()));
    assert_eq!(2, Solution::num_sub("101".to_string()));
    assert_eq!(21, Solution::num_sub("111111".to_string()));
    assert_eq!(21, Solution2::num_sub("111111".to_string()));
    println!("Hello, World!");
    dbg!(format!("{:o}", (0 as u64).wrapping_sub(1)));
    dbg!(format!("{:x}", (0 as u64).wrapping_sub(1)));
}
