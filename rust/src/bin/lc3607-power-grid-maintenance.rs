use std::{
    cmp::Reverse,
    collections::{BinaryHeap, HashSet, VecDeque},
};

struct Solution {}

impl Solution {
    pub fn process_queries(c: i32, connections: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let c = c + 1;
        let mut offline_stations: HashSet<i32> = HashSet::new();
        let mut online_stations: Vec<BinaryHeap<Reverse<i32>>> = Vec::new();
        let mut group_id: Vec<Option<usize>> = vec![None; c as usize];
        let mut current_group_id = 0;
        let mut neighbours: Vec<Vec<i32>> = vec![Vec::new(); c as usize];
        for e in connections {
            neighbours[e[0 as usize] as usize].push(e[1]);
            neighbours[e[1 as usize] as usize].push(e[0]);
        }
        for node_id in 0..c {
            match group_id[node_id as usize] {
                Some(_) => continue,
                None => {
                    let mut stations_in_group = BinaryHeap::new();
                    let mut unseen_neighbours = VecDeque::new();
                    let mut seen_neighbours = HashSet::new();
                    // BFS
                    unseen_neighbours.push_back(node_id);
                    while !unseen_neighbours.is_empty() {
                        let visiting_neighbour = unseen_neighbours.pop_front().unwrap();
                        if seen_neighbours.contains(&visiting_neighbour) {
                            continue;
                        }
                        stations_in_group.push(Reverse(visiting_neighbour));
                        group_id[visiting_neighbour as usize] = Some(current_group_id as usize);
                        seen_neighbours.insert(visiting_neighbour);
                        for neighbour in &neighbours[visiting_neighbour as usize] {
                            if !seen_neighbours.contains(neighbour) {
                                unseen_neighbours.push_back(*neighbour);
                            }
                        }
                    }
                    online_stations.push(stations_in_group);
                    current_group_id += 1;
                }
            }
        }
        let mut result = Vec::new();
        for query in queries {
            match query[0] {
                1 => {
                    let station_id = query[1];
                    if offline_stations.contains(&station_id) {
                        let station_group_id = group_id[station_id as usize].unwrap();
                        let online_stations = &mut online_stations[station_group_id];
                        while !online_stations.is_empty()
                            && offline_stations.contains(&online_stations.peek().unwrap().0)
                        {
                            online_stations.pop();
                        }
                        match online_stations.peek() {
                            Some(&lowest_station) => {
                                result.push(lowest_station.0);
                            }
                            None => result.push(-1),
                        }
                    } else {
                        result.push(station_id);
                    }
                }
                2 => {
                    offline_stations.insert(query[1]);
                }
                _ => panic!("wtf?"),
            }
        }
        result
    }
}

fn main() {
    let c = 5;
    let connections = vec![vec![1, 2], vec![2, 3], vec![3, 4], vec![4, 5]];
    let queries = vec![vec![1, 3], vec![2, 1], vec![1, 1], vec![2, 2], vec![1, 2]];
    let result = Solution::process_queries(c, connections, queries);
    assert_eq!(vec![3, 2, 3], result);
    let c = 3;
    let connections = vec![];
    let queries = vec![vec![1, 1], vec![2, 1], vec![1, 1]];
    let result = Solution::process_queries(c, connections, queries);
    assert_eq!(vec![1, -1], result);
    println!("Hello, World!");
}
