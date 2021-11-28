class Product {
	constructor(price, discount) {
		this.price = price;
		this.discount = discount;
	}
}

class SamsungMobile extends Product{
	static type = 'mobile';
	static s3 = 's3';
	static s4 = 's4'
	static s5 = 's5'

	constructor(model, type, brand, price, discount) {
		super();

		this.type = type;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.discount = discount;
	}

	get info() {
		return {
			type: this.type,
			price: this.price,
			brand: this.brand,
			model: this.model,
			discount: this.discount,
		}
	}
}

class SamsungTablet extends Product{
	static type = 'tablet';
	static a6 = 'a6';
	static a7 = 'a7'
	
	constructor(model, type, brand, price, discount) {
		super();

		this.type = type;
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.discount = discount;
	}

	get info() {
		return {
			type: this.type,
			price: this.price,
			brand: this.brand,
			model: this.model,
			discount: this.discount,
		}
	}
}

class SamsungMobileFactory {
	create(model) {
		if (model === SamsungMobile.s3) {
			return new SamsungMobile(model, SamsungMobile.type, SamsungProduct.brand, 3000, 0);
		}

		if (model === SamsungMobile.s4) {
			return new SamsungMobile(model, SamsungMobile.type, SamsungProduct.brand, 4000, 15);
		}

		if (model === SamsungMobile.s5) {
			return new SamsungMobile(model, SamsungMobile.type, SamsungProduct.brand, 5000, 0);
		}
	}
}

class SamsungTabletFactory {
	create(model) {
		if (model === SamsungTablet.a6) {
			return new SamsungTablet(model, SamsungTablet.type, SamsungProduct.brand, 3500, 0);
		}

		if (model === SamsungTablet.a7) {
			return new SamsungTablet(model, SamsungTablet.type, SamsungProduct.brand, 4500, 15);
		}
	}
}

class SamsungProduct {
	static brand = 'samsung';

	constructor(type) {
		if (type === SamsungTablet.type) {
			return new SamsungTabletFactory();
		}

		if (type === SamsungMobile.type) {
			return new SamsungMobileFactory();
		}
	}
}

const samsungMobile = new SamsungProduct(SamsungMobile.type)
const samsungS3 = samsungMobile.create(SamsungMobile.s3)
const samsungS5 = samsungMobile.create(SamsungMobile.s5)

console.log(samsungS3.info) // {price: 3000, discount: 0, type: 'mobile', brand: 'samsung', model: 's3'};
console.log(samsungS5.info) // {price: 5000, discount: 0, type: 'mobile', brand: 'samsung', model: 's5'};

const samsungTablet = new SamsungProduct(SamsungTablet.type)
const samsungA6 = samsungTablet.create(SamsungTablet.a6)
const samsungA7 = samsungTablet.create(SamsungTablet.a7)

console.log(samsungA6.info) // {price: 3500, discount: 0, type: 'tablet', brand: 'samsung', model: 'a6'};
console.log(samsungA7.info) // {price: 4500, discount: 15, type: 'tablet', brand: 'samsung', model: 'a7'};
