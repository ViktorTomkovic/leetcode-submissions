var TimeLimitedCache = function() {
	this.cache = {};

	this.set = function(key, value, duration) {
		let isExisting = key in this.cache; // Проверка существования ключа

		this.cache[key] = {
			value: value,
			expiration: Date.now() + duration, // Хранение времени истечения
		};

		// Если ключ уже существовал, возвращаем true, иначе false
		return isExisting;
	};

	this.get = function(key) {
		const item = this.cache[key];
		if (item && Date.now() < item.expiration) {
			return item.value; // Если ключ не истек, возвращаем значение
		}
		delete this.cache[key]; // Удаляем истекший ключ
		return -1; // Если ключ истек или не существует
	};

	this.count = function() {
		let count = 0;
		for (const key in this.cache) {
			if (Date.now() < this.cache[key].expiration) {
				count++; // Увеличиваем счетчик, если ключ не истек
			} else {
				delete this.cache[key]; // Удаляем истекший ключ
			}
		}
		return count;
	};
};

