const users = [
	{ id: '1', name: 'seller 1', type: 'seller' },
	{ id: '2', name: 'seller 2', type: 'seller' },
	{ id: '3', name: 'customer 1', type: 'customer' },
	{ id: '4', name: 'customer 2', type: 'customer' },
];

const products = [
	{ id: '1', name: 'Product 1', price: 20.59, sellerId: '1' },
	{ id: '2', name: 'Product 2', price: 17.59, sellerId: '1' },
	{ id: '3', name: 'Product 3', price: 1.59, sellerId: '2' },
	{ id: '4', name: 'Product 4', price: 7.59, sellerId: '2' },
];

const orders = [
	{ id: '1', userId: '3', productId: '1' },
	{ id: '2', userId: '3', productId: '2' },
	{ id: '3', userId: '4', productId: '3' },
	{ id: '4', userId: '4', productId: '3' },
];


class User {
	static typeSeller = 'seller';
	static typeCustomer = 'customer';

	getUserId(id) {
		return users.find(val => val.id === id)
	}
}

class UserProxy {
	constructor() {
		this.user = new User();
	}

	_getUserWithSellerData(userData) {
		const sellerData = products.filter(val => val.sellerId === userData.id)

		return {
			...userData,
			products: sellerData,
		}
	}

	_getUserWithOrderData(userData) {
		const sellerData = orders.filter(val => val.productId === userData.id)

		return {
			...userData,
			orders: sellerData,
		}
	}

	getUserId(id) {
		const userData = this.user.getUserId(id);

		if (!userData) {
			console.log('sorry, there is no such user')
			return false;
		}

		if (userData.type === User.typeSeller) {
			return this._getUserWithSellerData(userData)
		}

		if (userData.type === User.typeCustomer) {
			return this._getUserWithOrderData(userData)
		}
	}
}

const user = new UserProxy();

console.log(user.getUserId('1'))
/* {
  id: '1',
  name: 'seller 1',
  type: 'seller',
  products: [
    { id: '1', name: 'Product 1', price: 20.59, sellerId: '1' },
    { id: '2', name: 'Product 2', price: 17.59, sellerId: '1' }
  ]
} */
console.log(user.getUserId('3'))
/* {
  id: '3',
  name: 'customer 1',
  type: 'customer',
  orders: [
    { id: '3', userId: '4', productId: '3' },
    { id: '4', userId: '4', productId: '3' }
  ]
} */