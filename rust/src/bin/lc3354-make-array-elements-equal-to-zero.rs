struct Solution {}
impl Solution {
    pub fn count_valid_selections(nums: Vec<i32>) -> i32 {
        let mut result = 0;
        let len = nums.len();
        let sum: i32 = nums.iter().sum();
        let half = sum / 2;
        if sum == 0 {
            return 2 * len as i32;
        }
        if len == 1 {
            return 0
        }

        // from left (finds zeroes and goes right as a first dir
        let mut partial_sum_from_left = 0;
        let mut i_from_left = 0;
        while partial_sum_from_left < half {
            partial_sum_from_left += nums[i_from_left];
            i_from_left += 1;
        }

        match partial_sum_from_left == half {
            false => (),
            true => {
                let mut j_from_left = i_from_left;
                while j_from_left < len && nums[j_from_left] == 0 {
                    j_from_left += 1;
                }
                result += (j_from_left - i_from_left) as i32;
            }
        }

        // from right - probably could be written as count of zeroes and sum - half < 1 etc.
        let mut partial_sum_from_right = 0;
        let mut i_from_right = len - 1;
        while partial_sum_from_right < half {
            partial_sum_from_right += nums[i_from_right];
            i_from_right -= 1;
        }

        match partial_sum_from_right == half {
            false => (),
            true => {
                let mut j_from_right = i_from_right;
                while nums[j_from_right] == 0 {
                    j_from_right -= 1;
                }
                result += (i_from_right - j_from_right) as i32;
            }
        }

        result
    }
}

fn main() {
    let result_1 = Solution::count_valid_selections(vec![1, 0, 2, 0, 3]);
    assert_eq!(2, result_1);
    let result_2 = Solution::count_valid_selections(vec![2, 3, 4, 0, 4, 1, 0]);
    assert_eq!(0, result_2);
    let result_3 = Solution::count_valid_selections(vec![16, 13, 10, 0, 0, 0, 10, 6, 7, 8, 7]);
    assert_eq!(3, result_3);
    let result_4 = Solution::count_valid_selections(vec![0]);
    assert_eq!(2, result_4);

    let result_5 = Solution::count_valid_selections(vec![5,0,1,1,1]);
    assert_eq!(0, result_5);
    let result_6 = Solution2::count_valid_selections(vec![5,0]);
    assert_eq!(0, result_6);

    println!("Hello, world!");
}

struct Solution2 {}
impl Solution2 {
    pub fn count_valid_selections(nums: Vec<i32>) -> i32 {
        let len: usize = nums.len();
        if len == 1{
            return 2;
        }
        let mut prefix: Vec<i32> = Vec::with_capacity(len);
        prefix.push(nums[0]);
        for i in 1..len{
            prefix.push(nums[i] + prefix[i-1]);
        }
        let total:i32 = prefix[len-1];
        
        let mut result:i32 = 0;

        if total == 0{
            if nums[0] == 0{
                result+=2;
            }
            if nums[len-1] == 0{
                result+=2;
            }
        }else if total == 1{
            if nums[0] == 0{
                result+=1;
            }
            if nums[len-1] == 0{
                result+=1;
            }
        }

        for i in 1..len-1 {
            if nums[i] == 0 {
                let diff = (total - prefix[i] - prefix[i-1]).abs();
                result+= if diff == 0 {2} else if diff == 1 {1} else {0};
            }

        } 

        return result;
    }
}

