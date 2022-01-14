const products = {
	'product_1': { id: '1', name: 'product 1', amount: 1 },
	'product_2': { id: '2', name: 'product 2', amount: 3 },
};

class ProductAction {
	set dataProduct (product) {
		this.product = product;
	}
}

class ProductStore {
	constructor() {
		this.products = products;
	}

	get productsInfo() {
		return this.products;
	}
}

class CreatProductCommand extends ProductAction {
	constructor(store) {
		super();
		this.store = store;
		this.product = null;
	}

	execute() {
		this.store.products = {
			...this.store.products,
			[`product_${this.product.id}`]: this.product,
		}
	}
}

class UpdateProductCommand extends ProductAction {
	constructor(store) {
		super();
		this.store = store;
		this.product = null;
	}

	execute() {
		const findProduct = this.store.products[`product_${this.product.id}`];

		if (findProduct) {
			this.store.products = {
				...this.store.products,
				[`product_${this.product.id}`]: {
					...findProduct,
					...this.product,
				},
			}
		}
	}
}

class DeleteProductCommand extends ProductAction {
	constructor(store) {
		super();
		this.store = store;
		this.product = null;
	}

	execute() {
		const findProduct = this.store.products[`product_${this.product.id}`];

		if (findProduct) {
			delete this.store.products[`product_${this.product.id}`];
		}
	}
}

class ProductStoreAction {
	constructor(createProduct, updateProduct, removeProduct) {
		this.createProduct = createProduct;
		this.updateProduct = updateProduct;
		this.removeProduct = removeProduct;
	}

	create(product) {
		this.createProduct.dataProduct = product;
		this.createProduct.execute();
	}

	update(product) {
		this.updateProduct.dataProduct = product;
		this.updateProduct.execute();
	}

	remove(product) {
		this.removeProduct.dataProduct = product;
		this.removeProduct.execute();
	}
}

const productStore = new ProductStore()

const productStoreAction = new ProductStoreAction(
	new CreatProductCommand(productStore),
	new UpdateProductCommand(productStore),
	new DeleteProductCommand(productStore),
);

productStoreAction.create({ id: '3', name: 'product 3', amount: 1 });
productStoreAction.update({ id: '2', amount: 10 });
productStoreAction.remove({ id: '1' });
console.log(productStore.productsInfo);
/* {
  product_2: { id: '2', name: 'product 2', amount: 10 },
  product_3: { id: '3', name: 'product 3', amount: 1 }
} */