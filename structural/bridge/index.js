class Store {
	constructor(value, price) {
		this.value = value;
		this.price = price;
	}

	get data() {
		return {
			value: this.value,
			price: this.price,
		}
	}
}

class Store64Gb extends Store {
	constructor() {
		super(64, 0);
	}
}

class Store128Gb extends Store {
	constructor() {
		super(128, 30);
	}
}

class Color {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}

	get data() {
		return {
			name: this.name,
			price: this.price,
		}
	}
}

class ColorBlack extends Color {
	constructor() {
		super('black', 0);
	}
}

class ColorRed extends Color {
	constructor() {
		super('red', 10);
	}
}

class Model {
	constructor(type, basePrice, description) {
		this.type = type;
		this.basePrice = basePrice;
		this.description = description;
	}

	get data() {
		return {
			type: this.type,
			basePrice: this.basePrice,
			description: this.description,
		}
	}
}

class IPhone12 extends Model {
	constructor() {
		super('12', 20000, 'iPhone 12')
	}
}

class IPhone12Pro extends Model {
	constructor() {
		super('12-pro', 25000, 'iPhone 12 pro')
	}
}

class Mobile {
	constructor(model, store, color) {
		this.model = model;
		this.store = store;
		this.color = color;
	}

	get _price() {
		return this.model.basePrice + this.store.price + this.color.price;
	}
	
	get info() {
		return {
			brand: 'Apple',
			model: this.model.type,
			description: this.model.description,
			store: this.store.value,
			color: this.color.name,
			price: this._price,
		}
	}
}

class BridgeIPhone12 {
	constructor() {
		this.mobilesList = [
			// 12
			new Mobile(new IPhone12(), new Store64Gb(), new ColorBlack()),
			new Mobile(new IPhone12(), new Store64Gb(), new ColorRed()),
			new Mobile(new IPhone12(), new Store128Gb(), new ColorBlack()),
			new Mobile(new IPhone12(), new Store128Gb(), new ColorRed()),
			// 12Pro
			new Mobile(new IPhone12Pro(), new Store64Gb(), new ColorBlack()),
			new Mobile(new IPhone12Pro(), new Store64Gb(), new ColorRed()),
			new Mobile(new IPhone12Pro(), new Store128Gb(), new ColorBlack()),
			new Mobile(new IPhone12Pro(), new Store128Gb(), new ColorRed()),
		];
	}

	get mobiles() {
		return this.mobilesList.map(val => val.info);
	}
}

const bridgeIPhone12 = new BridgeIPhone12();

console.log(bridgeIPhone12.mobiles);
/* [
  { brand: 'Apple', model: '12', description: 'iPhone 12', store: 64, color: 'black', price: 20000 },
  { brand: 'Apple', model: '12', description: 'iPhone 12', store: 64, color: 'red', price: 20010 },
  { brand: 'Apple', model: '12', description: 'iPhone 12', store: 128, color: 'black', price: 20030 },
  { brand: 'Apple', model: '12', description: 'iPhone 12', store: 128, color: 'red', price: 20040 },
  { brand: 'Apple', model: '12-pro', description: 'iPhone 12 pro', store: 64, color: 'black', price: 25000 },
  { brand: 'Apple', model: '12-pro', description: 'iPhone 12 pro', store: 64, color: 'red', price: 25010 },
  { brand: 'Apple', model: '12-pro', description: 'iPhone 12 pro', store: 128, color: 'black', price: 25030 },
  { brand: 'Apple', model: '12-pro', description: 'iPhone 12 pro', store: 128, color: 'red', price: 25040 },
] */