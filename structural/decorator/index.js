class Product {
	constructor() {
		this.price = 0;
	}
}

class Laptop extends Product{
	constructor(price, brand, model, color) {
		super();
		this.price = price;
		this.brand = brand;
		this.model = model;
		this.color = color;
	}

	get info() {
		return {
			price: this.price,
			brand: this.brand,
			model: this.model,
			color: this.color,
		}
	}
}

class StoreSSD500 {
	constructor(laptop) {
		this.laptop = laptop;
	}

	get info() {
		const info = this.laptop.info;

		return {
			...this.laptop.info,
			price: info.price + 350,
			model: `${info.model}/sdd-500`,
			sdd: 500,
		}
	}
}

class StoreHDD1000 {
	constructor(laptop) {
		this.laptop = laptop;
	}

	get info() {
		const info = this.laptop.info;

		return {
			...info,
			price: info.price + 450,
			model: `${info.model}/hdd-1000`,
			hdd: 1000,
		}
	}
}

let acer650G = new Laptop(28000, 'acer', '650G', 'red');
console.log(acer650G.info);
/*{
  price: 28000, brand: 'acer', model: '650G', color: 'red',
} */

acer650G = new StoreSSD500(acer650G);
console.log(acer650G.info);
/*{
  price: 28350, brand: 'acer', model: '650G/sdd-500', color: 'red', sdd: 500
} */

acer650G = new StoreHDD1000(acer650G);
console.log(acer650G.info);
/*{
  price: 28800, brand: 'acer', model: '650G/sdd-500/hdd-1000', color: 'red', sdd: 500, hdd: 1000
} */