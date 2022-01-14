class Observer {
	constructor() {
		this.observers = [];
	}

	set addObserver(observer) {
		this.observers.push(observer);
	}

	set removeObserver(observer) {
		this.observers = this.observers.filter(obs => obs !== observer)
	}

	notification() {
		this.observers.forEach(observer => {
			const { observers, addObserver, removeObserver, notification, ...rest } = this;
			observer.handlerEvent(rest);
		})
	}
}

class Subscriber {
	constructor(name) {
		this.name = name;
	}

	handlerEvent(data) {
		console.log(this.name, data)
	}
}

class StateProduct extends Observer {
	constructor() {
		super();
		this.products = [];
	}

	set addProduct(product) {
		this.products.push(product);
		this.notification();
	}

	set removeProduct(product) {
		this.products = this.products.filter(prod => prod.id !== product.id);
		this.notification();
	}
}

const stateProduct = new StateProduct();
const seller1 = new Subscriber('Seller 1');
const seller2 = new Subscriber('Seller 2');

stateProduct.addProduct = { id: '1', name: 'Laptop 1' };

stateProduct.addObserver = seller1;
stateProduct.addObserver = seller2;
stateProduct.addProduct = { id: '2', name: 'Laptop 1' };
/*
	Seller 1 {products: [ { id: '1', name: 'Laptop 1' }, { id: '2', name: 'Laptop 1' } ]}
	Seller 2 {products: [ { id: '1', name: 'Laptop 1' }, { id: '2', name: 'Laptop 1' } ]}
 */
stateProduct.removeObserver = seller1;
stateProduct.removeProduct = { id: '2' };
// Seller 2 { products: [ { id: '1', name: 'Laptop 1' } ] }