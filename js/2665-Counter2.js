function createCounter(initialValue) {
	return {
		value: initialValue,
		increment: function() {
			this.value++;
			return this.value;
		},
		decrement: function() {
			this.value--;
			return this.value;
		},
		reset: function() {
			this.value = initialValue;
			return this.value;
		}
	}
}

const c = createCounter(5);
console.log(c.value);
c.increment();
c.increment();

console.log(c.value);
c.reset();
console.log(c.value);
