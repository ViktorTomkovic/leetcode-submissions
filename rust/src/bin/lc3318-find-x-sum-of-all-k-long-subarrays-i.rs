struct Solution {}
impl Solution {
    pub fn find_x_sum(nums: Vec<i32>, k: i32, x: i32) -> Vec<i32> {
        nums.windows(k as usize)
            .map(|window| {
                let mut b = window
                    .iter()
                    .fold(std::collections::HashMap::new(), |mut map, val| {
                        map.entry(val).and_modify(|frq| *frq += 1).or_insert(1);
                        map
                    })
                    .iter()
                    .map(|(value, frequency)| (*frequency, **value))
                    .collect::<Vec<(i32, i32)>>();

                // sort_by_key and freq_2.cmp(freq_1).and_then(...) could be more concise
                b.sort_by(|(freq_1, value_1), (freq_2, value_2)| {
                    let freq = freq_2.cmp(freq_1);
                    match freq {
                        std::cmp::Ordering::Equal => value_2.cmp(value_1),
                        std::cmp::Ordering::Less => std::cmp::Ordering::Less,
                        std::cmp::Ordering::Greater => std::cmp::Ordering::Greater,
                    }
                });
                b.iter().take(x as usize).map(|&(freq, val)| freq * val).sum::<i32>()
            })
            .collect::<Vec<i32>>()
    }
}

fn main() {
    let nums = vec![1, 1, 2, 2, 3, 4, 2, 3];
    let k = 6;
    let x = 2;
    assert_eq!(vec![6, 10, 12], Solution::find_x_sum(nums, k, x));

    let nums = vec![3, 8, 7, 8, 7, 5];
    let k = 2;
    let x = 2;
    assert_eq!(vec![11, 15, 15, 15, 12], Solution::find_x_sum(nums, k, x));

    println!("Hello, World!");
}
