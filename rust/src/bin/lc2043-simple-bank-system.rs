struct Bank {
    balance: Vec<i64>,
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl Bank {
    fn new(balance: Vec<i64>) -> Self {
        Bank { balance }
    }

    fn transfer(&mut self, account1: i32, account2: i32, money: i64) -> bool {
        if !(account1 >= 1 && account1 <= self.balance.len() as i32) {
            return false;
        };
        if !(account2 >= 1 && account2 <= self.balance.len() as i32) {
            return false;
        };
        if !(money <= self.balance[(account1 - 1) as usize]) {
            return false;
        };
        self.balance[(account1 - 1) as usize] = self.balance[(account1 - 1) as usize] - money;
        self.balance[(account2 - 1) as usize] = self.balance[(account2 - 1) as usize] + money;
        true
    }

    fn deposit(&mut self, account: i32, money: i64) -> bool {
        if !(account >= 1 && account <= self.balance.len() as i32) {
            return false;
        };
        self.balance[(account - 1) as usize] = self.balance[(account - 1) as usize] + money;
        true
    }

    fn withdraw(&mut self, account: i32, money: i64) -> bool {
        if !(account >= 1 && account <= self.balance.len() as i32) {
            return false;
        };
        if !(money <= self.balance[(account -1) as usize]) {
            return false;
        };
        self.balance[(account - 1) as usize] = self.balance[(account - 1) as usize] - money;
        true
    }
}

/**
 * Your Bank object will be instantiated and called as such:
 * let obj = Bank::new(balance);
 * let ret_1: bool = obj.transfer(account1, account2, money);
 * let ret_2: bool = obj.deposit(account, money);
 * let ret_3: bool = obj.withdraw(account, money);
 */

fn main() {
    println!("Hello, world!");
    let balance = [10, 100, 20, 50, 30].to_vec();
    let mut obj = Bank::new(balance);
    let ret_1: bool = obj.withdraw(3, 10);
    let ret_2: bool = obj.transfer(5, 1, 20);
    let ret_3: bool = obj.deposit(5, 20);
    let ret_4: bool = obj.transfer(3, 4, 15);
    let ret_5: bool = obj.withdraw(10, 50);
    assert_eq!([ret_1, ret_2, ret_3, ret_4, ret_5], [true, true, true, false, false]);
}

