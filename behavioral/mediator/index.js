class InterfaceProduct {
	constructor(createMediator) {
		this.createMediator = createMediator;
	}

	get name() {
		return this.brand + ' (' + this.model  + ')';
	}
}

class ProductAction extends InterfaceProduct{
	constructor(createMediator) {
		super(createMediator);
	}

	createProduct(price, description = 'default') {
		this.createMediator.addProduct(this, price, description);
	}
}

class Laptop extends ProductAction {
	constructor(model, brand, createMediator) {
		super(createMediator);
		this.model = model;
		this.brand = brand;
	}
}

class Mobile extends ProductAction {
	constructor(model, brand, createMediator) {
		super(createMediator);
		this.model = model;
		this.brand = brand;
	}
}

class StoreProduct {
	constructor() {
		this.products = [];
	}

	addProduct(product, price, description) {
		const data = {
			price,
			description,
			name: product.name,
		};

		console.log(`You create product "${data.name}" with prise: $${data.price}`)

		this.products.push(data);
	}

	get productList() {
		return this.products;
	}
}

const mediator = new StoreProduct();

const laptopAsus1050 = new Laptop('1050gt', 'Asus', mediator);
laptopAsus1050.createProduct(50000);

const mobileIPhone12Pro = new Mobile('iPhone 12Pro', 'Apple', mediator);
mobileIPhone12Pro.createProduct(3650);

console.log(mediator.productList);
/*
	You create product "Asus (1050gt)" with prise: $50000
	You create product "Apple (iPhone 12Pro)" with prise: $3650
	[
	  { price: 50000, description: 'default', name: 'Asus (1050gt)' },
	  { price: 3650, description: 'default', name: 'Apple (iPhone 12Pro)' }
	]
*/