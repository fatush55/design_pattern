class Cart {
	constructor() {
		if (typeof Cart.instance === 'object') {
			return Cart.instance
		}

		this.maxProduct = 10;
		this.amount = 0;

		Cart.instance = this;
		return this;
	}

	set addProduct(amount) {
		const result = this.amount + amount;

		if (result > this.maxProduct) {
			this.amount = this.maxProduct;
		}

		this.amount = result;
	}

	get amountProduct() {
		return this.amount;
	}
}

const card1 = new Cart();
const card2 = new Cart();

card1.addProduct = 2;
card2.addProduct = 4;

console.log(card1.amountProduct) // 6
console.log(card2.amountProduct) // 6