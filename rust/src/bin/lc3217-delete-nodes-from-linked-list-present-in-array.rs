// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}
struct SolutionRecursive {}
struct Solution {}
use std::collections::HashSet;
use std::hash::RandomState;
impl SolutionRecursive {
    pub fn recursion(nums: &HashSet<i32>, node: &Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        match node {
            None => None,
            Some(value) => {
                let tail = SolutionRecursive::recursion(nums, &value.next);
                if !(*nums).contains(&(value.val)) {
                    let result_head = ListNode {
                        val: value.val,
                        next: tail,
                    };
                    Some(Box::new(result_head))
                } else {
                    tail
                }
            }
        }
    }

    pub fn modified_list(nums: Vec<i32>, head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // let num_set: HashSet<i32, RandomState> = HashSet::from_iter(nums);
        let num_set: HashSet<_> = nums.into_iter().collect();
        let result = SolutionRecursive::recursion(&num_set, &head);
        result
    }
}

impl Solution {
    pub fn modified_list(nums: Vec<i32>, mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let num_set: HashSet<_> = nums.into_iter().collect();
        while match head.as_ref() {
            Some(hvalue) if num_set.contains(&hvalue.val) => true,
            _ => false,
        } {
            head = head.take().unwrap().next;
        }
        let mut current = head.as_mut();
        while let Some(cvalue) = current {
            while matches!(cvalue.next.as_ref(), Some(next_node) if num_set.contains(&next_node.val)) {
                cvalue.next = cvalue.next.take().unwrap().next;
            }
            current = cvalue.next.as_mut();
        }
        head
    }
}

fn main() {
    let nums_2 = vec![1];
    let head_2 = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
                val: 1,
                next: Some(Box::new(ListNode {
                    val: 2,
                    next: Some(Box::new(ListNode {
                        val: 1,
                        next: Some(Box::new(ListNode { val: 2, next: None })),
                    })),
                })),
            })),
        })),
    }));
    let result_2 = Solution::modified_list(nums_2, head_2);
    dbg!(result_2);

    let nums_3 = vec![5];
    let head_3 = Some(Box::new(ListNode {
        val: 1,
        next: Some(Box::new(ListNode {
            val: 2,
            next: Some(Box::new(ListNode {
                val: 4,
                next: Some(Box::new(ListNode {
                    val: 3,
                    next: Some(Box::new(ListNode {
                        val: 5,
                        next: Some(Box::new(ListNode { val: 5, next: None })),
                    })),
                })),
            })),
        })),
    }));
    let result_3 = Solution::modified_list(nums_3, head_3);
    dbg!(result_3);
    println!("Hello, world!");
}
