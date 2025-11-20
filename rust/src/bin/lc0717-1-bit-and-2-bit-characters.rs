impl Solution {
    pub fn is_one_bit_character(bits: Vec<i32>) -> bool {
        let mut i = 0;
        let n = bits.len();
        let mut is_last_onebit = false;
        while i < n {
            if bits[i] == 0 {
                is_last_onebit = true;
                i += 1;
            } else {
                is_last_onebit = false;
                i += 2;
            };
        };
        is_last_onebit
    }
}

struct Solution {}

pub fn main() {
    assert_eq!(true, Solution::is_one_bit_character([1,0,0].to_vec()));
    assert_eq!(false, Solution::is_one_bit_character([1,1,1,0].to_vec()));
    println!("Hello, World!");
}
