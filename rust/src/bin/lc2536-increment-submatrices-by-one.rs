impl Solution {
    pub fn range_add_queries(n: i32, queries: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = n as usize;
        let mut diff = vec![vec![0; n + 1]; n + 1];
        let mut result = vec![vec![0; n]; n];
        for q in queries {
            let (row1, col1, row2, col2) =
                (q[0] as usize, q[1] as usize, q[2] as usize, q[3] as usize);
            diff[row1][col1] += 1;
            diff[row1][col2 + 1] -= 1;
            diff[row2 + 1][col1] -= 1;
            diff[row2+1][col2 + 1] += 1;
        }
        // dbg!(&diff);
        for i in 0..n {
            for j in 0..n {
                let pd = if i > 0 && j > 0 { result[i-1][j-1] } else { 0 };
                let pc = if j > 0 { result[i][j-1] } else { 0 };
                let pr = if i > 0 { result[i-1][j] } else { 0 };
                result[i][j] = diff[i][j] + pr + pc - pd;
                // dbg!((i, j));
                // dbg!((diff[i][j], pc, pr, pd));
                // dbg!(&result);
            }
        }
        result
    }
}

struct Solution {}

pub fn main() {
    assert_eq!(
        vec![vec![1, 1, 0], vec![1, 2, 1], vec![0, 1, 1]],
        Solution::range_add_queries(3, vec![vec![1, 1, 2, 2], vec![0, 0, 1, 1]])
    );
    println!("Hello, World!");
}
