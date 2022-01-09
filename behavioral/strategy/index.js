let products = {
	['asus-730-c']: {
		price: 10500,
		description: 'hello',
		amount: 10,
	},
};

class Actions {
	constructor(actionData) {
		this.actionData = actionData;
	}
}

class UpdateProduct extends Actions {
	handlerAction() {
		const { id, fields } = this.actionData;
		const product = products[id];

		if (product) {
			fields.forEach(field => {
				product[field.name] = field.value;
			});
			return true;
		}

		console.log('This product is not valid');
		return false;
	}
}


class RemoveProduct extends Actions {
	handlerAction() {
		const { id } = this.actionData;

		delete products[id]
	}
}

class CreateProduct extends Actions {
	handlerAction() {
		const { id, data } = this.actionData;
		const product = products[id];

		if (!product) {
			products = {
				...products,
				[id]:data,
			};
			return true;
		}

		console.log('This product is not valid');
		return false;
	}
}

class StoreProduct {
	constructor() {
		this.action = {};
	}

	set setAction(action) {
		this.action = action;
	}

	runAction() {
		this.action.handlerAction();
		console.log(products);
	}
}

const storeProduct = new StoreProduct()

storeProduct.setAction = new UpdateProduct({
	id: 'asus-730-c',
	fields: [{ name: 'amount', value: 9 }],
});
storeProduct.runAction();
// { 'asus-730-c': { price: 10500, description: 'hello', amount: 9 } }
storeProduct.setAction = new CreateProduct({
	id: 'asus-731-c',
	data: { price: 10500, description: 'hello', amount: 2, },
});
storeProduct.runAction();
/* {
  'asus-730-c': { price: 10500, description: 'hello', amount: 9 },
  'asus-731-c': { price: 10500, description: 'hello', amount: 2 },
} */
storeProduct.setAction = new RemoveProduct({ id: 'asus-730-c' });
storeProduct.runAction();
// { 'asus-731-c': { price: 10500, description: 'hello', amount: 2 } }
