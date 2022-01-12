class Product {
	accept(visitor){
		visitor(this);
	}
}

class Laptop extends Product{
	static ASUS = 'ASUS';
	static ACER = 'ACER';

	constructor(name, price) {
		super();
		this.price = price;
		this.name = name;
	}

	get info() {
		return {
			name: this.name,
			price: this.price,
		}
	}
}

class LaptopFactory {
	create(brand) {
		switch (brand) {
			case Laptop.ASUS:
				return new Laptop(Laptop.ASUS, 1500);
			case Laptop.ACER:
				return new Laptop(Laptop.ACER, 20000);
			default:
				return new Laptop('noName', 0);
		}
	}
}

function holidayDiscountVisitor(laptop) {
	if (laptop instanceof Laptop && laptop.name === Laptop.ACER) {
		console.log('holiday discount $50')
		laptop.price -= 50;
	} else if (laptop instanceof Laptop && laptop.name === Laptop.ASUS) {
		console.log('holiday discount $90')
		laptop.price -= 90;
	}
}

const laptopFactory = new LaptopFactory();
const asus = laptopFactory.create(Laptop.ASUS);

console.log(asus.info);
// { name: 'ASUS', price: 1500 }c
asus.accept(holidayDiscountVisitor);
console.log(asus.info);
// holiday discount $90
// { name: 'ASUS', price: 1410 }







