impl Solution {
    pub fn intersection_size_two(mut intervals: Vec<Vec<i32>>) -> i32 {
        intervals.sort_unstable_by(|v1, v2| v1[1].cmp(&v2[1]).then(v2[0].cmp(&v1[0])));
        let mut result = 0;
        let mut prev = None;
        for curr in intervals {
            match prev {
                None => {
                    result += 2;
                    prev = Some((curr[1] - 1, curr[1]));
                }
                Some((prev_l, prev_r)) => {
                    if prev_r < curr[0] {
                        result += 2;
                        prev = Some((curr[1] - 1, curr[1]));
                    } else if prev_l < curr[0] {
                        result += 1;
                        prev = Some((prev_r, curr[1]));
                    }
                }
            }
        }
        result
    }
}

struct Solution {}

fn main() {
    let result = Solution::intersection_size_two(
        [[1, 3].to_vec(), [3, 7].to_vec(), [8, 9].to_vec()].to_vec(),
    );
    assert_eq!(5, result);
    let result = Solution::intersection_size_two(
        [
            [3, 5].to_vec(),
            [1, 4].to_vec(),
            [2, 5].to_vec(),
            [1, 3].to_vec(),
        ]
        .to_vec(),
    );
    assert_eq!(3, result);
    let result = Solution::intersection_size_two(
        [
            [1, 3].to_vec(),
            [3, 7].to_vec(),
            [5, 7].to_vec(),
            [7, 8].to_vec(),
        ]
        .to_vec(),
    );
    assert_eq!(5, result);
    println!("Hello, World!");
}
