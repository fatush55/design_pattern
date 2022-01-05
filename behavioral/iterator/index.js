class Iterator {
	constructor(elements = {}) {
		this.index = 0;
		this.elements = elements;
	}

	hasNext() {
		return this.index < this.elements.length;
	}

	next() {
		return this.elements[this.index++];
	}
}

const laptops = [
	{ name: 'user_1', id: '1'},
	{ name: 'user_2', id: '2'},
	{ name: 'user_3', id: '3'},
];


const laptopIterator = new Iterator(laptops);

while (laptopIterator.hasNext()) {
	console.log(laptopIterator.next());
}
/*
	{ name: 'user_1', id: '1' }
	{ name: 'user_2', id: '2' }
	{ name: 'user_3', id: '3' }
  */