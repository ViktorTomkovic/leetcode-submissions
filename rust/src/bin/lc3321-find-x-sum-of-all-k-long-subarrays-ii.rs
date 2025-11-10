struct Solution {}

use std::cmp::Ordering;
use std::collections::{BTreeSet, HashMap};
#[derive(Eq, PartialEq, Clone, Debug)]
struct Pair {
    value: i32,
    frequency: i32,
}
impl Ord for Pair {
    fn cmp(&self, other: &Self) -> Ordering {
        self.frequency
            .cmp(&other.frequency)
            .then(self.value.cmp(&other.value))
    }
}
impl PartialOrd for Pair {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}
struct HelperStructure {
    sum_size: usize,
    large: BTreeSet<Pair>,
    small: BTreeSet<Pair>,
    freq_map: HashMap<i32, i32>,
    sum: i64,
}

impl HelperStructure {
    fn new(sum_size: usize) -> HelperStructure {
        HelperStructure {
            sum_size: sum_size,
            large: BTreeSet::new(),
            small: BTreeSet::new(),
            freq_map: HashMap::new(),
            sum: 0,
        }
    }
    fn insert(&mut self, value: i32) {
        if let Some(&frequency) = self.freq_map.get(&value) {
            if frequency > 0 {
                let to_remove = Pair { value, frequency };
                self.array_remove(to_remove);
            }
        }
        *(self.freq_map.entry(value).or_insert(0)) += 1;
        let new_frequency = self.freq_map[&value];
        self.array_insert(Pair {
            value,
            frequency: new_frequency,
        });
    }
    fn remove(&mut self, value: i32) {
        let frequency = self.freq_map[&value];
        self.array_remove(Pair { value, frequency });
        *(self.freq_map.get_mut(&value).unwrap()) -= 1;
        if self.freq_map[&value] > 0 {
            let new_frequency = self.freq_map[&value];
            self.array_insert(Pair {
                value,
                frequency: new_frequency,
            });
        }
    }
    fn get_sum(&self) -> i64 {
        self.sum
    }
    fn array_remove(&mut self, to_remove: Pair) {
        if to_remove >= *self.large.iter().next().unwrap() {
            // remove from large array
            self.sum -= to_remove.value as i64 * to_remove.frequency as i64;
            self.large.remove(&to_remove);
            if let Some(to_add) = self.small.iter().next_back().cloned() {
                // move from small to large
                self.sum += to_add.value as i64 * to_add.frequency as i64;
                self.small.remove(&to_add);
                self.large.insert(to_add);
            };
        } else {
            self.small.remove(&to_remove);
        }
    }
    fn array_insert(&mut self, to_add: Pair) {
        if self.large.len() < self.sum_size || to_add > *(self.large.iter().next().unwrap()) {
            self.sum += to_add.value as i64 * to_add.frequency as i64;
            self.large.insert(to_add.clone());
            if self.large.len() > self.sum_size {
                let to_remove = self.large.iter().next().unwrap().clone();
                self.sum -= to_remove.value as i64 * to_remove.frequency as i64;
                self.large.remove(&to_remove);
                self.small.insert(to_remove);
            }
        } else {
            self.small.insert(to_add);
        }
    }
}

impl Solution {
    pub fn find_x_sum(nums: Vec<i32>, k: i32, x: i32) -> Vec<i64> {
        let mut result = Vec::new();
        let mut helper_structure = HelperStructure::new(x as usize);
        let k = k as usize;
        for i in 0..nums.len() {
            helper_structure.insert(nums[i]);
            if i >= k {
                helper_structure.remove(nums[i - k]);
            }
            if i >= k - 1 {
                result.push(helper_structure.get_sum());
            }
        }
        result
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
