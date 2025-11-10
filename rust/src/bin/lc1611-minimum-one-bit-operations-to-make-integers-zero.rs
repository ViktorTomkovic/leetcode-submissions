impl Solution {
    pub fn minimum_one_bit_operations(n: i32) -> i32 {
        match n {
            0b0000 => 0,
            0b0001 => 1,
            0b0011 => 2,
            0b0010 => 3,
            0b0110 => 4,
            0b0111 => 5,
            0b0101 => 6,
            0b0100 => 7,
            0b1100 => 8,
            0b1101 => 9,
            0b1111 => 10,
            0b1110 => 11,
            0b1010 => 12,
            0b1011 => 13,
            0b1001 => 14,
            0b1000 => 15,
            x => {
                let curr_power = ((x as u64 + 1).next_power_of_two() / 2) as i32;
                let remainder = (Self::minimum_one_bit_operations(x - curr_power));
                let ops = 2 * curr_power  - 1;
                ops - remainder
            }
        }
    }
}

struct Solution {}

fn main() {
    let n = 3;
    let result = Solution::minimum_one_bit_operations(n);
    assert_eq!(2, result);
    let n = 24;
    let result = Solution::minimum_one_bit_operations(n);
    assert_eq!(16, result);
    let n = 16;
    let result = Solution::minimum_one_bit_operations(n);
    assert_eq!(31, result);
    println!("Hello, World!");
}
