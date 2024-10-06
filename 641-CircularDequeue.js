/**
* @param {number} k
*/
var MyCircularDeque = function (k) {
	 this.empty = true;
	 this.full = false;
	 this.que = new Array(k)
	 this.start = 0;
	 this.end = 0;
	 this.k = k
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertFront = function (value) {
	 if (this.isFull()) return false;
	 this.start--;
	 if (this.start == -1) this.start = this.k - 1;
	 this.que[this.start] = value
	 if (this.start == this.end) this.full = true;
	 this.empty = false;
	 return true;
};

/** 
* @param {number} value
* @return {boolean}
*/
MyCircularDeque.prototype.insertLast = function (value) {
	 if (this.isFull()) return false;
	 this.que[this.end] = value;
	 this.end++;
	 if (this.end == this.k) this.end = 0;

	 if ((this.start == this.end)) this.full = true;
	 this.empty = false;
	 return true
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.deleteFront = function () {
	 if (this.isEmpty()) return false;
	 this.start = (this.start + 1) % this.k;
	 if (this.start == this.end) this.empty = true;
	 this.full = false;
	 return true;

};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.deleteLast = function () {
	 if (this.isEmpty()) return false;
	 this.end--;
	 if (this.end == -1) this.end = this.k - 1;
	 if (this.start == this.end) this.empty = true;
	 this.full = false;
	 return true;
};

/**
* @return {number}
*/
MyCircularDeque.prototype.getFront = function () {
	if(this.isEmpty( )) return -1; 
	 return this.que[this.start];
};

/**
* @return {number}
*/
MyCircularDeque.prototype.getRear = function () {
	 if(this.isEmpty( )) return -1;
	 return this.end == 0 ? this.que[this.k - 1] : this.que[this.end - 1];
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.isEmpty = function () {
	 return this.empty
};

/**
* @return {boolean}
*/
MyCircularDeque.prototype.isFull = function () {
	 return this.full
};

/** 
* Your MyCircularDeque object will be instantiated and called as such:
* var obj = new MyCircularDeque(k)
* var param_1 = obj.insertFront(value)
* var param_2 = obj.insertLast(value)
* var param_3 = obj.deleteFront()
* var param_4 = obj.deleteLast()
* var param_5 = obj.getFront()
* var param_6 = obj.getRear()
* var param_7 = obj.isEmpty()
* var param_8 = obj.isFull()
*/
