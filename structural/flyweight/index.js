class Laptop {
	static acer = 'acer';
	static asus = 'asus';
	static samsung = 'samsung';
	static hp = 'hp';

	constructor(brent, price) {
		this.brent = brent;
		this.price = price;
	}

	get info() {
		return {
			brent: this.brent,
			price: this.price,
		}
	}
}

class LaptopFactory {
	constructor() {
		this.laptopsList = {};
	}

	create(brent) {
		const laptop = this.laptopsList[brent];

		if (laptop) return laptop;

		if (brent === Laptop.acer) {
			const laptops = new Laptop(brent, 1250);

			this.laptopsList[brent] = laptops.info;
			return this.laptopsList[brent];
		}

		if (brent === Laptop.asus) {
			const laptops = new Laptop(brent, 1450);

			this.laptopsList[brent] = laptops.info;
			return this.laptopsList[brent];
		}

		if (brent === Laptop.samsung) {
			const laptops = new Laptop(brent, 1650);

			this.laptopsList[brent] = laptops.info;
			return this.laptopsList[brent];
		}

		if (brent === Laptop.hp) {
			const laptops = new Laptop(brent, 1150)

			this.laptopsList[brent] = laptops.info;
			return this.laptopsList[brent];
		}
	}

	get laptops() {
		return this.laptopsList;
	}
}

const laptopFactory = new LaptopFactory();

const list = [
	Laptop.hp,
	Laptop.samsung,
	Laptop.samsung,
	Laptop.samsung,
	Laptop.asus,
	Laptop.acer,
	Laptop.acer,
	Laptop.acer,
];

list.forEach(val => laptopFactory.create(val));

console.log(laptopFactory.laptops);
/* {
  hp: { brent: 'hp', price: 1150 },
  samsung: { brent: 'samsung', price: 1650 },
  asus: { brent: 'asus', price: 1450 },
  acer: { brent: 'acer', price: 1250 }
} */

