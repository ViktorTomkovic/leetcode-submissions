impl Solution {
    pub fn internal(larger: i32, smaller: i32) -> i32 {
        let base = larger / smaller;
        base + match larger - base * smaller {
            0 => 0,
            remainder => Self::internal(smaller, remainder)
        }
    }
    pub fn count_operations(num1: i32, num2: i32) -> i32 {
        if num1 == 0 || num2 == 0 {
            0
        } else {
            match num1.cmp(&num2) {
                std::cmp::Ordering::Greater => Self::internal(num1, num2),
                _ => Self::internal(num2, num1),
            }
        }
    }
}

struct Solution {}

fn main() {
    let num1 = 2;
    let num2 = 3;
    let result = Solution::count_operations(num1, num2);
    assert_eq!(3, result);
    let num1 = 10;
    let num2 = 10;
    let result = Solution::count_operations(num1, num2);
    assert_eq!(1, result);
    println!("Hello, World!");
}
