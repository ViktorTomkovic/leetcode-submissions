struct Solution {}
const UNGUARDED: u8 = 0;
const GUARDED: u8 = 1;
const GUARD: u8 = 2;
const WALL: u8 = 3;
impl Solution {
    pub fn count_unguarded(m: i32, n: i32, guards: Vec<Vec<i32>>, walls: Vec<Vec<i32>>) -> i32 {
        let mut grid = vec![vec![UNGUARDED; n as usize]; m as usize];
        for wall in walls {
            grid[wall[0] as usize][wall[1] as usize] = WALL;
        }
        for guard in guards.as_slice() {
            grid[guard[0] as usize][guard[1] as usize] = GUARD;
        }
        for guard in guards.as_slice() {
            // grid[guard[0] as usize][guard[1] as usize] = GUARDED;
            for row in (0..guard[0] as usize).rev() {
                if matches!(grid[row][guard[1] as usize], WALL | GUARD) {
                    break;
                }
                grid[row][guard[1] as usize] = GUARDED;
            }
            for row in (guard[0] + 1) as usize..m as usize {
                if matches!(grid[row][guard[1] as usize], WALL | GUARD) {
                    break;
                }
                grid[row][guard[1] as usize] = GUARDED;
            }
            for col in (0..guard[1] as usize).rev() {
                if matches!(grid[guard[0] as usize][col], WALL | GUARD) {
                    break;
                }
                grid[guard[0] as usize][col] = GUARDED;
            }
            for col in (guard[1] + 1) as usize..n as usize {
                if matches!(grid[guard[0] as usize][col], WALL | GUARD) {
                    break;
                }
                grid[guard[0] as usize][col] = GUARDED;
            }
        }
        // dbg!(&grid);
        grid.iter().flat_map(|x| x.iter()).filter(|&x| *x == UNGUARDED).count() as i32
    }
}

fn main() {
    let m_1 = 4;
    let n_1 = 6;
    let guards_1 = vec![vec![0, 0], vec![1, 1], vec![2, 3]];
    let walls_1 = vec![vec![0, 1], vec![2, 2], vec![1, 4]];
    assert_eq!(7, Solution::count_unguarded(m_1, n_1, guards_1, walls_1));
    println!("Hello, world!");
}
