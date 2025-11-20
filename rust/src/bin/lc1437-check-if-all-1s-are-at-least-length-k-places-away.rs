impl SolutionSecond {
    pub fn k_length_apart(nums: Vec<i32>, k: i32) -> bool {
        let k = k as usize;
        let mut count = 0;
        let n = nums.len();
        for i in 0..k {
            if nums[i] == 1 {
                count += 1;
            }
        }
        if count > 1 {
            return false;
        }
        for i in k..n {
            if nums[i] == 1 {
                count += 1;
            }
            if count > 1 {
                return false;
            }
            if nums[i - k] == 1 {
                count -= 1;
            }
        }
        true
    }

    pub fn k_length_apart_copilot(nums: Vec<i32>, k: i32) -> bool {
        let mut last_one: Option<usize> = None;
        for (i, &num) in nums.iter().enumerate() {
            if num == 1 {
                if let Some(prev) = last_one {
                    if i - prev - 1 < k as usize {
                        return false;
                    }
                }
                last_one = Some(i);
            }
        }
        true
    }
}

impl Solution {
    pub fn k_length_apart(nums: Vec<i32>, k: i32) -> bool {
        nums.windows(k as usize + 1)
            .all(|w| w.iter().filter(|&&e| e == 1).count() <= 1)
    }
}

struct Solution {}
struct SolutionSecond {}

pub fn main() {
    let nums = [1, 0, 0, 0, 1, 0, 0, 1];
    let k = 2;
    assert_eq!(true, Solution::k_length_apart(nums.to_vec(), k));
    let nums = [1, 0, 0, 1, 0, 1];
    let k = 2;
    assert_eq!(false, Solution::k_length_apart(nums.to_vec(), k));
    println!("Hello, World!");
}
