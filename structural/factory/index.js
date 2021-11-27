class Product {
	constructor(price, discount) {
		this.price = price;
		this.discount = discount;
	}
}

class SamsungMobile extends Product{
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

class SamsungMobileFactory {
	create(model) {
		if (model === SamsungMobile.s3) {
			return new SamsungMobile(model, 'mobile', 'samsung', 3000, 0);
		}

		if (model === SamsungMobile.s4) {
			return new SamsungMobile(model, 'mobile', 'samsung', 4000, 15);
		}

		if (model === SamsungMobile.s5) {
			return new SamsungMobile(model, 'mobile', 'samsung', 5000, 0);
		}
	}
}

const samsungMobileFactory = new SamsungMobileFactory();

const samsungS3 = samsungMobileFactory.create(SamsungMobile.s3);

console.log(samsungS3.info)
