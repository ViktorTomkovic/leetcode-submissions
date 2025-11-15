impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let mut divider = 0;
        let mut one_count = 0;

        for &num in &nums {
            divider = Self::gcd(divider, num);
            if num == 1 {
                one_count += 1;
            };
        }

        match one_count >= 1 {
            true => nums.len() as i32 - one_count,
            false => match divider > 1 {
                true => -1,
                false => Self::solve(&nums),
            },
        }
    }

    fn gcd(mut a: i32, mut b: i32) -> i32 {
        while b != 0 {
            let temp = b;
            b = a % b;
            a = temp;
        }
        a
    }

    /// Finds a smallest consecutive slice which reduces common dominator to one.
    fn solve(nums: &[i32]) -> i32 {
        let n = nums.len();
        let mut min_len = n;
        for i in 0..n {
            let mut divider = 0;
            for j in i..n {
                divider = Self::gcd(divider, nums[j]);
                if divider == 1 {
                    min_len = min_len.min(j - i + 1);
                    break;
                }
            }
        }
        (min_len + n - 2) as i32
    }
}

struct Solution {}

pub fn main() {
    assert_eq!(4, Solution::min_operations(vec![2, 6, 3, 4]));
    assert_eq!(-1, Solution::min_operations(vec![2, 10, 6, 14]));
    println!("Hello, World!");
}
