impl Solution {
    pub fn max_power(stations: Vec<i32>, r: i32, k: i32) -> i64 {
        let (radius, k) = (r as i64, k as i64);
        let mut city_power_derivation = vec![0i64; stations.len() + 1];
        for (i, &station_power) in stations.iter().enumerate() {
            let left = 0.max(i as i64 - radius) as usize;
            let right = (stations.len() as i64).min(i as i64 + radius + 1) as usize;
            city_power_derivation[left] += station_power as i64;
            city_power_derivation[right] -= station_power as i64;
        }

        let mut l = *stations.iter().min().unwrap() as i64;
        let mut r = stations.iter().map(|&x| x as i64).sum::<i64>() + k as i64;
        let mut result = 0;
        while l <= r {
            let middle = l + (r - l) / 2;
            // dbg!(middle);
            let is_viable = Self::is_electricity_provided(middle, &city_power_derivation, k, radius);
            if is_viable {
                result = middle;
                // dbg!(&result);
                l = middle + 1;
            } else {
                r = middle - 1;
            }
        }
        // dbg!(&result);
        result
    }
    fn is_electricity_provided(
        amount: i64,
        city_power_derivation: &Vec<i64>,
        k: i64,
        r: i64,
    ) -> bool {
        let mut sum = 0;
        let mut available_plants = k;
        let mut city_power_derivation2 = city_power_derivation.to_vec();
        // dbg!(amount);
        // dbg!(k);
        // dbg!(r);
        // dbg!(&city_power_derivation2);
        for i in 0..city_power_derivation2.len() - 1 {
            let derivation = city_power_derivation2[i];
            // dbg!(derivation);
            sum += derivation;
            // dbg!(sum);
            // dbg!(available_plants);
            if sum < amount {
                let needed_power = amount - sum;
                if needed_power > available_plants {
                    // dbg!("false");
                    return false;
                }
                sum += needed_power;
                let right =
                    (city_power_derivation2.len() as i64 - 1).min(i as i64 + 2 * r + 1) as usize;
                // dbg!(right);
                city_power_derivation2[right] -= needed_power;
                available_plants -= needed_power;
            }
        }
        // dbg!("true");
        true
    }
}

struct Solution {}

fn main() {
    // let stations = vec![1, 2, 4, 5, 0];
    // let r = 1;
    // let k = 2;
    // let result = Solution::max_power(stations, r, k);
    // assert_eq!(5, result);
    let stations = vec![4, 4, 4, 4];
    let r = 0;
    let k = 3;
    let result = Solution::max_power(stations, r, k);
    assert_eq!(4, result);
    println!("Hello, World!");
}
