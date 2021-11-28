class Laptop {
	constructor(price, brand, model) {
		this.price = price;
		this.brand = brand;
		this.model = model;
		this.discount = null;
		this.ssd = null;
		this.frontCam = null;
	}

	get info(){
		return {
			price: this.price,
			brand: this.brand,
			model: this.model,
			discount: this.discount,
			ssd: this.ssd,
			frontCam: this.frontCam,
		}

	}
}

class LaptopBuilder {
	constructor(...args) {
		this.laptop = new Laptop(...args);
	}

	addSDD(ssd) {
		this.laptop.ssd = ssd;
		return this;
	}

	addFrontCam(frontCam) {
		this.laptop.frontCam = frontCam;
		return this;
	}

	addDiscount(discount) {
		this.laptop.discount = discount;
		return this;
	}

	build() {
		return this.laptop;
	}
}

const acer530 = new LaptopBuilder(23000, 'acer', 530)
	.addDiscount(15)
	.addFrontCam('g-4139')
	.addSDD('500 Gb')
	.build();

console.log(acer530.info)
/* {
 	price: 23000,
 	brand: 'acer',
 	model: 530,
 	discount: 15,
 	ssd: '500 Gb',
 	frontCam: 'g-4139',
 } */

const acer350 = new LaptopBuilder(20000, 'acer', 350)
	.addSDD('500 Gb')
	.build();

console.log(acer350.info)
/* {
  price: 20000,
  brand: 'acer',
  model: 350,
  discount: null,
  ssd: '500 Gb',
  frontCam: null,
 } */