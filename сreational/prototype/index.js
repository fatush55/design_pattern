class IPhone12Pro {
	constructor(memory, color, price) {
		this.memory = memory;
		this.color = color;
		this.price = price;
	}

	get info() {
		return {
			memory: this.memory,
			color: this.color,
			price: this.price,
		}
	}

	produce() {
		return new IPhone12Pro(this.memory, this.color, this.price);
	}
}

const iPhone12Pro = new IPhone12Pro(128, 'black', 28500);

const iPhone12Pro1 = iPhone12Pro.produce();

console.log(iPhone12Pro1.info) // {memory: 128, color: 'black', price: 28500}

const iPhone12Pro2 = iPhone12Pro.produce();
iPhone12Pro2.color = 'red';

console.log(iPhone12Pro2.info) // {memory: 128, color: 'red', price: 28500}

const iPhone12Pro3 = iPhone12Pro.produce();
iPhone12Pro3.memory = 256;
iPhone12Pro3.price = 32000;

console.log(iPhone12Pro3.info) // {memory: 256, color: 'black', price: 32000}

